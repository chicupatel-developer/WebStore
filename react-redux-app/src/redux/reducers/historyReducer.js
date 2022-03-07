import { ActionTypes } from "../constants/action-types";

const intialState = {
  todayHistoryData: [],
  historyData: true,
};

export const historyReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TODAY_HISTORY_DATA:
      return { ...state, todayHistoryData: payload };
    case ActionTypes.SET_HISTORY_DATA:
      return { ...state, historyData: payload };
    default:
      return state;
  }
};
