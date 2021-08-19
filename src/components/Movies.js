import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/v1/movies`
      );
      if (response.status !== 200) {
        throw Error("Invalid response code: " + response.status);
      }
      const data = await response.json();
      setMovies(data.movies);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h2>Choose A Movie</h2>
        <hr />
        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              to={`/movies/${m.id}`}
              className="list-group-item list-group-item-action"
            >
              {m.title}
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Movies;
