import { ActionTypes } from "../constants/action-types";

export const setMyShoppingCart = (myCart) => {
  return {
    type: ActionTypes.SET_MY_SHOPPING_CART,
    payload: myCart,
  };
};

export const setSearchText = (searchText) => {
    return {
      type: ActionTypes.SET_SEARCH_TEXT,
      payload: searchText,
    };
};

export const setProductForDetails = (product) => {
  return {
    type: ActionTypes.SET_PRODUCT_FOR_DETAILS,
    payload: product,
  };
};

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setDiscountData = (discountedProducts_) => {
  return {
    type: ActionTypes.SET_DISCOUNT_DATA,
    payload: discountedProducts_,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
