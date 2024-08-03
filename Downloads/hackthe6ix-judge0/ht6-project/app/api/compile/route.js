import { NextResponse } from 'next/server';
import axios from 'axios';

const testCases = [
  { input: '5 3 5', expectedOutput: '13' },
  { input: '10 7 5', expectedOutput: '22' }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function pollSubmission(token) {
  const maxAttempts = 10;
  const pollInterval = 1000; // 1 second

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
      headers: {
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '66788250b4msh564b038cc76e07cp153b4ajsna4898cab423a'
      }
    });

    if (response.data.status.id > 2) { // Not in queue or processing
      return response.data;
    }

    await delay(pollInterval);
  }

  throw new Error('Polling timed out');
}

export async function POST(req) {
  const { source_code, language_id } = await req.json();

  try {
    const results = await Promise.all(testCases.map(async (testCase) => {
      const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true', {
        source_code: Buffer.from(source_code.trim()).toString('base64'),
        language_id,
        stdin: Buffer.from(testCase.input).toString('base64')
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '66788250b4msh564b038cc76e07cp153b4ajsna4898cab423a'
        }
      });

      const { token } = response.data;
      
      const result = await pollSubmission(token);

      const actualOutput = result.stdout ? Buffer.from(result.stdout, 'base64').toString().trim() : '';
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString().trim() : '';
      const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString().trim() : '';

      console.log('Compilation output:', compileOutput);
      console.log('Stderr:', stderr);

      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: actualOutput,
        stderr: stderr,
        compileOutput: compileOutput,
        passed: actualOutput === testCase.expectedOutput,
        status: result.status ? result.status.description : 'Unknown'
      };
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in /api/compile:', error);
    return NextResponse.json([{ 
      input: '', 
      expectedOutput: '', 
      actualOutput: '', 
      stderr: '',
      compileOutput: '',  // Add this line
      passed: false, 
      status: 'Error',
      error: 'An error occurred while compiling the code' 
    }], { status: 500 });
  }
}