import Board from "./Board";
import { QuestionType } from "@/types/QuestionType";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import { useState } from "react";
import { ITriviardyPlayers } from "./Lobby";

export interface IGameProps {
  initialQuestions: QuestionType[];
  initialPlayers: ITriviardyPlayers;
}

export default function Game({ initialQuestions, initialPlayers }: IGameProps) {
  const [questions, setQuestions] = useState<QuestionType[]>(initialQuestions);
  const [players, setPlayers] = useState<ITriviardyPlayers>(initialPlayers);
  console.log("In Game", questions);
  console.log("In Game", players);

  return (
    <Board questions={questions}/>
  )
}