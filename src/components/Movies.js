import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/movies");
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

  if (isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <>
          <h2>Choose a movie</h2>
          <ul>
            {movies.map((m) => (
              <li key={m.id}>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default Movies;
