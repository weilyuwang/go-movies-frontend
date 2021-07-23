import React from "react";

const Select = ({ name, label, value, handleChange, options, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        className="form-select"
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
      >
        <option className="form-select" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            className="form-select"
            key={option.id}
            value={option.id}
            label={option.value}
          >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
