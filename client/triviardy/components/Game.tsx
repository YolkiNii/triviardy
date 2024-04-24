import Board from "./Board";
import { QuestionType } from "@/types/QuestionType";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import { useEffect, useState } from "react";
import { ITriviardyPlayers } from "./Lobby";
import Players from "./Players";
import socket from "@/services/socket";
import useRoomID from "@/hooks/useRoomID";
import useUser from "@/hooks/useUser";

export default function Game() {
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [players, setPlayers] = useState<ITriviardyPlayers>();
  const [turnPlayerID, setTurnPlayerID] = useState<number>();
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | undefined>();
  const roomID = useRoomID();
  const {user} = useUser();
  console.log("In Game", questions);
  console.log("In Game", players);

  const events: SocketEvent[] = [
    {
      "name": "game:update_game",
      handler(data) {
        // Check if game has ended to render results screen
        if (data?.gameover) {

        }

        if (data?.changeQuestion) {
          setSelectedQuestion(undefined);
        }

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
      {questions && players && user.id !== undefined && user.id !== null && turnPlayerID !== undefined && turnPlayerID !== null && 
        <Board questions={questions} player={players[user.id]} turnPlayerID={turnPlayerID} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} />}
      {players && turnPlayerID !== undefined && turnPlayerID !== null && <Players players={players} turnPlayerID={turnPlayerID} />}
    </>
  )
}