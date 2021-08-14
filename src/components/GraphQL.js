import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import Alert from "./ui-components/Alert";
import "./EditMovie.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [alertType, setAlertType] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const loadMovie = async (id) => {
    const payload = `
    {
      list {
        id
        title
        runtime
        year
        description
      }
    }
    `;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/v1/graphql/list`,
        requestOptions
      );
      const data = await response.json();
      const movies = data.data.list;
      setMovies(movies);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadMovie();
  }, []);

  // useEffect(() => {
  //   if (jwt === "") {
  //     // redirect to login page if user is not logged in
  //     history.push("/login");
  //     return;
  //   }
  //   if (id > 0) {
  //     loadMovie(id);
  //   } else {
  //     setMovie({
  //       id: 0,
  //       title: "",
  //       description: "",
  //       release_date: "",
  //       runtime: "",
  //       rating: "",
  //       mpaa_rating: "",
  //     });
  //     setIsLoaded(true);
  //   }
  // }, [history, id, jwt]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Client side validation
  //   let errors = [];
  //   if (!movie.title) {
  //     errors.push("title");
  //   }
  //   setErrors(errors);

  //   if (errors.length > 0) {
  //     return false;
  //   }

  //   const data = new FormData(event.target);
  //   const payload = Object.fromEntries(data.entries());
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${jwt}`);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: JSON.stringify(payload),
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/v1/admin/editmovie`,
  //       requestOptions
  //     );
  //     const data = await response.json();
  //     if (data.error) {
  //       setAlertType("alert-danger");
  //       setAlertMessage(data.error.message);
  //     } else {
  //       history.push({ pathname: "/admin" });
  //     }
  //   } catch (err) {
  //     setError(err);
  //   }
  // };
  return (
    <>
      <h2>GraphQL</h2>
      <hr />
      <div className="list-group">
        {movies.map((m) => (
          <a
            key={m.id}
            className="list-group-item list-group-item-action"
            href="#!"
          >
            <strong>{m.title}</strong>
            <br />
            <small className="text-muted">
              ({m.year} - {m.runtime} minutes)
            </small>
            <br />
            {m.description.slice(0, 100)}...
          </a>
        ))}
      </div>
    </>
  );
};

export default GraphQL;
