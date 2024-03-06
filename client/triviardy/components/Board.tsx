import { QuestionType } from "@/types/QuestionType";
import Square from "./Square"
import { useState } from "react";

export interface IBoardProps {
  questions: QuestionType[];
}

export default function Board({ questions }: IBoardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>();

  function handleClick(question: QuestionType) {
    // Let other players know question was selected
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
      <div className="flex flex-col w-4/6 h-96 ml-auto mr-auto bg-slate-200 border-2">
        <p className="text-center text-3xl font-bold m-auto break-words w-9/12">{selectedQuestion.text}</p>
        <div className="bottom-auto w-full grid grid-rows-2 grid-cols-2 h-1/2">
          {answers.map((answer, index) => {
            return (
              <button className="border-2 rounded-md border-sky-500">
                <p className="text-xl font-medium">{answer}</p>
              </button>
            )
          })}
        </div>
      </div>
    )}
    </>
  )
}