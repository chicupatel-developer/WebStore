import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyShoppingCart,
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productsActions";

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

const ProductComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux
  // read
  const newShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );

  const products = useSelector((state) => state.allProducts.products);
  const searchText = useSelector((state) => state.allProducts.searchText);
  let filterProducts = [];
  if (searchText !== "") {
    filterProducts = products.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filterProducts = products;
  }

  const onClick = (e, product) => {
    let item = newShoppingCart.find((x) => x.id === product.id);
    console.log(item);
    if (item === undefined) {
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
      newShoppingCart.push(cartItem);

      // redux
      // write
      dispatch(setMyShoppingCart(newShoppingCart));
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

  const renderList =
    filterProducts.length > 0 ? (
      filterProducts.map((product) => {
        const { id, title, image, price, category } = product;
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
                  <div className={classes.price}>$ {price}</div>
                  <div className={classes.category}>[ {category} ]</div>
                </CardContent>
                <CardActions disableSpacing>
                  <Button onClick={(e) => onClick(e, product)}>+ Cart</Button>
                  <Button
                    className={classes.detailsBtn}
                    onClick={(e) => onDetailsClick(e, product)}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        );
      })
    ) : (
      <div className="ui div empty">
        <h3>Products Not Found!</h3>
      </div>
    );

  return (
    <>
      <Grid container spacing={1} >
        {renderList}
      </Grid>
    </>
  );
};

export default ProductComponent;
