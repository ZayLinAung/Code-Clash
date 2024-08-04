"use client";

import React from "react";
import Select from "react-select";
import { customStyles } from "./styles";
import { languageOptions } from "./languageOptions";

const LanguagesChoice = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      styles={customStyles}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesChoice;