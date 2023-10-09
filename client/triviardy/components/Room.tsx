'use client'

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/useUser";
import io from "socket.io-client";

export default function Room() {
  const {user} = useUser();
  const pathname = usePathname();
  const roomID = pathname.split("/")[1];

  useEffect(() => {
    io("http://localhost:3001");
  }, [])

  return (
    <>
      <h1>Welcome {user.name}</h1>
      <h2>Room: {roomID}</h2>
    </>
  )
}