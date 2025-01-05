interface Exam {
    id: string;
    title: string;
    description?: string;
    duration: number;
    startTime: string;
    status: "Ready" | "Scheduled" | "In Progress";
    documentUrl?: string;
}

interface ExamResult {
    examTitle: string;
    completedAt: string;
    score: number;
    status: "Passed" | "Failed";
}

interface Question {
    id: string;
    text: string;
    answers: Array<{
        id: string;
        text: string;
    }>;
}

interface Lesson {
    title: string;
    readingTime: number;
    documentUrl?: string;
    content: string;
}

interface DetailedExamResult {
    id: string;
    examId: string;
    examTitle: string;
    completedAt: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    status: "Passed" | "Failed";
    answers: Array<{
        questionId: string;
        userAnswer: string;
    }>;
}

const mockExams: Exam[] = [
    {
        id: "exam1",
        title: "ความปลอดภัยพื้นฐานในโรงงานผลิตกระป๋อง",
        description: "การทดสอบความรู้เกี่ยวกับความปลอดภัยขั้นพื้นฐานในโรงงาน",
        duration: 60,
        startTime: "2024-02-01T10:00:00",
        status: "Scheduled",
        documentUrl: "https://area6.labour.go.th/attachments/article/438/safety-manual%20(1).pdf",
    },
    {
        id: "exam2",
        title: "มาตรฐานการควบคุมคุณภาพกระป๋อง",
        duration: 90,
        startTime: "2024-02-05T14:00:00",
        status: "Ready",
    },
    {
        id: "exam3",
        title: "การใช้เครื่องจักรในสายการผลิต",
        duration: 120,
        startTime: "2024-02-10T09:00:00",
        status: "Scheduled",
    },
];

const mockResults: ExamResult[] = [
    {
        examTitle: "การจัดการวัตถุดิบในโรงงาน",
        completedAt: "2024-01-15",
        score: 85,
        status: "Passed",
    },
    {
        examTitle: "ความปลอดภัยในการใช้สารเคมี",
        completedAt: "2024-01-10",
        score: 65,
        status: "Failed",
    },
];

const mockQuestions: Question[] = [
    {
        id: "q1",
        text: "อุปกรณ์ป้องกันส่วนบุคคล (PPE) ชนิดใดที่จำเป็นต้องสวมใส่เมื่อทำงานในพื้นที่ที่มีเสียงดัง?",
        answers: [
            { id: "a1", text: "ที่ครอบหูหรือปลั๊กอุดหู" },
            { id: "a2", text: "แว่นตานิรภัย" },
            { id: "a3", text: "ถุงมือยาง" },
            { id: "a4", text: "หน้ากากกันฝุ่น" },
        ],
    },
    {
        id: "q2",
        text: "ข้อใดคือขั้นตอนแรกที่ต้องทำเมื่อพบเครื่องจักรทำงานผิดปกติ?",
        answers: [
            { id: "b1", text: "กดปุ่มหยุดฉุกเฉินทันที" },
            { id: "b2", text: "แจ้งหัวหน้างาน" },
            { id: "b3", text: "พยายามซ่อมด้วยตนเอง" },
            { id: "b4", text: "ปล่อยให้เครื่องจักรทำงานต่อไป" },
        ],
    },
    {
        id: "q3",
        text: "วิธีการตรวจสอบคุณภาพกระป๋องที่ถูกต้องคือข้อใด?",
        answers: [
            { id: "c1", text: "ตรวจสอบด้วยสายตาเพียงอย่างเดียว" },
            { id: "c2", text: "ใช้เครื่องมือวัดความหนาและทดสอบการรั่วซึม" },
            { id: "c3", text: "เคาะฟังเสียง" },
            { id: "c4", text: "ทดสอบด้วยการกดที่ฝากระป๋อง" },
        ],
    },
];

const mockDetailedResults: DetailedExamResult[] = [
    {
        id: "result1",
        examId: "exam1",
        examTitle: "ความปลอดภัยพื้นฐานในโรงงานผลิตกระป๋อง",
        completedAt: "2024-01-15 14:30",
        score: 85,
        totalQuestions: 10,
        correctAnswers: 8,
        status: "Passed",
        answers: [
            { questionId: "q1", userAnswer: "ที่ครอบหูหรือปลั๊กอุดหู" },
            { questionId: "q2", userAnswer: "พยายามซ่อมด้วยตนเอง" },
            { questionId: "q3", userAnswer: "ใช้เครื่องมือวัดความหนาและทดสอบการรั่วซึม" }
        ]
    },
    {
        id: "result2",
        examId: "exam2",
        examTitle: "มาตรฐานการควบคุมคุณภาพกระป๋อง",
        completedAt: "2024-01-10 10:15",
        score: 65,
        totalQuestions: 10,
        correctAnswers: 6,
        status: "Failed",
        answers: [
            { questionId: "q1", userAnswer: "แว่นตานิรภัย" },
            { questionId: "q2", userAnswer: "กดปุ่มหยุดฉุกเฉินทันที" },
            { questionId: "q3", userAnswer: "เคาะฟังเสียง" }
        ]
    }
];

export const getUpcomingExams = (userId?: string) => {
    return mockExams;
};

export const getRecentResults = (userId?: string) => {
    return mockResults;
};

export const getExamDetails = (examId: string) => {
    return mockExams.find((exam) => exam.id === examId);
};

export const getExamQuestions = (examId: string) => {
    return mockQuestions;
};

export const getUpcomingExam = (examId: string) => {
    return mockExams.find((exam) => exam.id === examId);
};

export const getLesson = (examId: string): Lesson => {
    return {
        title: "คู่มือความปลอดภัยในโรงงานผลิตกระป๋อง",
        readingTime: 30,
        documentUrl: "https://area6.labour.go.th/attachments/article/438/safety-manual%20(1).pdf",
        content: "เอกสารประกอบการเรียนรู้เกี่ยวกับความปลอดภัยในโรงงาน..."
    };
};

export const getUserProfile = () => {
    return {
        id: "user1",
        name: "สมชาย ใจดี",
        email: "somchai@example.com",
        role: "USER",
    };
};

export const getResultById = (resultId: string) => {
    const result = mockDetailedResults.find(r => r.id === resultId);
    if (!result) return null;

    // Combine the result with questions data to create detailed view
    const detailedResult = {
        ...result,
        questions: result.answers.map(answer => {
            const question = mockQuestions.find(q => q.id === answer.questionId);
            if (!question) return null;
            
            const correctAnswer = question.answers[0].text; // Assuming first answer is correct
            
            return {
                question: question.text,
                userAnswer: answer.userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: answer.userAnswer === correctAnswer
            };
        }).filter(q => q !== null)
    };

    return detailedResult;
};

export const getUserResults = (userId: string) => {
    return mockDetailedResults.map(result => ({
        id: result.id,
        examTitle: result.examTitle,
        completedAt: result.completedAt,
        score: result.score,
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        status: result.status
    }));
};

// Add new mock data for admin pages
export const mockAdminUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', role: 'USER', status: 'Active', lastLogin: '2024-01-20' },
  { id: 2, username: 'admin1', email: 'admin1@example.com', role: 'ADMIN', status: 'Active', lastLogin: '2024-01-21' },
  { id: 3, username: 'user2', email: 'user2@example.com', role: 'USER', status: 'Inactive', lastLogin: '2024-01-15' },
];

export const mockAdminExams = [
  { 
    id: 1, 
    title: 'ความปลอดภัยพื้นฐาน', 
    description: 'การทดสอบความรู้เกี่ยวกับความปลอดภัย',
    duration: 60,
    questions: 20,
    status: 'Active',
    createdAt: '2024-01-20'
  },
];

export const mockQuestionTypes = [
  { label: 'Multiple Choice', value: 'MULTIPLE_CHOICE' },
  { label: 'True/False', value: 'TRUE_FALSE' },
  { label: 'Short Answer', value: 'SHORT_ANSWER' },
];

export const mockAdminQuestions = [
    {
        id: 1,
        text: "อุปกรณ์ป้องกันส่วนบุคคล (PPE) ชนิดใดที่จำเป็นต้องสวมใส่เมื่อทำงานในพื้นที่ที่มีเสียงดัง?",
        type: "MULTIPLE_CHOICE",
        score: 1,
        answers: [
            { id: 1, text: "ที่ครอบหูหรือปลั๊กอุดหู", isCorrect: true },
            { id: 2, text: "แว่นตานิรภัย", isCorrect: false },
            { id: 3, text: "ถุงมือยาง", isCorrect: false },
            { id: 4, text: "หน้ากากกันฝุ่น", isCorrect: false },
        ],
    },
    // ...existing questions...
];
