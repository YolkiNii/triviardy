class Question {
  text: string;
  answer: string;
  incorrectAnswers: [string];
  difficulty: string;
  answered: boolean;

  markAsAnswered(): void {
    this.answered = true;
  }
  
}

export default Question;