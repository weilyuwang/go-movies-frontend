import React from "react";
import Ticket from "./../images/movie_tickets.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="text-center">
      <h2>This is the home page</h2>
      <hr />
      <img src={Ticket} alt="movie ticket" />
      {/* <hr />
      <div className="ticket"></div> */}
    </div>
  );
};

export default Home;
