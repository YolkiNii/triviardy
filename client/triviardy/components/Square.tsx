import { QuestionType } from "@/types/QuestionType"

export default function Square({ question, handleClick } : { question: QuestionType, handleClick: Function }) {
  let earnablePoints: string;
  
  switch (question.difficulty) {
    case "hard": 
      earnablePoints = "300";
      break;
    case "medium":
      earnablePoints = "200";
      break;
    default:
      earnablePoints = "100";
  }
  return (
    <button className="border-2 pointer-events-auto" disabled={!question.answered} onClick={() => handleClick(question)}>{earnablePoints}</button>
  )
}