import { ActionTypes } from "../constants/action-types";

export const setTodayHistoryData = (todayData) => {
  return {
    type: ActionTypes.SET_TODAY_HISTORY_DATA,
    payload: todayData,
  };
};

export const setWeekHistoryData = (weekData) => {
  return {
    type: ActionTypes.SET_WEEK_HISTORY_DATA,
    payload: weekData,
  };
};

export const setMonthHistoryData = (monthData) => {
  return {
    type: ActionTypes.SET_MONTH_HISTORY_DATA,
    payload: monthData,
  };
};

// CALL_API_FOR_TODAY_DATA
export const callApiForTodayData = (flag) => {
  return {
    type: ActionTypes.CALL_API_FOR_TODAY_DATA,
    payload: flag,
  };
};

// CALL_API_FOR_WEEKLY_DATA
export const callApiForWeeklyData = (flag) => {
  return {
    type: ActionTypes.CALL_API_FOR_WEEKLY_DATA,
    payload: flag,
  };
};

// CALL_API_FOR_MONTHLY_DATA
export const callApiForMonthlyData = (flag) => {
  return {
    type: ActionTypes.CALL_API_FOR_MONTHLY_DATA,
    payload: flag,
  };
};
