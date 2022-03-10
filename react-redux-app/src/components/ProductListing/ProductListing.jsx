import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setDiscountData } from "../../redux/actions/productsActions";
import ProductComponent from "../ProductComponent/ProductComponent";

import useStyles from "./styles";
import Container from "@material-ui/core/Container";

import ShopperService from "../../services/product-shopper.service";

const ProductListing = () => {
  const classes = useStyles();

  const products = useSelector((state) => state.allProducts.products);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  const getProductDiscountData = () => {
    ShopperService.getProductDiscountData(currentUser.userName)
      .then((response) => {
        dispatch(setDiscountData(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    getProductDiscountData();
  }, []);

  console.log("Products :", products);
  return (
    <div className={classes.main}>
      <Container maxWidth="lg">
        <ProductComponent />
      </Container>
    </div>
  );
};

export default ProductListing;
