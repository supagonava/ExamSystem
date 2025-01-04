import React from 'react';

const CandidateExams = () => {
  const exams = [
    { id: 1, title: 'Math Test' },
    { id: 2, title: 'English Test' },
  ];

  return (
    <div>
      <h1>Available Exams</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>{exam.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateExams;

