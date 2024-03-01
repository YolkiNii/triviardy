import { QuestionType } from "@/types/QuestionType";
import Square from "./Square"
import { useState } from "react";

export interface IBoardProps {
  questions: QuestionType[];
}

export default function Board({ questions }: IBoardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>();

  function handleClick(question: QuestionType) {
    console.log(question);
    setSelectedQuestion(question);
  }

  if (selectedQuestion) {
    
  }

  return (
    <>
    {selectedQuestion === undefined || selectedQuestion === null ? (
      <div className="grid w-4/6 h-96 grid-rows-4 grid-cols-4 ml-auto mr-auto bg-slate-200">
        {questions.map((question, i) => 
          <Square key={i} question={question} handleClick={handleClick}/>
        )}
      </div>
    ) : (
      <div className="w-4/6 h-96 ml-auto mr-auto bg-slate-200 border-2">
        <h2 className="text-center">{selectedQuestion.text}</h2>
        
      </div>
    )}
    </>
  )
}