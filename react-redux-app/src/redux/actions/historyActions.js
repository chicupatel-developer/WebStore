import { ActionTypes } from "../constants/action-types";

export const setTodayHistoryData = (flag) => {
  return {
    type: ActionTypes.SET_TODAY_HISTORY_DATA,
    payload: flag,
  };
};

export const setHistoryData = (flag) => {
  return {
    type: ActionTypes.SET_HISTORY_DATA,
    payload: flag,
  };
};

