import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  filteredChannels: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        filteredChannels: action.payload
      };

    case actionTypes.FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`.toLowerCase().includes(action.payload);
        })
      };
    default:
      return state;
  }
};

export default reducer;
