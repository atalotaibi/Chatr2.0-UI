import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channel: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_DETAIL:
      return {
        ...state,
        channel: state.channel.concat(action.payload)
      };

    case actionTypes.POST_MESSAGE:
      return {
        ...state,
        channel: {
          ...state.channel,
          messages: state.channel.messages.concat(action.payload)
        }
      };

    default:
      return state;
  }
};

export default reducer;
