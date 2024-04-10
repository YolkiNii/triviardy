import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import socket from "@/services/socket";
import { UserType } from "@/types/UserType";
import LobbyPlayerList from "./LobbyPlayerList";
import GameSetup from "./GameSetup";
import Game from "./Game";
import { TriviardyPlayerType } from "@/types/TriviardyPlayerType";

interface ILobbyProps {
  roomID: string
}

export interface IPlayers {
  [playerID: string]: UserType
}

export interface ITriviardyPlayers {
  [playerID: string]: TriviardyPlayerType;
}

export default function Lobby({ roomID }: ILobbyProps) {
  const [players, setPlayers] = useState<IPlayers>({});
  const [gameInSession, setGameInSession] = useState(false);
  const events: SocketEvent[] = [
    {
      name: "room:update_players",
      handler(data: IPlayers) {
        setPlayers(data);
      }
    },
    {
      name: "game:initialize",
      handler(data: any) {
        setGameInSession(data["gameInSession"]);
      }
    }
  ];

  useSocketEvents(events);

  useEffect(() => {
    // Let other players know you've entered
    // and update everyone's client
    // Check if there is a game going on
    socket.emit("room:join_lobby", roomID, (response: any) => {
      setGameInSession(response.status);
    });
  }, [])

  return (
    <>
      {gameInSession ? (
        <Game />
      ) : (
        <div className="flex relative border-2 border-black h-[600px] items-center">
          <LobbyPlayerList players={players} />
          <GameSetup />
        </div>
      )}
    </>
  )
}