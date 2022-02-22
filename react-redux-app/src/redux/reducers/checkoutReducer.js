import { ActionTypes } from "../constants/action-types";
import { PaymentStatusTypes } from '../constants/paymentStauts-types';

const intialState = {
  customerDetails: {},
  shippingDetails: {},
  cartTotalAmount: 0,
  // paymentStatus: false,
  paymentDetails: {},
  paymentStatus: PaymentStatusTypes.IN_PROGRESS,
};

export const checkoutReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: payload };
    case ActionTypes.SET_SHIPPING_DETAILS:
      return { ...state, shippingDetails: payload };
    case ActionTypes.SET_CART_TOTAL_AMOUNT:
      return { ...state, cartTotalAmount: payload };
    case ActionTypes.SET_PAYMENT_STATUS:
      return { ...state, paymentStatus: payload };
    case ActionTypes.SET_PAYMENT_DETAILS:
      return { ...state, paymentDetails: payload };
    default:
      return state;
  }
};
