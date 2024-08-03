"use client";
import Image from "next/image";

import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import LanguagesChoice from "./languageChoice";
import CodeEditor from "./codeEditor";
import ThemeChoice from "./themeChoice";
import { defineTheme } from "./defineTheme";

const javascriptDefault = `// Start writing your code here
`;

export default function Home() {
  const [code, setCode] = useState(javascriptDefault);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState(LanguagesChoice[0]);
  const [theme, setTheme] = useState("cobalt");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const onSelectChange = (lan) => {
    setLanguage(lan);
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  return (
    <div className="flex p-[20px]">
      <div className="flex-1">
        <div className = "flex flex-col gap-[20px]">
          <div className="flex flex-row gap-[20px]">
            <LanguagesChoice onSelectChange={onSelectChange} />
            <ThemeChoice handleThemeChange={handleThemeChange} theme={theme} />
          </div>

          <CodeEditor
            code = {code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          ></CodeEditor>
        </div>
      </div>
      <div className="flex-1">Problem</div>
    </div>
  );
}
