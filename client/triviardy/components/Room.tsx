'use client'

import { usePathname } from "next/navigation";
import useUser from "@/hooks/useUser";

export default function Room() {
  const {user} = useUser();
  const pathname = usePathname();
  const roomID = pathname.split("/")[1];

  return (
    <>
      <h1>Welcome {user.name}</h1>
      <h2>Room: {roomID}</h2>
    </>
  )
}