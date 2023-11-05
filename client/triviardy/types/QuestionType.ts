export interface QuestionType {
  text: string;
  answer: string;
  incorrectAnswers: string[];
  difficulty: string;
  answered: boolean;
}