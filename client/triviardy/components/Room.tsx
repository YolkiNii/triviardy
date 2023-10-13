'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";
import useUser from "@/hooks/useUser";
import { User } from "@/types/User";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";

export default function Room() {
  const [players, setPlayers] = useState<User[]>([])
  const {user, setUser} = useUser();
  const pathname = usePathname();
  const roomID = pathname.split("/")[1];
  const events: SocketEvent[] = [

  ]

  useEffect(() => {
    // Check if cookie already has user
    const cookie = new Cookies();
    const cookieUser = cookie.get("user");
    setUser(cookieUser);
  }, []);

  return (
    <>
      <h1>Welcome {user.name} {user.id}</h1>
      <h2>Room: {roomID}</h2>
    </>
  )
}