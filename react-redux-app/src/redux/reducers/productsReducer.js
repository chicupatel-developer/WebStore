import { ActionTypes } from "../constants/action-types";
const intialState = {
    products: [],
    searchText: '',
    myShoppingCart: []
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SET_SEARCH_TEXT:
      return { ...state, searchText: payload };
    case ActionTypes.SET_MY_SHOPPING_CART:
      return { ...state, myShoppingCart: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};      
    default:
      return state;
  }
};
