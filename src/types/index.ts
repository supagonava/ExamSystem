export interface User {
  _id: string;
  username: string;
  password: string;
  role: 'admin' | 'candidate';
  email: string;
}

export interface Exam {
  _id: string;
  title: string;
  description: string;
  duration: number;
  passingScore: number;
  questions: Question[];
  lesson?: {
    content: string;
    readingTime: number;
  };
}

export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  score: number;
}

export interface ExamSchedule {
  _id: string;
  examId: string;
  candidateId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'in-progress' | 'completed';
}

