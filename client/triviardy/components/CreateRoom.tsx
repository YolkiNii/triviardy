'use client'

import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { generateRoomID } from "@/utils/rooms";
import useUser from "@/hooks/useUser";

export default function CreateRoom() {
  const {setUser} = useUser();
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({name: e.target.value});
  }

  function handleClick() {
    const roomID = generateRoomID(10);

    router.push(`/${roomID}`)
  }

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