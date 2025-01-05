
'use client'

import { useEffect, useState } from 'react'



interface ExamTimerProps {

    duration: number // in minutes

    onTimeUp: () => void

}



export default function ExamTimer({ duration, onTimeUp }: ExamTimerProps) {

    const [timeLeft, setTimeLeft] = useState(duration * 60)



    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timer)

                    onTimeUp()

                    return 0

                }

                return prev - 1

            })

        }, 1000)



        return () => clearInterval(timer)

    }, [onTimeUp])



    const minutes = Math.floor(timeLeft / 60)

    const seconds = timeLeft % 60



    return (

        <div className="text-xl font-semibold">

            {minutes}:{seconds.toString().padStart(2, '0')}

        </div>

    )

}
