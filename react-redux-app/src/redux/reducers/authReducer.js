import { ActionTypes } from "../constants/action-types";
import { RegisterStatusTypes } from "../constants/registerStatus-types";

const intialState = {
  currentUser: {},
  registerStatus: RegisterStatusTypes.IN_PROGRESS,
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case ActionTypes.SET_REGISTER_STATUS:
      return { ...state, registerStatus: payload };
    default:
      return state;
  }
};
