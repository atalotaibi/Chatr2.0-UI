import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await instance.get("channels/");
      const channels = res.data;
      dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
    }
  };
};

export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query
  };
};

export const postChannel = channel => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", channel);
      const newChannel = res.data;
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
