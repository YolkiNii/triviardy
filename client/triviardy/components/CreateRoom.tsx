'use client'

import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import useUser from "@/hooks/useUser";
import socket from "@/services/socket";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import { User } from "@/types/User";

export default function CreateRoom() {
  const {user, setUser} = useUser();
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

        setUser(prevState => (
          {...prevState, id: data.playerID}
        ));

        const currentUser: User = {
          id: data.playerID,
          name: data.username,
          host: true
        }

        cookie.set("user", currentUser);
    
        router.push(`/${data.roomID}`);
      }
    }
  ]

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({id: null, name: e.target.value, host: true});
  }

  function handleClick() {
    // Make sure username is not blank
    if (socket && user.name !== "") {
      console.log("Creating room for:", user.name, "with socket ID:", socket.id);

      // Send server request to create room
      socket.emit("room:create", user.name);
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
      <button 
        className="text-xl font-medium text-center border-2 p-2 rounded-md border-black bg-amber-300 hover:bg-amber-400 hover:pointer"
        onClick={handleClick}
      >
        Create Room
      </button>
    </div>
  )
}