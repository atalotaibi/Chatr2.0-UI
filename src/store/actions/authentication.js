import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  return dispatch => {
    if (token) {
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const decodedUser = jwt_decode(token);
      dispatch(setCurrentUser(decodedUser));
      localStorage.setItem("myToken", token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      dispatch(setCurrentUser());
    }
  };
};

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = userData => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let user = response.data;
      dispatch(setAuthToken(user.token));
    } catch (err) {
      console.log("An error occurred.", err);
    }
  };
};

export const signup = userData => {
  let user;
  return async dispatch => {
    try {
      let res = await instance.post("/signup/", userData);
      user = res.data;
    } catch (error) {
      console.error(err.response.data);
    }
    dispatch(setAuthToken(user.token));
  };
};

export const logout = () => {};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
