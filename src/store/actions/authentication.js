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
    } else {
      delete axios.defaults.headers.common.Authorization;
      dispatch(setCurrentUser());
    }
  };
};

export const checkForExpiredToken = () => {};

export const login = userData => {};

export const signup = userData => {};

export const logout = () => {};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
