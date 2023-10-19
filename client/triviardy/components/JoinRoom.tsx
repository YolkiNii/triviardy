import { ChangeEvent } from "react";
import useUser from "@/hooks/useUser";
import socket from "@/services/socket";

interface IJoinRoomProps {
  roomID: string
}

export default function JoinRoom({ roomID }: IJoinRoomProps) {
  const {user, setUser} = useUser();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({id: null, name: e.target.value, host: false});
  }

  function handleClick() {
    // Make sure username is not blank
    if (socket && user.name !== "") {
      console.log("Joining room:", roomID, "with socket ID", socket.id);

      // Send server request to join room
      const data = {
        username: user.name,
        roomID
      }
      socket.emit("room:join", data);
    }
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
        Join Room
      </button>
    </div>
  )
}