import { QuestionType } from "@/types/QuestionType"
import { TriviardyPlayerType } from "@/types/TriviardyPlayerType";

export default function Square({ question, turnPlayerID, player, handleQuestionSelect } : { question: QuestionType, turnPlayerID: number, player: TriviardyPlayerType, handleQuestionSelect: Function }) {
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
    <button className="border-2 hover:cursor-pointer" disabled={!question.answered || turnPlayerID !== player.id} onClick={() => handleQuestionSelect(question)}>{earnablePoints}</button>
  )
}