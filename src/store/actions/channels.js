import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const postChannel = channel => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", channel);
      const newAuthor = res.data;
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: newAuthor
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
