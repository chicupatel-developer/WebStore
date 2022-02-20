import { ActionTypes } from "../constants/action-types";
const intialState = {
  customerDetails: {},
  shippingDetails: {},
};

export const checkoutReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: payload };
    case ActionTypes.SET_SHIPPING_DETAILS:
      return { ...state, shippingDetails: payload };
    default:
      return state;
  }
};
