import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OneMovieGraphQL = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadMovie = async (id) => {
    const payload = `
    {
      movie(id: ${id}) {
        id
        title
        runtime
        year
        description
        release_date
        rating
        mpaa_rating
        poster
      }
    }
    `;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/v1/graphql`,
        requestOptions
      );
      const json = await response.json();
      const movie = json.data.movie;
      setMovie(movie);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadMovie(id);
  }, [id]);

  if (isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      if (movie.genres) {
        movie.genres = Object.values(movie.genres);
      } else {
        movie.genres = [];
      }
      return (
        <>
          <h2>Movie: {movie.title}</h2>

          {movie.poster !== "" && (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                alt="poster"
              />
            </div>
          )}

          <div className="float-start">
            <small>Rating: {movie.mpaa_rating}</small>
          </div>
          <div className="float-end">
            {movie.genres.map((genre, index) => (
              <span className="badge bg-secondary me-1" key={index}>
                {genre}
              </span>
            ))}
          </div>
          <div className="clearfix"></div>
          <hr />
          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>{movie.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Description:</strong>
                </td>
                <td>{movie.description}</td>
              </tr>
              <tr>
                <td>
                  <strong>Runtime:</strong>
                </td>
                <td>{movie.runtime} minutes</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default OneMovieGraphQL;
