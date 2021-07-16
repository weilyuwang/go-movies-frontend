import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadGenres = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/genres");
      if (response.status !== 200) {
        throw Error("Invalid response code: " + response.status);
      }
      const json = await response.json();
      setGenres(json.genres);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  if (isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <>
          <h2>Genres</h2>
          <div className="list-group">
            {genres.map((g) => (
              <Link
                key={g.id}
                to={{
                  pathname: `/genres/${g.id}`,
                  genreName: g.genre_name,
                }}
                className="list-group-item list-group-item-action"
              >
                {g.genre_name}
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

export default Genres;
