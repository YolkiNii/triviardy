'use client'

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import useUser from "@/hooks/useUser";
import socket from "@/services/socket";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import { User } from "@/types/User";

export default function CreateRoom() {
  const {user, setUser} = useUser();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  const events: SocketEvent[] = [
    {
      name: "connect",
      handler() {
        console.log("Connected:", socket.id);
      }
    },
    {
      name: "room:created",
      handler(data: any) {
        let cookie = new Cookies();
        const currentUser: User = {
          id: data.playerID,
          username: data.username,
          host: true
        }

        cookie.set(data.roomID, currentUser);

        setUser(prevState => (
          {...prevState, id: data.playerID}
        ));
    
        router.push(`/${data.roomID}`);
      }
    }
  ]

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMsg("");
    setUser({id: null, username: e.target.value, host: true});
  }

  function handleClick() {
    
    // Check if connection exists
    if (!socket?.connected) {
      setErrorMsg("Failed to connect to server");
      return;
    }

    // Make sure username is not blank
    if (socket && user.username !== "") {
      console.log("Creating room for:", user.username, "with socket ID:", socket.id);

      // Send server request to create room
      socket.emit("room:create", user.username);
    }
  }

  useSocketEvents(events);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <p className="text-3xl font-semibold text-center mb-1">Triviardy</p>
      <input 
        type="text" 
        placeholder="Enter your username"
        className="text-center text-base rounded-md py-3 mb-1"
        onChange={handleChange}
      />
      {errorMsg && <p className="font-semibold text-red-500">{errorMsg}</p>}
      <button 
        className="text-xl font-medium text-center border-2 p-2 rounded-md border-black bg-amber-300 hover:bg-amber-400 hover:pointer"
        onClick={handleClick}
      >
        Create Room
      </button>
    </div>
  )
}