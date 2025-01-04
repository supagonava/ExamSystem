'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

export default function ExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Fetch exam data
    const fetchExam = async () => {
      try {
        const response = await fetch(`/api/exams/${id}`);
        const data = await response.json();
        setExam(data);
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
    };

    fetchExam();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await fetch(`/api/exams/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      // Handle successful submission
    } catch (error) {
      // Handle error
    }
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card title={exam.title} className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>Question {currentQuestion + 1} of {exam.questions.length}</div>
          <div>Time Remaining: 45:00</div>
        </div>

        <div className="space-y-4">
          <p className="text-lg">{exam.questions[currentQuestion].text}</p>
          
          <div className="space-y-2">
            {exam.questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioButton
                  value={index}
                  onChange={(e) => setAnswers({ ...answers, [currentQuestion]: e.value })}
                  checked={answers[currentQuestion] === index}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            label="Previous"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(curr => curr - 1)}
          />
          {currentQuestion === exam.questions.length - 1 ? (
            <Button label="Submit" onClick={handleSubmit} />
          ) : (
            <Button
              label="Next"
              onClick={() => setCurrentQuestion(curr => curr + 1)}
            />
          )}
        </div>
      </Card>
    </div>
  );
}