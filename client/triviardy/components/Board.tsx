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

  const answers = []

  if (selectedQuestion) {
    // Shuffle all answers in array
    const tempAnswers = [...selectedQuestion.incorrectAnswers];
    tempAnswers.push(selectedQuestion.answer);
    console.log(tempAnswers);
    let answersRange = 4;
    let pick;

    while (answersRange !== 0) {
      pick = Math.floor(Math.random() * answersRange);
      console.log(tempAnswers);
      console.log(pick);
      console.log(tempAnswers[pick]);
      answers.push(tempAnswers[pick]);
      answersRange--;
      tempAnswers.splice(pick, 1);
    }
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
        <div className="grid grid-rows-2 grid-cols-2">
          {answers.map((answer, index) => {
            return (
              <p className="border-2">{answer}</p>
            )
          })}
        </div>
      </div>
    )}
    </>
  )
}