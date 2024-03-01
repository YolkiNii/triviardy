import { QuestionType } from "@/types/QuestionType"

export default function Square({ question, handleClick } : { question: QuestionType, handleClick: Function }) {
  return (
    <button className="border-2" onClick={() => handleClick(question)}>?</button>
  )
}