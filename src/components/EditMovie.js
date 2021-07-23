import React, { useState, useEffect } from "react";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import "./EditMovie.css";

const defaultMpaaOptions = [
  { id: "G", value: "G" },
  { id: "PG", value: "PG" },
  { id: "PG13", value: "PG13" },
  { id: "R", value: "R" },
  { id: "NC17", value: "NC17" },
];

const EditMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [mpaaOptions, setMpaaOptions] = useState(defaultMpaaOptions);

  // const loadMovie = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/v1/movie/${id}`);
  //     if (response.status !== 200) {
  //       throw Error("Invalid response code: " + response.status);
  //     }
  //     const data = await response.json();
  //     setMovie(data.movie);
  //     setIsLoaded(true);
  //   } catch (err) {
  //     setError(err);
  //     setIsLoaded(true);
  //   }
  // };

  useEffect(() => {
    setMovie({});
  }, []);

  const handleSubmit = (event) => {
    console.log("Form was submitted");
    event.preventDefault();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Add/Edit Movie</h2>
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
          name="title"
          type="text"
          value={movie.title}
          handleChange={handleChange}
        />

        <Input
          label="Release Date"
          name="release_date"
          type="text"
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

      <div className="mt-3">
        <pre>{JSON.stringify({ movie, isLoaded, error }, null, 3)}</pre>
      </div>
    </div>
  );
};

export default EditMovie;
