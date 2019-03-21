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

    // case actionTypes.POST_MESSAGE:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     channel: {
    //       ...state.channel,
    //       messages: state.channel.messages.concat(action.payload)
    //     }
    //   };

    case actionTypes.RESET_CHANNEL:
      return {
        ...state,
        channel: []
      };

    default:
      return state;
  }
};

export default reducer;
