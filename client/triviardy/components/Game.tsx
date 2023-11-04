import Board from "./Board";
import { QuestionType } from "@/types/QuestionType";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import { useState } from "react";

export default function Game() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const events: SocketEvent[] = [
    {
      name: "game:initialize",
      handler(data) {
        // Populate game questions
        setQuestions(data.questions);
        console.log(data.questions);
      }
    }
  ]

  useSocketEvents(events);

  return (
    <h1>Game started</h1>
  )
}