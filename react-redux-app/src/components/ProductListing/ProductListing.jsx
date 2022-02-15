import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import ProductComponent from "../ProductComponent/ProductComponent";

import useStyles from "./styles";
import Container from "@material-ui/core/Container";


const ProductListing = () => {
   const classes = useStyles();

  
  const products = useSelector((state) => state.allProducts.products);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
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
