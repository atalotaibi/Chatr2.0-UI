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
      let query = action.payload.toLowerCase();
      let filter = state.channels.filter(channel => {
        return `${channel.name}`.toLowerCase().includes(query);
      });
      return {
        ...state,

        filteredChannels: filter

      };

    case actionTypes.POST_CHANNEL:
      return {
        ...state,

        channels: state.channels.concat(action.payload),
        filteredChannels: state.channels.concat(action.payload)

      };
    default:
      return state;
  }
};

export default reducer;
