import Board from "./Board";
import { QuestionType } from "@/types/QuestionType";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import { useState } from "react";

export interface IGameProps {
  initialQuestions: QuestionType[]
}

export default function Game({ initialQuestions }: IGameProps) {
  const [questions, setQuestions] = useState<QuestionType[]>(initialQuestions);
  console.log("In Game", questions);

  return (
    <Board questions={questions}/>
  )
}