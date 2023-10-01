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
  
}

export default Question;