import React from 'react';

const CandidateResults = () => {
  const results = [
    { id: 1, exam: 'Math Test', score: 85, status: 'Passed' },
    { id: 2, exam: 'English Test', score: 60, status: 'Failed' },
  ];

  return (
    <div>
      <h1>Exam Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.exam} - Score: {result.score} - Status: {result.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateResults;
