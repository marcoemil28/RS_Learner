export interface QuizQuestion {
  id: string;
  moduleId: string;
  moduleTitle: string;
  icon: string;
  itemId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}
