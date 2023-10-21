import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import socket from "@/services/socket";
import { User } from "@/types/User";

interface ILobbyProps {
  roomID: string
}

interface IPlayers {
  [playerID: string]: User
}

export default function Lobby({ roomID }: ILobbyProps) {
  const [players, setPlayers] = useState<IPlayers>({});
  const {user, setUser} = useUser();
  const events: SocketEvent[] = [
    {
      name: "room:update_players",
      handler(data: IPlayers) {
        console.log(data);
        setPlayers(data);
      }
    }
  ];

  useSocketEvents(events);

  useEffect(() => {
    // Let other players know you've entered
    // and update everyone's client
    socket.emit("room:join_lobby", roomID);
  }, [])

  return (
    <>
      {user.host ? (
        <h1>You're Host!</h1>
      ) : (
        <h1>Wait for host to start game.</h1>
      )}
      <h1>Welcome {user.username} {user.id}</h1>
      <h2>Room: {roomID}</h2>
      {Object.keys(players).map(id => (
        <p key={id}>Player {players[id].username}</p>
      ))}
    </>
  )
}