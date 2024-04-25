import { QuestionType } from "@/types/QuestionType";
import Square from "./Square"
import { SetStateAction, useState } from "react";
import { SocketEvent, useSocketEvents } from "@/hooks/useSocketEvents";
import socket from "@/services/socket";
import useRoomID from "@/hooks/useRoomID";
import useUser from "@/hooks/useUser";
import { TriviardyPlayerType } from "@/types/TriviardyPlayerType";
import { Dispatch } from "react";
import clsx from "clsx";

export interface IBoardProps {
  questions: QuestionType[];
  player: TriviardyPlayerType;
  turnPlayerID: number;
  selectedQuestion: QuestionType | undefined;
  setSelectedQuestion: Dispatch<SetStateAction<QuestionType | undefined>>
}

export default function Board({ questions, player, turnPlayerID, selectedQuestion, setSelectedQuestion }: IBoardProps) {
  const roomID = useRoomID();

  const events: SocketEvent[] = [
    {
      name: "game:question_selected",
      handler(data) {
        setSelectedQuestion(data.question);
      }
    }
  ]

  useSocketEvents(events);

  function handleQuestionSelect(question: QuestionType) {
    const data = {
      roomID,
      questionID: question.id
    }
    socket.emit("game:request_question_select", data);
  }

  function handleAnswerSelect(answer: string) {
    const data = {
      roomID,
      playerID: player.id,
      questionID: selectedQuestion?.id,
      answer
    }

    socket.emit("game:request_answer_select", data);
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
          <Square key={i} question={question} turnPlayerID={turnPlayerID} player={player} handleQuestionSelect={handleQuestionSelect}/>
        )}
      </div>
    ) : (
      <div className="flex flex-col w-4/6 h-96 ml-auto mr-auto bg-slate-200 border-2">
        <p className="text-center text-3xl font-bold m-auto break-words w-9/12">{selectedQuestion.text}</p>
        <div className="bottom-auto w-full grid grid-rows-2 grid-cols-2 h-1/2">
          {answers.map((answer, index) => {
            return (
              <button className="border-2 rounded-md border-sky-500 hover:cursor-pointer" disabled={player.haveAnswered} onClick={() => handleAnswerSelect(answer)}>
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