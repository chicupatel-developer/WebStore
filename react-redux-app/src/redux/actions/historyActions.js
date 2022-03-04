import { ActionTypes } from "../constants/action-types";

export const setUpdateHistory = (flag) => {
  return {
    type: ActionTypes.SET_UPDATE_HISTORY,
    payload: flag,
  };
};

