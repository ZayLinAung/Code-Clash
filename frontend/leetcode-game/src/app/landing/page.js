'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/compile', {
        source_code: code,
        language_id: 71, // Python (3.8.1)
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error submitting code:', error);
      setResults([{
        input: '',
        expectedOutput: '',
        actualOutput: '',
        stderr: '',
        passed: false,
        status: 'Error',
        error: 'An error occurred while submitting the code'
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Code Compiler</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>
      </form>
      <h2>Test Results:</h2>
      {results.map((result, index) => (
        <div key={index}>
          <h3>Test Case {index + 1}</h3>
          <p>Input: {result.input}</p>
          <p>Expected Output: {result.expectedOutput}</p>
          <p>Actual Output: {result.actualOutput}</p>
          {result.stderr && <p>Error: {result.stderr}</p>}
          {result.compileOutput && <p>Compilation Error: {result.compileOutput}</p>}
          <p>Status: {result.status}</p>
          <p>Passed: {result.passed ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}
