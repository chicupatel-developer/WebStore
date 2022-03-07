import { ActionTypes } from "../constants/action-types";

const intialState = {
  todayHistoryData: [],
  weekHistoryData: [],
  monthHistoryData: [],
  callApiForTodayData: true,
  callApiForWeeklyData: true,
  callApiForMonthlyData: true,
};

export const historyReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TODAY_HISTORY_DATA:
      return { ...state, todayHistoryData: payload };
    case ActionTypes.SET_WEEK_HISTORY_DATA:
      return { ...state, weekHistoryData: payload };
    case ActionTypes.SET_MONTH_HISTORY_DATA:
      return { ...state, monthHistoryData: payload };
    case ActionTypes.CALL_API_FOR_TODAY_DATA:
      return { ...state, callApiForTodayData: payload };
    case ActionTypes.CALL_API_FOR_WEEKLY_DATA:
      return { ...state, callApiForWeeklyData: payload };
    case ActionTypes.CALL_API_FOR_MONTHLY_DATA:
      return { ...state, callApiForMonthlyData: payload };
    default:
      return state;
  }
};
