import { ActionTypes } from "../constants/action-types";

export const setCurrentUser = (user) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

