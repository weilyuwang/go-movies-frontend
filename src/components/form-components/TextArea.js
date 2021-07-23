import React from "react";

const TextArea = ({ name, label, value, handleChange, rows, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="form-control"
        id={name}
        name={name}
        rows={rows}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
