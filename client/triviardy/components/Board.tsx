import { QuestionType } from "@/types/QuestionType";
import Square from "./Square"

export interface IBoardProps {
  questions: QuestionType[];
}

export default function Board({ questions }: IBoardProps) {

  return (
    <div className="grid w-4/6 h-96 grid-rows-4 grid-cols-4 ml-auto mr-auto bg-slate-200">
      {questions.map((question, i) => 
        <Square key={i} />
      )}
    </div>
  )
}