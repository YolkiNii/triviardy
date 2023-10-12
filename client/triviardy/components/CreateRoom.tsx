'use client'

import { ChangeEvent, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import socket from "@/services/socket";

export default function CreateRoom() {
  const {user, setUser} = useUser();
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({id: null, name: e.target.value});
  }

  function handleClick() {
    console.log("Creating room for:", user.name, "with socket ID:", socket.id);

    // Send server request to create room
    socket.emit("room:create", user.name);
  }

  function onConnect() {
    console.log("Client:", socket.id);
  }

  function onRoomCreate(data: any) {
    setUser(prevState => (
      {...prevState, id: data.playerID}
    ));

    router.push(`/${data.roomID}`);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("room:created", onRoomCreate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("room:created", onRoomCreate);
    }
  }, []);

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