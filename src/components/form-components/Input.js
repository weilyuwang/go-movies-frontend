import React from "react";

const Input = ({
  name,
  label,
  type,
  value,
  handleChange,
  placeholder,
  className,
  errorDiv,
  errorMessage,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div className={errorDiv}>{errorMessage}</div>
    </div>
  );
};

export default Input;
