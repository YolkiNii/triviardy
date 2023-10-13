import Question from "./Question";

interface QuestionRequester {
  getQuestions(numQuestions: number): Question[]|Promise<Question[]>;
}

export default QuestionRequester;