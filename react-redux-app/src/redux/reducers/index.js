import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { checkoutReducer } from "./checkoutReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  checkout: checkoutReducer,
});
export default reducers;
