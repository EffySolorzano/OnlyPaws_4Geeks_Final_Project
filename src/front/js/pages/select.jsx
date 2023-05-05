import React from "react";

const Select = ({ options, value, onChange, placeholder }) => {
  return (
    <select defaultValue={value} onChange={onChange}>
      <option value=" ">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
