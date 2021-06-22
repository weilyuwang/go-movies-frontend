import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie({ id, title: "some movie", runtime: 160 });
  }, [id]);

  return (
    <>
      <h2>Movie: {movie.title}</h2>
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
              <strong>ID:</strong>
            </td>
            <td>{movie.id}</td>
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
};

export default Movie;
