'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as monaco from 'monaco-editor';

interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  compileOutput?: string;
  passed: boolean;
  status: string;
  error?: string;
}

export default function Home() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoEditor.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: 'python',
        theme: 'vs-dark',
        minimap: { enabled: false },
      });

      monacoEditor.current.onDidChangeModelContent(() => {
        setCode(monacoEditor.current?.getValue() || '');
      });
    }

    return () => {
      monacoEditor.current?.dispose();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
        <div ref={editorRef} style={{ height: '400px', border: '1px solid #ccc' }} />
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