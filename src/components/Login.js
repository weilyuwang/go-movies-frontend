import React, { useState, useEffect } from "react";
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Login = ({ handleJWTChange, history, jwt }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [alertType, setAlertType] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (jwt !== "") {
      history.push("/admin");
      return;
    }
  }, [history, jwt]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errs = [];
    if (email === "") {
      errs.push("email");
    }
    if (password === "") {
      errs.push("password");
    }
    setErrors(errs);
    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/v1/signin`,
        requestOptions
      );

      const data = await response.json();
      if (data.error) {
        console.log(data.error.message);
        setAlertType("alert-danger");
        setAlertMessage(data.error.message);
      } else {
        handleJWTChange(data.response);
        // save JWT to local storage
        window.localStorage.setItem("jwt", JSON.stringify(data.response));
        history.push({ pathname: "/admin" });
      }
    } catch (err) {
      setError(err);
    }
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return error ? (
    <div>Error: {error.message}</div>
  ) : (
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
