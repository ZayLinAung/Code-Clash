'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as monaco from 'monaco-editor';

import Image from "next/image";
import Progress from "react-progress";
import Editor from "@monaco-editor/react";
import CodeEditor from "../codeEditor";
import Problem from "../problem";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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

  const onChange = (field: string, value: string) => {
    if (field === "code") {
      setCode(value);
    }
  };

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
    // ... rest of the handleSubmit function ...
  };

  return (
    <div className="flex flex-col p-[20px]">
      <Progress percent={99} />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[20px]">
        </div>
        <div className="text-[20px]">Timer: 3:00</div>
      </div>
      <div className="flex py-[20px] gap-[20px]">
        <div className="flex-1">
          <div className="flex flex-col gap-[20px]">
            <CodeEditor
              code={code}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex-1">
          <Problem />
        </div>
      </div>
    </div>
  );
}
// <div>
    //   <h1>Code Compiler</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div ref={editorRef} style={{ height: '400px', border: '1px solid #ccc' }} />
    //     <br />
    //     <button type="submit" disabled={isLoading}>
    //       {isLoading ? 'Running Tests...' : 'Run Tests'}
    //     </button>
    //   </form>
    //   <h2>Test Results:</h2>
    //   {results.map((result, index) => (
    //     <div key={index}>
    //       <h3>Test Case {index + 1}</h3>
    //       <p>Input: {result.input}</p>
    //       <p>Expected Output: {result.expectedOutput}</p>
    //       <p>Actual Output: {result.actualOutput}</p>
    //       {result.stderr && <p>Error: {result.stderr}</p>}
    //       {result.compileOutput && <p>Compilation Error: {result.compileOutput}</p>}
    //       <p>Status: {result.status}</p>
    //       <p>Passed: {result.passed ? 'Yes' : 'No'}</p>
    //     </div>
    //   ))}
    // </div>