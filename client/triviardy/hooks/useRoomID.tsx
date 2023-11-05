import { usePathname } from "next/navigation";

export default function useRoomID() {
  const pathname = usePathname();
  const roomID = pathname.split("/")[1];

  return roomID;
}