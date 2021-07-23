import React from "react";
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

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
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
                <li className="list-group-item">
                  <Link to="/admin/movie/0">Add Movie</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route path="/movies/:id" component={Movie} />
              <Route path="/movies" component={Movies} />
              <Route path="/genres/:id" component={OneGenre} />
              <Route path="/genres" component={Genres} />
              <Route path="/admin/movie/:id" component={EditMovie} />
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
