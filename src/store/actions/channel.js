import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannelDetail = (channelID, timestamp) => {
  return async dispatch => {
    try {
      const res = await instance.get(
        `channels/${channelID}/?latest=${timestamp}`
      );
      const channel = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNEL_DETAIL,
        payload: channel
      });
    } catch (error) {}
  };
};

export const postMessage = (message, channelID) => {
  message = {
    ...message
  };

  return async dispatch => {
    try {
      await instance.post(`channels/${channelID}/send/`, message);
      // const newMessage = res.data;
      // dispatch({
      //   type: actionTypes.POST_MESSAGE,
      //   payload: newMessage
      // });
    } catch (error) {
      console.error(error);
    }
  };
};
