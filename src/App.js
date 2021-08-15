import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
// HashRouter vs BrowserRouter:
// https://stackoverflow.com/questions/51974369/what-is-the-difference-between-hashrouter-and-browserrouter-in-react
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Home from "./components/Home";
import Genres from "./components/Genres";
import OneGenre from "./components/OneGenre";
import Admin from "./components/Admin";
import EditMovie from "./components/EditMovie";
import Login from "./components/Login";
import GraphQL from "./components/GraphQL";
import OneMovieGraphQL from "./components/OneMovieGraphQL";

const App = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const t = window.localStorage.getItem("jwt");
    if (t) {
      if (jwt === "") {
        setJwt(JSON.parse(t));
      }
    }
  }, [jwt]);

  const handleJWTChange = (jwt) => {
    setJwt(jwt);
  };

  const logout = () => {
    setJwt("");
    window.localStorage.removeItem("jwt");
  };

  const loginLink = () => {
    let loginLink;
    if (jwt === "") {
      loginLink = <Link to="/login">Login</Link>;
    } else {
      loginLink = (
        <Link to="/logout" onClick={logout}>
          Logout
        </Link>
      );
    }
    return loginLink;
  };

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>
          <div className="col mt-3 text-end">{loginLink()}</div>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                {jwt !== "" && (
                  <>
                    <li className="list-group-item">
                      <Link to="/admin/movie/0">Add Movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalogue</Link>
                    </li>
                  </>
                )}
                <li className="list-group-item">
                  <Link to="/graphql">GraphQL</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route path="/movies/:id" component={Movie} />
              <Route path="/moviesgraphql/:id" component={OneMovieGraphQL} />
              <Route path="/movies" component={Movies} />
              <Route path="/genres/:id" component={OneGenre} />
              <Route path="/genres" component={Genres} />
              <Route path="/graphql" exact component={GraphQL} />
              <Route
                path="/login"
                exact
                component={(props) => (
                  <Login
                    {...props}
                    handleJWTChange={handleJWTChange}
                    jwt={jwt}
                  />
                )}
              />
              <Route
                path="/admin/movie/:id"
                component={(props) => <EditMovie {...props} jwt={jwt} />}
              />
              <Route
                path="/admin"
                component={(props) => <Admin {...props} jwt={jwt} />}
              />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
