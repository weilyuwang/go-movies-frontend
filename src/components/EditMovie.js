import React, { useState, useEffect } from "react";
import "./EditMovie.css";

const EditMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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
    setMovie({
      title: "The Godfather",
      mpaa_rating: "R",
    });
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
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="release_date">
            Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movie.release_date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="runtime">
            Runtime
          </label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            name="runtime"
            value={movie.runtime}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="mpaa_rating">
            MPAA Rating
          </label>
          <select
            className="form-select"
            value={movie.mpaa_rating}
            name="mpaa_rating"
            id="mpaa_rating"
            onChange={handleChange}
          >
            <option className="form-select" value="G">
              G
            </option>
            <option className="form-select" value="PG">
              PG
            </option>
            <option className="form-select" value="PG14">
              PG14
            </option>
            <option className="form-select" value="NC17">
              NC17
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="rating">
            Rating
          </label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
            value={movie.description}
          />
        </div>

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
