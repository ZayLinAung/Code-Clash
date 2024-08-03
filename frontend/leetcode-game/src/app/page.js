"use client";
import Image from "next/image";

import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import LanguagesChoice from "./languageChoice";
import CodeEditor from "./codeEditor";
import ThemeChoice from "./themeChoice";
import { defineTheme } from "./defineTheme";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
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

          <CodeEditor className
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
