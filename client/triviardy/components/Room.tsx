'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";
import useUser from "@/hooks/useUser";
import { User } from "@/types/User";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import JoinRoom from "./JoinRoom";
import Link from "next/link";
import baseAPI from "@/api/base";
import socket from "@/services/socket";

export default function Room() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {user, setUser} = useUser();
  const pathname = usePathname();
  const roomID = pathname.split("/")[1];
  const events: SocketEvent[] = [
    {
      name: "connect",
      handler() {
        console.log("Connected in Room");
      }
    },
    {
      name: "room:joined",
      handler(data) {
        let cookie = new Cookies();

        setUser(prevState => (
          {...prevState, id: data.playerID}
        ));

        const currentUser: User = {
          id: data.playerID,
          name: data.username,
          host: false
        }

        cookie.set("user", currentUser);
      }
    }
  ]

  useSocketEvents(events);

  useEffect(() => {
    async function checkRoom(): Promise<void> {
      // Check if room is available
      try {
        // Send get request for room with room ID
        await baseAPI.get(`room/${roomID}`);

        // Check if cookie already has user
        const cookie = new Cookies();
        const cookieUser = cookie.get("user");

        if (cookieUser) {
          setUser(cookieUser);
        }
      }
      catch (err: any) {
        if (!err?.response)
          setErrorMsg("No response from server");
        else
          setErrorMsg(err.response.data.message);
      }
      finally {
        setIsLoading(false);
      }

      return;
    }

    checkRoom();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        errorMsg ? (
          <>
            <h1>{errorMsg}</h1>
            <Link href="/">Go to Homepage</Link>
          </>
        ) : (
          user.id !== null || undefined ? (
            <>
              <h1>Welcome {user.name} {user.id}</h1>
              <h2>Room: {roomID}</h2>
            </>
          ) : (
            <JoinRoom roomID={roomID}/>
          )
        )
      )}
    </>
  )
}