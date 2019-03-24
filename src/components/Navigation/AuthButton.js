import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

class AuthButton extends Component {
  render() {
    const user = this.props.user;
    let buttons = [
      <li key="loginButton" className="nav-item">
        <Link to="/login" className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      </li>,
      <li key="signupButton" className="nav-item">
        <Link to="/signup" className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} /> Signup
        </Link>
      </li>
    ];

    if (user) {
      buttons = [
        <li className="nav-item">
          <span className="navbar-text">{user.username}</span>
        </li>,
        <li className="nav-item">
          <span className="nav-link" onClick={() => this.props.logout()}>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </span>
        </li>
      ];
    }

    return <ul className="navbar-nav ml-auto">{buttons}</ul>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
