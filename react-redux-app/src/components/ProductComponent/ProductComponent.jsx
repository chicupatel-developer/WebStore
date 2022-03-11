import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProductForDiscount } from "../../redux/actions/adminActions";
import { setMyShoppingCart } from "../../redux/actions/productsActions";

import useStyles from "./styles";

import {
  CardMedia,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import StarsIcon from "@material-ui/icons/Stars";

const ProductComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux
  // read
  const currentUser = useSelector((state) => state.auth.currentUser);
  const newShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );

  const products = useSelector((state) => state.allProducts.products);
  const discountedProducts = useSelector(
    (state) => state.allProducts.discountedProducts
  );

  const searchText = useSelector((state) => state.allProducts.searchText);
  let filterProducts = [];
  if (searchText !== "") {
    filterProducts = products.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );

    filterProducts.forEach(function (p) {
      discountedProducts.forEach(function (dp) {
        if (p.id === dp.productId) {
          p.discountedPrice = dp.discountedPrice;
        }
      });
    });
  } else {
    filterProducts = products;

    filterProducts.forEach(function (p) {
      discountedProducts.forEach(function (dp) {
        if (p.id === dp.productId) {
          p.discountedPrice = dp.discountedPrice;
        }
      });
    });
  }

  useEffect(() => {}, []);

  const onClick = (e, product) => {
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
        price: product.price,
      };
      // newShoppingCart.push(cartItem);
      _newShoppingCart.push(cartItem);

      // redux
      // write
      // dispatch(setMyShoppingCart(newShoppingCart));
      dispatch(setMyShoppingCart(_newShoppingCart));
    } else {
      // item already in cart
      // edit qty
      var index = newShoppingCart.findIndex((x) => x.id === product.id);
      var qty_ = newShoppingCart[index].qty;
      const newCart = [...newShoppingCart];
      newCart[index] = { ...product, qty: qty_ + 1 };

      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };
  const onDetailsClick = (e, product) => {
    navigate(`/product/${product.id}`);
  };

  // admin
  // set product-discount
  const onProductDiscount = (e, product) => {
    // console.log("Product-discount", product);

    // set product for discount @ redux store
    let discountOnProduct = {
      productId: product.id,
      price: product.price,
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
    };
    dispatch(setProductForDiscount(discountOnProduct));
    navigate(`/adminProductDiscount`);
  };

  const renderList =
    filterProducts.length > 0 ? (
      filterProducts.map((product) => {
        const { id, title, image, price, category, discountedPrice } = product;
        return (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <Paper className={classes.paper}>
              <Card>
                <CardMedia image={image} style={{ height: 350 }} />
                <CardContent>
                  <div className={classes.title}>
                    {title.length < 32 ? (
                      <span>{title}</span>
                    ) : (
                      <span>{title.substring(0, 32)}...</span>
                    )}
                  </div>
                  <div className={classes.category}>[ {category} ]</div>

                  {discountedPrice ? (
                    <div className={classes.discounterPriceDiv}>
                      <div>
                        <span className={classes.was}>Was $ </span>
                        <span className={classes.erasePrice}>{price}</span>
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
                      <span className={classes.price}>$ {price}</span>
                    </div>
                  )}
                </CardContent>
                <CardActions className={classes.actions}>
                  {currentUser.role === "Shopper" && (
                    <Button onClick={(e) => onClick(e, product)}>
                      <b>+ Cart</b>
                    </Button>
                  )}
                  {currentUser.role === "Admin" && (
                    <Button onClick={(e) => onProductDiscount(e, product)}>
                      <b>Set Discount</b>
                    </Button>
                  )}
                  {currentUser.role === "Shopper" && (
                    <Button onClick={(e) => onDetailsClick(e, product)}>
                      <b>Details</b>
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        );
      })
    ) : (
      <div className={classes.noProduct}>
        <h3>Products Not Found!</h3>
      </div>
    );

  return (
    <>
      <Grid container spacing={1}>
        {renderList}
      </Grid>
    </>
  );
};

export default ProductComponent;
