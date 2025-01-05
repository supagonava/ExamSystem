'use client';

import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { getResultById, getExamDetails } from '@/data/mock';

interface Props {
    params: Promise<{ id: string }>;
}

export default function ResultPage({ params }: Props) {
    const [result, setResult] = useState<any>(null);
    const [exam, setExam] = useState<any>(null);
    const router = useRouter();

    const getResult = async () => {
        const id = (await params)?.id;
        if (id) {
            const examData = getExamDetails(id);
            const resultData = getResultById('result1'); // Temporarily hardcoded for mock
            if (examData && resultData) {
                setExam(examData);
                setResult(resultData);
            }
        }
    };

    useEffect(() => {
        getResult();
    }, [params]);

    if (!result || !exam) {
        return <div className="flex items-center justify-center h-screen">Loading result...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Card className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{exam.title}</h1>
                    <Button 
                        label="Back to Exams" 
                        icon="pi pi-arrow-left" 
                        onClick={() => router.push('/user/exams')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Score</h3>
                        <p className={`text-3xl font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.score}%
                        </p>
                    </Card>
                    <Card className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Status</h3>
                        <p className={`text-xl font-semibold ${result.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                            {result.status}
                        </p>
                    </Card>
                    <Card className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Correct Answers</h3>
                        <p className="text-xl font-semibold">
                            {result.correctAnswers} / {result.totalQuestions}
                        </p>
                    </Card>
                </div>
            </Card>

            <Card className="mb-4">
                <h2 className="text-xl font-bold mb-4">Question Review</h2>
                <div className="space-y-6">
                    {result.questions.map((q: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Question {index + 1}</h3>
                            <p className="mb-3">{q.question}</p>
                            <div className="pl-4 space-y-2">
                                <div className="flex items-center">
                                    <span className="font-semibold mr-2">Your Answer:</span>
                                    <span className={q.isCorrect ? 'text-green-600' : 'text-red-600'}>
                                        {q.userAnswer}
                                    </span>
                                </div>
                                {!q.isCorrect && (
                                    <div className="flex items-center">
                                        <span className="font-semibold mr-2">Correct Answer:</span>
                                        <span className="text-green-600">{q.correctAnswer}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
