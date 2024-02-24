import Board from "./Board";
import { QuestionType } from "@/types/QuestionType";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import { useEffect, useState } from "react";
import { ITriviardyPlayers } from "./Lobby";
import Players from "./Players";
import socket from "@/services/socket";
import useRoomID from "@/hooks/useRoomID";

export default function Game() {
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [players, setPlayers] = useState<ITriviardyPlayers>();
  const [turnPlayerID, setTurnPlayerID] = useState<number>();
  const roomID = useRoomID();
  console.log("In Game", questions);
  console.log("In Game", players);

  /* CREATE SOCKET EVENTS TO UPDATE GAME STATE */
  const events: SocketEvent[] = [
    {
      "name": "game:update_game",
      handler(data) {
        setQuestions(data.questions);
        setPlayers(data.players);
        setTurnPlayerID(data.turnPlayerID);
      }
    }
  ]

  useSocketEvents(events);

  useEffect(() => {
    // Get current game state from server
    socket.emit("game:request_game_state", roomID);
  }, []);

  return (
    <>
      {questions && <Board questions={questions} />}
      {players && turnPlayerID !== undefined && <Players players={players} turnPlayerID={turnPlayerID} />}
    </>
  )
}