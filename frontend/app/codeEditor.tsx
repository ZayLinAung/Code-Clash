'use client';

import React, { useState, FC } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  onChange: (field: string, value: string) => void;
  language?: string;
  code?: string;
  theme?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value);
      onChange("code", value);
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        className="h-[85vh] w-[100%] border-2 border-solid border-black shadow-custom"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;