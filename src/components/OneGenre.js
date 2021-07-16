import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const OneGenre = () => {
  const { id } = useParams();
  const { genreName } = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/v1/movies/${id}`);
      if (response.status !== 200) {
        throw Error("Invalid response code: " + response.status);
      }
      const json = await response.json();
      setMovies(json.movies || []);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadMovies(id);
  }, [id]);

  if (isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <>
          <h2>Genre: {genreName}</h2>
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
  } else {
    return <div>Loading...</div>;
  }
};

export default OneGenre;
