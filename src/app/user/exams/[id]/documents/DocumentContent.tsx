'use client'
import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { Dialog } from 'primereact/dialog'
import { useRouter } from 'next/navigation'
import { getLesson } from '@/data/mock'

interface DocumentContentProps {
    examId: string;
}

interface Lesson {
    title: string;
    readingTime: number;
    documentUrl?: string;
    content: string;
}

export default function DocumentContent({ examId }: DocumentContentProps) {
    const router = useRouter()
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [timeLeft, setTimeLeft] = useState(0)
    const [totalTime, setTotalTime] = useState(0)
    const [showProceedDialog, setShowProceedDialog] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const lessonData = getLesson(examId)
        if (lessonData) {
            setLesson(lessonData)
            const timeInSeconds = lessonData.readingTime * 60
            setTimeLeft(timeInSeconds)
            setTotalTime(timeInSeconds)
        }
        setLoading(false)
    }, [examId])

    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleProceedToExam = () => {
        try {
            router.push(`/user/exams/${examId}`);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    if (!lesson) {
        return <div className="flex items-center justify-center h-screen">Lesson not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">{lesson?.title}</h2>
                        <p className="text-gray-600 mt-1">
                            Please read the safety manual carefully before proceeding to the exam
                        </p>
                    </div>
                    <Button
                        label="Skip Reading"
                        icon="pi pi-fast-forward"
                        className="p-button-secondary p-button-text"
                        onClick={() => setTimeLeft(0)}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Reading Time Remaining</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
                        <span className="text-sm text-gray-600">
                            ({Math.round((timeLeft / totalTime) * 100)}%)
                        </span>
                    </div>
                </div>
                <ProgressBar 
                    value={Math.round((timeLeft / totalTime) * 100)}
                    className="mt-2"
                    color={timeLeft < totalTime * 0.2 ? '#ff4d4d' : undefined}
                />
            </Card>

            <Card className="min-h-[600px]">
                {lesson?.documentUrl ? (
                    <iframe
                        src={lesson.documentUrl}
                        className="w-full h-[600px] border-0"
                        title="Safety Manual"
                    />
                ) : (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                        <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
                    </div>
                )}
            </Card>

            <div className="flex justify-end">
                <Button
                    label="Proceed to Exam"
                    icon="pi pi-check"
                    onClick={() => setShowProceedDialog(true)}
                    disabled={timeLeft > 0}
                />
            </div>

            <Dialog
                header="Proceed to Exam"
                visible={showProceedDialog}
                style={{ width: '50vw' }}
                footer={
                    <div>
                        <Button label="No" icon="pi pi-times" onClick={() => setShowProceedDialog(false)} className="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" onClick={handleProceedToExam} autoFocus />
                    </div>
                }
                onHide={() => setShowProceedDialog(false)}
            >
                <p>Are you sure you want to proceed to the exam?</p>
            </Dialog>
        </div>
    )
}
