import React, { useState, useEffect } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log("useEffect() gets called to fetch movies");
    setMovies([
      { id: 1, title: "The Shawshank Redemption", runtime: 142 },
      { id: 2, title: "The Godfather", runtime: 175 },
      { id: 3, title: "The Dark Knight", runtime: 153 },
    ]);
  }, []);

  return (
    <>
      <h2>Choose a movie</h2>
      <ul>
        {movies.map((m) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
