export interface IQuestion {
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;
}

class Question {
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;

  constructor(text: string, answer: string, incorrectAnswers: string[],
              difficulty: string) {
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
      text: this.text,
      answer: this.answer,
      incorrectAnswers: this.incorrectAnswers,
      difficulty: this.difficulty,
      answered: this.answered
    }
  }
}

export default Question;