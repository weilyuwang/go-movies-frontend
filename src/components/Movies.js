import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadMovies = () => {
    fetch("http://localhost:4000/v1/movies")
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.movies);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return isLoaded ? (
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
  ) : (
    <p>Loading...</p>
  );
};

export default Movies;
