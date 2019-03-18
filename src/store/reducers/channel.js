import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channel: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_DETAIL:
      return {
        ...state,
        channel: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
