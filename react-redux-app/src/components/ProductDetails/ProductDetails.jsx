import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyShoppingCart,
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productsActions";

import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const ProductDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );
  const { productId } = useParams();

  let product = useSelector((state) => state.product);
  // const { image, title, price, category, description } = product;

  const selectedProduct = useSelector(
    (state) => state.allProducts.productForDetails
  );
  const { image, title, price, category, description, discountedPrice } =
    selectedProduct;

  useEffect(() => {
    // if (productId && productId !== "") fetchProductDetail(productId);

    if (selectedProduct && selectedProduct.productId !== "") {
      console.log("selected product for details!", selectedProduct);
    } else navigate("/");

    return () => {
      dispatch(removeSelectedProduct());
    };
    // }, [productId]);
  }, [selectedProduct]);

  /*
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };
  */

  // cart
  const addToCart = (product) => {
    console.log("adding to cart!", product);

    let item = newShoppingCart.find((x) => x.id === product.id);
    console.log(item);
    if (item === undefined) {
      let _newShoppingCart = [...newShoppingCart];
      dispatch(setMyShoppingCart([]));

      console.log("add to cart");
      // item not in cart
      // add
      let cartItem = {
        id: product.id,
        qty: 1,
        image: product.image,
        title: product.title,
        category: product.category,
        price: product.discountedPrice
          ? product.discountedPrice
          : product.price,
      };

      // newShoppingCart.push(cartItem);
      _newShoppingCart.push(cartItem);
      console.log("added to cart!", cartItem);

      // redux
      // write
      // dispatch(setMyShoppingCart(newShoppingCart));
      dispatch(setMyShoppingCart(_newShoppingCart));
    } else {
      console.log("edit to cart");
      // item already in cart
      // edit qty
      var index = newShoppingCart.findIndex((x) => x.id === product.id);
      var qty_ = newShoppingCart[index].qty;
      const newCart = [...newShoppingCart];
      newCart[index] = {
        ...product,
        qty: qty_ + 1,
        price: product.discountedPrice ? product.discountedPrice : product.price,
      };

      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };

  const getSubHeader = (subHeaderString) => {
    return <div className={classes.subHeader}>{subHeaderString}</div>;
  };
  const getTitle = (titleString, priceString) => {
    return (
      <div className={classes.title}>
        {discountedPrice ? (
          <div className={classes.discounterPriceDiv}>
            <div>
              <span className={classes.was}>Was $ </span>
              <span className={classes.erasePrice}>{priceString}</span>
            </div>
            <div>
              <span className={classes.now}>Now $ </span>
              <span className={classes.discountedPrice}>
                <b>{discountedPrice}</b>
              </span>
            </div>
          </div>
        ) : (
          <div className={classes.priceDiv}>
            <span className={classes.price}>$ {priceString}</span>
          </div>
        )}

        {titleString}
      </div>
    );
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <img src={image} className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box className={classes.root}>
              <Card>
                <CardHeader
                  title={getTitle(title, price)}
                  subheader={getSubHeader(category)}
                />
                <CardContent>
                  <div>{description}</div>
                </CardContent>
                <CardActions style={{ float: "right" }}>
                  <Button onClick={() => addToCart(selectedProduct)}>
                    <b>+ Cart</b>
                    <AddShoppingCartIcon
                      style={{ fontSize: 50, color: "green" }}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetails;
