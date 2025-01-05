'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { getExamDetails, getExamQuestions } from '@/data/mock';

interface ExamContentProps {
    examId: string;
}

interface Answer {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    answers: Answer[];
}

export default function ExamContent({ examId }: ExamContentProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [exam, setExam] = useState<any>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const router = useRouter();

    const getAnswerStatus = (questionIndex: number) => {
        const questionId = questions[questionIndex].id;
        return {
            isAnswered: !!answers[questionId],
            isCurrent: currentQuestionIndex === questionIndex
        };
    };

    useEffect(() => {
        if (!examId) {
            console.error('No exam ID provided');
            return;
        }

        // ใช้ mock data แทน API
        const examData = getExamDetails(examId);
        const questionData = getExamQuestions(examId);
        
        if (examData && questionData) {
            setExam(examData);
            setQuestions(questionData);
            setTimeLeft(examData.duration * 60);
            setLoading(false);
        } else {
            console.error('Error loading exam:', examId);
            router.push('/user/exams');
        }
    }, [examId, router]);

    useEffect(() => {
        if (!loading && !exam) {
            // ถ้าโหลดเสร็จแล้วและไม่พบข้อสอบ ค่อย redirect
            const timer = setTimeout(() => {
                router.push('/user/exams');
            }, 2000); // delay 2 seconds before redirect
            
            return () => clearTimeout(timer);
        }
    }, [loading, exam, router]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsTimeExpired(true);
                    handleSubmit(true); // Pass true to indicate time expired
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (questionId: string, answerId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    };

    const isAllQuestionsAnswered = () => {
        return questions.length > 0 && Object.keys(answers).length === questions.length;
    };

    const handleSubmit = (isAutoSubmit: boolean = false) => {
        if (!exam || !questions) return;
        
        if (!isAutoSubmit && !isAllQuestionsAnswered()) {
            return; // Prevent manual submission if not all questions are answered
        }

        let correctCount = 0;
        const totalQuestions = questions.length;
        
        questions.forEach(question => {
            if (answers[question.id] === question.answers[0].id) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / totalQuestions) * 100);
        
        // Update: Change redirect path to new result page
        router.push(`/user/exams/${examId}/result`);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading exam...</div>;
    }

    if (!exam) {
        return <div className="flex items-center justify-center h-screen">Exam not found</div>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <div className="w-full md:w-2/3 p-4 overflow-y-auto">
                <Card className="mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Time Remaining</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
                            <span className="text-sm text-gray-600">
                                ({Math.round((timeLeft / (exam?.duration * 60)) * 100)}%)
                            </span>
                        </div>
                    </div>
                    <ProgressBar 
                        value={Math.round((timeLeft / (exam?.duration * 60)) * 100)} 
                        className="mt-2" 
                    />
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-4">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                    <p className="mb-4 text-lg">{questions[currentQuestionIndex].text}</p>
                    <div className="space-y-3">
                        {questions[currentQuestionIndex].answers.map((answer) => (
                            <div 
                                key={answer.id} 
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                                    ${answers[questions[currentQuestionIndex].id] === answer.id 
                                        ? 'bg-blue-500 text-white border-blue-600' 
                                        : 'hover:bg-gray-50'}`}
                                onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, answer.id)}
                            >
                                <input
                                    type="radio"
                                    id={answer.id}
                                    name={`question-${questions[currentQuestionIndex].id}`}
                                    checked={answers[questions[currentQuestionIndex].id] === answer.id}
                                    onChange={() => {}} // Handle change through div click
                                    className="mr-3"
                                />
                                <label htmlFor={answer.id} className="cursor-pointer flex-1">
                                    {answer.text}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button 
                            label="Previous" 
                            icon="pi pi-arrow-left"
                            disabled={currentQuestionIndex === 0}
                            onClick={handlePrevious}
                        />
                        <Button 
                            label="Next" 
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            disabled={currentQuestionIndex === questions.length - 1}
                            onClick={handleNext}
                        />
                    </div>
                </Card>
            </div>

            <div className="w-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l bg-white">
                <h3 className="text-lg font-semibold mb-4">Question Navigation</h3>
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {questions.map((_, index) => {
                        const { isAnswered, isCurrent } = getAnswerStatus(index);
                        return (
                            <Button
                                key={index}
                                label={(index + 1).toString()}
                                className={`p-button-sm ${
                                    isAnswered 
                                        ? 'p-button-success' 
                                        : 'p-button-outlined p-button-secondary'
                                } ${isCurrent ? '!border-2 !border-blue-500 !font-bold' : ''}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                                icon={isAnswered ? "pi pi-check" : "pi pi-minus"}
                                iconPos="right"
                                tooltip={isAnswered ? "Answered" : "Not answered yet"}
                            />
                        );
                    })}
                </div>
                <div className="space-y-4">
                    <Button 
                        label="Submit Exam" 
                        className="w-full"
                        severity="success"
                        onClick={() => setShowSubmitDialog(true)}
                        disabled={!isAllQuestionsAnswered()}
                        tooltip={!isAllQuestionsAnswered() ? "Please answer all questions before submitting" : ""}
                    />
                    {!isAllQuestionsAnswered() && (
                        <div className="text-sm text-orange-600 text-center">
                            {questions.length - Object.keys(answers).length} questions remaining
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                visible={showSubmitDialog}
                onHide={() => setShowSubmitDialog(false)}
                header={isTimeExpired ? "Time's Up!" : "Submit Exam"}
                footer={
                    <div>
                        {!isTimeExpired && (
                            <Button 
                                label="Cancel" 
                                icon="pi pi-times" 
                                onClick={() => setShowSubmitDialog(false)} 
                                className="p-button-text" 
                            />
                        )}
                        <Button 
                            label="Submit" 
                            icon="pi pi-check" 
                            onClick={() => handleSubmit(false)} 
                            severity="success"
                            disabled={!isAllQuestionsAnswered() && !isTimeExpired}
                        />
                    </div>
                }
            >
                {isTimeExpired ? (
                    <p>Time has expired. Your exam will be submitted automatically.</p>
                ) : (
                    <>
                        <p>Are you sure you want to submit your exam?</p>
                        <p className="mt-2">
                            Answered: {Object.keys(answers).length} of {questions.length} questions
                        </p>
                    </>
                )}
            </Dialog>
        </div>
    );
}
