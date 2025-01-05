'use client'
import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { useRouter } from 'next/navigation'
import { getLesson } from '@/data/mock'

export default function DocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lesson = getLesson(params.id)
  const [timeLeft, setTimeLeft] = useState(lesson?.readingTime * 60 || 1800)
  const [totalTime] = useState(lesson?.readingTime * 60 || 1800)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartExam = () => {
    router.push(`/user/exams/${params.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 p-4">
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">เวลาที่เหลือในการอ่าน</h2>
          <span className="text-lg">{formatTime(timeLeft)}</span>
        </div>
        <ProgressBar value={(timeLeft / totalTime) * 100} />
      </Card>

      <Card>
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <div className="prose max-w-none">
          {lesson.content}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          label="เริ่มทำแบบทดสอบ"
          disabled={timeLeft > 0}
          onClick={handleStartExam}
          className="p-button-success"
        />
      </div>
    </div>
  )
}
