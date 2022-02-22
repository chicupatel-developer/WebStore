import { ActionTypes } from "../constants/action-types";
const intialState = {
  customerDetails: {},
  shippingDetails: {},
  cartTotalAmount: 0,
};

export const checkoutReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: payload };
    case ActionTypes.SET_SHIPPING_DETAILS:
      return { ...state, shippingDetails: payload };
    case ActionTypes.SET_CART_TOTAL_AMOUNT:
      return { ...state, cartTotalAmount: payload };
    default:
      return state;
  }
};
