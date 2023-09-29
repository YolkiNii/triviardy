import Question from "./Question";

interface QuestionRequester {
  getQuestions(numQuestions: number): [Question];
}

export default QuestionRequester;