import { ActionTypes } from "../constants/action-types";

export const setCustomerDetails = (customer) => {
  return {
    type: ActionTypes.SET_CUSTOMER_DETAILS,
    payload: customer,
  };
};

export const setShippingDetails = (shipping) => {
  return {
    type: ActionTypes.SET_SHIPPING_DETAILS,
    payload: shipping,
  };
};

export const setCartTotalAmount = (cartAmount) => {
  return {
    type: ActionTypes.SET_CART_TOTAL_AMOUNT,
    payload: cartAmount,
  };
};


export const setPaymentStatus = (pStatus) => {
  return {
    type: ActionTypes.SET_PAYMENT_STATUS,
    payload: pStatus,
  };
};


export const setPaymentDetails = (pDetails) => {
  return {
    type: ActionTypes.SET_PAYMENT_DETAILS,
    payload: pDetails,
  };
};