import React from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();

  return (
    <>
      <h2>Movie {id}</h2>
    </>
  );
};

export default Movie;
