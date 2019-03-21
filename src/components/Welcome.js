import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO A&A chatting website</h1>
          <h3 className="mb-5">
            <em>Enjoy</em>
          </h3>
          {/* <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link> */}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

export default Welcome;
