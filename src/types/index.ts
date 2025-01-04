
export enum Role {
  ADMIN = 'ADMIN',
  CANDIDATE = 'CANDIDATE',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum ScheduleStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ResultStatus {
  PENDING = 'PENDING',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  examsCreated?: Exam[];
  schedules?: ExamSchedule[];
  examResults?: ExamResult[];
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  duration: number;
  passingScore: number;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  questions?: Question[];
  schedules?: ExamSchedule[];
  results?: ExamResult[];
  lesson?: Lesson;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  type: QuestionType;
  score: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
  exam?: Exam;
  answers?: Answer[];
  responses?: AnswerResponse[];
}

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  orderIndex: number;
  question?: Question;
  responses?: AnswerResponse[];
}

export interface ExamSchedule {
  id: string;
  examId: string;
  candidateId: string;
  startTime: Date;
  endTime: Date;
  status: ScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
  exam?: Exam;
  candidate?: User;
  result?: ExamResult;
}

export interface ExamResult {
  id: string;
  examId: string;
  candidateId: string;
  scheduleId: string;
  score: number;
  status: ResultStatus;
  startedAt: Date;
  completedAt?: Date;
  exam?: Exam;
  candidate?: User;
  schedule?: ExamSchedule;
  answers?: AnswerResponse[];
}

export interface AnswerResponse {
  id: string;
  resultId: string;
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  createdAt: Date;
  result?: ExamResult;
  question?: Question;
  answer?: Answer;
}

export interface Lesson {
  id: string;
  examId: string;
  title: string;
  content: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
  exam?: Exam;
}
