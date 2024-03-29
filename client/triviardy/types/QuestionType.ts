export interface QuestionType {
  id: number,
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;
}