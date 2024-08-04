'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as monaco from 'monaco-editor';
import ReactMarkdown from 'react-markdown';
import 'animate.css';

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
  
  const [problemStatement, setProblemStatement] = useState('Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to_ `target`.\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n You can return the answer in any order.\n \n**Example 1:**\n > Input: \n\n```2 7 11 15```\n\n```9``` \n\nOutput: \n\n```0 1```\n\n**Example 2:**\n\n > Input:\n\n```3 2 4```\n\n```6```\n > Output:\n\n```1 2```\n\n ');

  const [progress, setProgress] = useState(0);


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

  const handleRunTests = async () => {
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
    <div className="container">
      <div className="problem-statement">
        <ReactMarkdown>{problemStatement}</ReactMarkdown>
      </div>
      <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      <div className="code-editor">
        <div ref={editorRef} className="editor" />
        <button onClick={handleRunTests} disabled={isLoading} className="button-27">
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <p><strong>Input:</strong> {result.input}</p>
              <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
              <p><strong>Actual Output:</strong> {result.actualOutput}</p>
              {result.stderr && <p><strong>Error:</strong> {result.stderr}</p>}
              {result.compileOutput && <p><strong>Compilation Error:</strong> {result.compileOutput}</p>}
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Passed:</strong> {result.passed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .problem-statement, .code-editor {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
        .editor {
          height: 400px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .button-27 {
          appearance: none;
          background-color: #040725;
          border: 2px solid #1A1A1A;
          border-radius: 15px;
          box-sizing: border-box;
          color: #FFFFFF;
          cursor: pointer;
          display: inline-block;
          font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
          font-size: 16px;
          font-weight: 600;
          line-height: normal;
          margin: 0;
          min-height: 60px;
          min-width: 0;
          outline: none;
          padding: 16px 24px;
          text-align: center;
          text-decoration: none;
          transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          width: 100%;
          will-change: transform;
        }
        .button-27:disabled {
          pointer-events: none;
        }
        .button-27:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
          transform: translateY(-2px);
        }
        .button-27:active {
          box-shadow: none;
          transform: translateY(0);
        }
        .results {
          margin-top: 20px;
        }
        .result-item {
          background-color: #f1f1f1;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 15px;
        }
        h2 {
          color: #333;
        }
        h3 {
          color: #444;
        }
        p {
          margin: 5px 0;
        }
          progress-bar {
          width: 50%;
          height: 10px;
          background-color: #e0e0e0;
          border-radius: 5px;
          margin-top: 20px;
          overflow: hidden;
        }
        .progress {
          height: 100%;
          background-color: #4CAF50;
          transition: width 0.3s ease-in-out;
        }

          
      `}</style>
    </div>
  );
}