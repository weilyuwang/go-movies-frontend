import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./form-components/Input";
import "./EditMovie.css";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMovies = async () => {
    const payload = `
    {
      list {
        id
        title
        runtime
        year
        description
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
        `http://localhost:4000/v1/graphql`,
        requestOptions
      );
      const data = await response.json();
      const movies = data.data.list;
      setMovies(movies);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    performSearch();
  };

  const performSearch = async () => {
    const payload = `
    {
      search(titleContains: "${searchTerm}") {
        id
        title
        runtime
        year
        description
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
        `http://localhost:4000/v1/graphql`,
        requestOptions
      );
      const data = await response.json();
      const movies = data.data.search;
      setMovies(movies);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h2>GraphQL</h2>
        <hr />

        <Input
          title={"Search"}
          type={"text"}
          name={"search"}
          value={searchTerm}
          handleChange={handleSearchTermChange}
        />

        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/moviesgraphql/${m.id}`}
            >
              <strong>{m.title}</strong>
              <br />
              <small className="text-muted">
                ({m.year} - {m.runtime} minutes)
              </small>
              <br />
              {m.description.slice(0, 100)}...
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default GraphQL;
