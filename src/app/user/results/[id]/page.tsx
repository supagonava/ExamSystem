'use client'

import { useEffect, useState } from 'react';
import ResultContent from './ResultContent'
import { getResultById } from '@/data/mock'

export default function ExamResultPage({ params }: { params: Promise<{ id: string }> }) {
    const [examResult, setExamResult] = useState<{
        questions: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean; }[];
        id: string;
        examId: string;
        examTitle: string;
        completedAt: string;
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        status: "Passed" | "Failed";
        answers: { questionId: string; userAnswer: string; }[];
    } | null>(null);

    const getResult = async () => {
        const id = (await params)?.id;
        if (id) {
            const result = getResultById(id);
            setExamResult(result);
        }
    }

    useEffect(() => {
        getResult()
    }, [params])


    if (!examResult) {
        return <div>Result not found</div>
    }

    return <ResultContent examResult={examResult} />
}
