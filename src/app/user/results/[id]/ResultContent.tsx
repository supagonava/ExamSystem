'use client'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'

interface ResultContentProps {
    examResult: {
        id: string;
        examTitle: string;
        completedAt: string;
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        status: string;
        questions?: Array<{
            question: string;
            userAnswer: string;
            correctAnswer: string;
            isCorrect: boolean;
        }>;
    }
}

export default function ResultContent({ examResult }: ResultContentProps) {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="mb-4">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">{examResult.examTitle}</h1>
                    <p className="text-gray-600 mb-4">Completed on: {examResult.completedAt}</p>
                    <div className="text-6xl font-bold mb-4 text-blue-600">{examResult.score}%</div>
                    <p className="mb-2">Correct Answers: {examResult.correctAnswers} out of {examResult.totalQuestions}</p>
                    <p className={`text-lg mb-4 ${examResult.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                        {examResult.status}
                    </p>
                </div>
            </Card>

            {examResult.questions && (
                <Card>
                    <h2 className="text-xl font-bold mb-4">Question Review</h2>
                    <div className="space-y-6">
                        {examResult.questions.map((q, index) => (
                            <div key={index} className="border-b pb-4">
                                <p className="font-semibold mb-2">Question {index + 1}: {q.question}</p>
                                <p className="mb-1">Your Answer: 
                                    <span className={q.isCorrect ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                                        {q.userAnswer}
                                    </span>
                                </p>
                                {!q.isCorrect && (
                                    <p className="text-green-600">Correct Answer: {q.correctAnswer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <div className="mt-4 text-center">
                <Button 
                    label="Back to Results" 
                    onClick={() => router.push('/user/results')}
                    className="p-button-primary" 
                />
            </div>
        </div>
    )
}
