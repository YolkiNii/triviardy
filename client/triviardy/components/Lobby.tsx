import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useSocketEvents, SocketEvent } from "@/hooks/useSocketEvents";
import socket from "@/services/socket";
import { User } from "@/types/User";
import LobbyPlayerList from "./LobbyPlayerList";
import GameSetup from "./GameSetup";
import Game from "./Game";
import { QuestionType } from "@/types/QuestionType";
import { TriviardyPlayerType } from "@/types/TriviardyPlayerType";

interface ILobbyProps {
  roomID: string
}

export interface IPlayers {
  [playerID: string]: User
}

export interface ITriviardyPlayers {
  [playerID: string]: TriviardyPlayerType;
}

export default function Lobby({ roomID }: ILobbyProps) {
  const [players, setPlayers] = useState<IPlayers>({});
  const [gameStarted, setGameStarted] = useState(false);
  const [initialQuestions, setInitialQuestions] = useState<QuestionType[]>([]);
  const [initialPlayers, setInitialPlayers] = useState<ITriviardyPlayers>({});
  const {user} = useUser();
  const events: SocketEvent[] = [
    {
      name: "room:update_players",
      handler(data: IPlayers) {
        setPlayers(data);
      }
    },
    {
      name: "game:initialize",
      handler(data) {
        // Populate game questions
        setInitialQuestions(data.questions);
        setInitialPlayers(data.players);
        setGameStarted(true);
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
      {gameStarted ? (
        <Game initialQuestions={initialQuestions} initialPlayers={initialPlayers}/>
      ) : (
        <div className="flex relative border-2 border-black h-[600px] items-center">
          <LobbyPlayerList players={players} />
          <GameSetup />
        </div>
      )}
    </>
  )
}