interface Exam {
    id: string;
    title: string;
    description?: string;
    duration: number;
    startTime: string;
    status: 'Ready' | 'Scheduled' | 'In Progress';
}

interface ExamResult {
    examTitle: string;
    completedAt: string;
    score: number;
    status: 'Passed' | 'Failed';
}

interface Question {
    id: string;
    text: string;
    answers: Array<{
        id: string;
        text: string;
    }>;
}

const mockExams: Exam[] = [
    {
        id: 'exam1',
        title: 'ความปลอดภัยพื้นฐานในโรงงานผลิตกระป๋อง',
        description: 'การทดสอบความรู้เกี่ยวกับความปลอดภัยขั้นพื้นฐานในโรงงาน',
        duration: 60,
        startTime: '2024-02-01T10:00:00',
        status: 'Scheduled'
    },
    {
        id: 'exam2',
        title: 'มาตรฐานการควบคุมคุณภาพกระป๋อง',
        duration: 90,
        startTime: '2024-02-05T14:00:00',
        status: 'Ready'
    },
    {
        id: 'exam3',
        title: 'การใช้เครื่องจักรในสายการผลิต',
        duration: 120,
        startTime: '2024-02-10T09:00:00',
        status: 'Scheduled'
    }
];

const mockResults: ExamResult[] = [
    {
        examTitle: 'การจัดการวัตถุดิบในโรงงาน',
        completedAt: '2024-01-15',
        score: 85,
        status: 'Passed'
    },
    {
        examTitle: 'ความปลอดภัยในการใช้สารเคมี',
        completedAt: '2024-01-10',
        score: 65,
        status: 'Failed'
    }
];

const mockQuestions: Question[] = [
    {
        id: 'q1',
        text: 'อุปกรณ์ป้องกันส่วนบุคคล (PPE) ชนิดใดที่จำเป็นต้องสวมใส่เมื่อทำงานในพื้นที่ที่มีเสียงดัง?',
        answers: [
            { id: 'a1', text: 'ที่ครอบหูหรือปลั๊กอุดหู' },
            { id: 'a2', text: 'แว่นตานิรภัย' },
            { id: 'a3', text: 'ถุงมือยาง' },
            { id: 'a4', text: 'หน้ากากกันฝุ่น' }
        ]
    },
    {
        id: 'q2',
        text: 'ข้อใดคือขั้นตอนแรกที่ต้องทำเมื่อพบเครื่องจักรทำงานผิดปกติ?',
        answers: [
            { id: 'b1', text: 'กดปุ่มหยุดฉุกเฉินทันที' },
            { id: 'b2', text: 'แจ้งหัวหน้างาน' },
            { id: 'b3', text: 'พยายามซ่อมด้วยตนเอง' },
            { id: 'b4', text: 'ปล่อยให้เครื่องจักรทำงานต่อไป' }
        ]
    },
    {
        id: 'q3',
        text: 'วิธีการตรวจสอบคุณภาพกระป๋องที่ถูกต้องคือข้อใด?',
        answers: [
            { id: 'c1', text: 'ตรวจสอบด้วยสายตาเพียงอย่างเดียว' },
            { id: 'c2', text: 'ใช้เครื่องมือวัดความหนาและทดสอบการรั่วซึม' },
            { id: 'c3', text: 'เคาะฟังเสียง' },
            { id: 'c4', text: 'ทดสอบด้วยการกดที่ฝากระป๋อง' }
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
    return mockExams.find(exam => exam.id === examId);
};

export const getExamQuestions = (examId: string) => {
    return mockQuestions;
};

export const getUpcomingExam = (examId: string) => {
    return mockExams.find(exam => exam.id === examId);
};

export const getLesson = (examId: string) => {
    return {
        title: 'คู่มือความปลอดภัยในโรงงานผลิตกระป๋อง',
        readingTime: 30, // minutes
        content: 'เอกสารประกอบการเรียนรู้เกี่ยวกับความปลอดภัยในโรงงาน...'
    };
};

export const getUserProfile = () => {
    return {
        id: 'user1',
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        role: 'USER'
    };
};
