import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannelDetail = channelID => {
  return async dispatch => {
    try {
      const res = await instance.get(`channels/${channelID}/`);
      const channel = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNEL_DETAIL,
        payload: channel
      });
    } catch (err) {}
  };
};
