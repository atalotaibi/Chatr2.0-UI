import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    const decodedUser = jwt_decode(token);
    localStorage.setItem("myToken", token);
    return setCurrentUser(decodedUser);
  } else {
    localStorage.removeItem("myToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const checkForExpiredToken = () => {
  // Get token
  const token = localStorage.getItem("myToken");
  if (token) {
    const currentTime = Date.now() / 1000;
    // Decode token and get user info
    const user = jwt_decode(token);
    // Check token expiration
    if (user.exp >= currentTime) {
      // Set auth token header
      return setAuthToken(token);
    } else {
      return logout();
    }
  }
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("login/", userData);
      let user = response.data;
      dispatch(setAuthToken(user.token));
      history.push("/welcome");
    } catch (errors) {
      console.log("An error occurred.", errors);
    }
  };
};

export const signup = (userData, history) => {
  let user;
  return async dispatch => {
    try {
      let res = await instance.post("signup/", userData);
      user = res.data;
    } catch (error) {
      console.error(error.response.data);
    }
    dispatch(setAuthToken(user.token));
    history.push("/welcome");
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
