export interface IQuestion {
  id: number
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;
}

class Question {
  id: number
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;

  constructor(id: number, text: string, answer: string, incorrectAnswers: string[],
              difficulty: string) {
    this.id = id;
    this.text = text;
    this.answer = answer;
    this.incorrectAnswers = incorrectAnswers;
    this.difficulty = difficulty;
    this.answered = false;
  } 

  markAsAnswered(): void {
    this.answered = true;
  }

  toObject(): IQuestion {
    return {
      id: this.id,
      text: this.text,
      answer: this.answer,
      incorrectAnswers: this.incorrectAnswers,
      difficulty: this.difficulty,
      answered: this.answered
    }
  }
}

export default Question;