import axios, { Axios } from "axios";
import Question from "./Question";
import QuestionRequester from "./QuestionRequester";

interface TriviaAPIQuestion {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

class TriviaAPIRequester implements QuestionRequester {
  static baseURL: string = "https://the-trivia-api.com/api/";
  static baseAPI: Axios = axios.create({
                            baseURL: TriviaAPIRequester.baseURL
                          });
  categories: string[];

  constructor(categories: string[]) {
    this.categories = categories;
  }
  
  /*
  GET Requests TriviaAPI(https://the-trivia-api.com/) and gets
  number of questions with given number as param.
  */
  async getQuestions(numQuestions: number): Promise<Question[]> {
    // Create the query string with parameters
    let queryString = `questions?limit=${numQuestions}`;

    if (this.categories.length > 0) {
      queryString += "&categories=";

      this.categories.forEach((category) => {
        queryString += category + ",";
      });

      queryString = queryString.slice(0, -1);
    }

    const response = await TriviaAPIRequester.baseAPI.get<TriviaAPIQuestion[]>(queryString);

    const questions: Question[] = [];

    response.data.forEach((question) => {
      questions.push(new Question(question.question, question.correctAnswer, 
                                  question.incorrectAnswers, question.difficulty));
    })

    return questions;
  }
}

export default TriviaAPIRequester;