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

  return (
    <>
      <h2>Add/Edit Movie</h2>
      <hr />
      <form method="post">
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="mpaa_rating">
            MPAA Rating
          </label>
          <select
            className="form-select"
            value={movie.mpaa_rating}
            id="mpaa_rating"
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
          >
            {movie.description}
          </textarea>
        </div>

        <hr />

        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
};

export default EditMovie;
