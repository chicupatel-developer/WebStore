import { ActionTypes } from "../constants/action-types";

const intialState = {
  updateHistory: true,
};

export const historyReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_UPDATE_HISTORY:
      return { ...state, updateHistorty: payload };
    default:
      return state;
  }
};
