import React, { useState, useEffect } from "react";
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [alertType, setAlertType] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <h2>Login</h2>
      <Alert alertMessage={alertMessage} alertType={alertType} />
      <form className="pt-3" onSubmit={handleSubmit}>
        <Input
          label="Email"
          className={hasError("email") ? "is-invalid" : ""}
          name="email"
          type="email"
          value={email}
          handleChange={handleEmailChange}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMessage={"Please enter a valid email address"}
        />
        <Input
          label="Password"
          className={hasError("password") ? "is-invalid" : ""}
          name="password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMessage={"Please enter a password"}
        />
        <hr />
        <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;
