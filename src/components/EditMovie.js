import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import Alert from "./ui-components/Alert";
import "./EditMovie.css";

const mpaaOptions = [
  { id: "G", value: "G" },
  { id: "PG", value: "PG" },
  { id: "PG13", value: "PG13" },
  { id: "R", value: "R" },
  { id: "NC17", value: "NC17" },
];

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [alertType, setAlertType] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const loadMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/v1/movie/${id}`);
      if (response.status !== 200) {
        throw Error("Invalid response code: " + response.status);
      }
      const json = await response.json();
      const releaseDate = new Date(json.movie.release_date);
      setMovie({
        ...json.movie,
        release_date: releaseDate.toISOString().split("T")[0],
      });
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (id > 0) {
      loadMovie(id);
    } else {
      setMovie({
        id: 0,
        title: "",
        description: "",
        release_date: "",
        runtime: "",
        rating: "",
        mpaa_rating: "",
      });
      setIsLoaded(true);
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client side validation
    let errors = [];
    if (!movie.title) {
      errors.push("title");
    }
    setErrors(errors);

    if (errors.length > 0) {
      console.log(errors);
      return false;
    }

    const data = new FormData(event.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/v1/admin/editmovie`,
        requestOptions
      );
      if (response.status !== 200) {
        throw Error("Invalid response code: " + response.status);
      }
      const data = await response.json();
      if (data.error) {
        setAlertType("alert-danger");
        setAlertMessage(data.error.message);
      } else {
        setAlertType("alert-success");
        setAlertMessage("Changes saved!");
      }
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  if (isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="container">
          <h2>Add/Edit Movie</h2>
          <Alert alertType={alertType} alertMessage={alertMessage} />
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={movie.id}
              onChange={handleChange}
            />

            <Input
              label="Title"
              className={hasError("title") ? "is-invalid" : ""}
              name="title"
              type="text"
              value={movie.title}
              handleChange={handleChange}
              errorDiv={hasError("title") ? "text-danger" : "d-none"}
              errorMessage={"Please enter a title"}
            />

            <Input
              label="Release Date"
              name="release_date"
              type="date"
              value={movie.release_date}
              handleChange={handleChange}
              placeholder="yyyy-mm-dd"
            />

            <Input
              label="Runtime"
              name="runtime"
              type="text"
              value={movie.runtime}
              handleChange={handleChange}
            />

            <Select
              name="mpaa_rating"
              label="MPAA Rating"
              value={movie.mpaa_rating}
              handleChange={handleChange}
              options={mpaaOptions}
              placeholder="Choose..."
            />

            <Input
              label="Rating"
              name="rating"
              type="text"
              value={movie.rating}
              handleChange={handleChange}
            />

            <TextArea
              label="Description"
              name="description"
              value={movie.description}
              rows="3"
              handleChange={handleChange}
            />

            <hr />

            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default EditMovie;
