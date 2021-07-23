import React from "react";

const Input = ({ name, label, type, value, handleChange, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
