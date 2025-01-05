'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { getExamDetails, getExamQuestions } from '@/data/mock';

interface Answer {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    answers: Answer[];
}

interface ExamResult {
    score: number;
    totalQuestions: number;
    passed: boolean;
}

export function ExamContent({ examId }: { examId: string }) {
    const [exam, setExam] = useState<any>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<ExamResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchExam = () => {
            const examData = getExamDetails(examId);
            const examQuestions = getExamQuestions(examId);
            
            if (!examData) {
                router.push('/user/exams');
                return;
            }

            setExam(examData);
            setQuestions(examQuestions);
            setLoading(false);
        };

        fetchExam();
    }, [examId, router]);

    const handleAnswerSelect = (questionId: string, answerId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleSubmit = () => {
        // Mock result calculation
        const totalQuestions = questions.length;
        const correctAnswers = Math.floor(Math.random() * totalQuestions);
        const score = (correctAnswers / totalQuestions) * 100;
        
        setResult({
            score,
            totalQuestions,
            passed: score >= 70
        });
        setShowResult(true);
    };

    const handleFinish = () => {
        router.push('/user/exams');
    };

    if (loading) return <div>กำลังโหลด...</div>;
    if (!exam) return <div>ไม่พบข้อสอบ</div>;

    if (showResult && result) {
        return (
            <div className="text-center p-6">
                <h2 className="text-2xl font-bold mb-4">ผลการสอบ</h2>
                <div className="text-xl mb-4">
                    คะแนนที่ได้: {result.score.toFixed(2)}%
                </div>
                <div className={`text-xl mb-6 ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {result.passed ? 'ผ่าน' : 'ไม่ผ่าน'}
                </div>
                <Button label="กลับสู่หน้าหลัก" onClick={handleFinish} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
            <div className="mb-6">
                <p className="text-gray-600">{exam.description}</p>
                <p className="mt-2">Duration: {exam.duration} minutes</p>
                <p>Start Time: {exam.startTime}</p>
            </div>
            <div className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="border p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                            {index + 1}. {question.text}
                        </h3>
                        <div className="ml-4 space-y-2">
                            {question.answers.map((answer) => (
                                <div key={answer.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        id={answer.id}
                                        className="mr-2"
                                        checked={selectedAnswers[question.id] === answer.id}
                                        onChange={() => handleAnswerSelect(question.id, answer.id)}
                                    />
                                    <label htmlFor={answer.id}>{answer.text}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-6">
                <Button 
                    label="ส่งคำตอบ" 
                    onClick={handleSubmit}
                    className="p-button-success"
                    disabled={Object.keys(selectedAnswers).length !== questions.length}
                />
            </div>
        </div>
    );
}
