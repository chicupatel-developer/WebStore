import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyShoppingCart } from "../../redux/actions/productsActions";
import { setCartTotalAmount } from "../../redux/actions/checkoutActions";

import useStyles from "./styles";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

const ShoppingCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux
  // read
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );

  useEffect(() => {
    console.log("cart : ", myShoppingCart);
  }, []);

  const onMinus = (e, id, product) => {
    let item = myShoppingCart.find((x) => x.id === id);
    if (item !== undefined) {
      var index = myShoppingCart.findIndex((x) => x.id === id);
      var qty_ = myShoppingCart[index].qty;
      let newCart = [...myShoppingCart];
      if (qty_ > 1) {
        // - qty of item from cart
        newCart[index] = { ...product, qty: qty_ - 1 };
      } else {
        // remove item from cart
        newCart = newCart.filter((t) => t.id !== id);
      }
      // redux
      // write
      if (newCart.length < 1) dispatch(setMyShoppingCart([]));
      else dispatch(setMyShoppingCart(newCart));
    }
  };
  const onPlus = (e, id, product) => {
    let item = myShoppingCart.find((x) => x.id === id);
    if (item !== undefined) {
      var index = myShoppingCart.findIndex((x) => x.id === id);
      var qty_ = myShoppingCart[index].qty;
      let newCart = [...myShoppingCart];
      newCart[index] = { ...product, qty: qty_ + 1 };
      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };

  const getCartTotal = () => {
    let cartTotal = 0.0;
    myShoppingCart.map((item) => {
      cartTotal = cartTotal + item.qty * item.price;
    });
    var paymentAmount = cartTotal.toFixed(2);
    var paymentAmountRounded = (
      Math.ceil(paymentAmount * 20 - 0.5) / 20
    ).toFixed(2);

    // save total cart amount @ redux store
    dispatch(setCartTotalAmount(paymentAmountRounded));

    // return cartTotal + '  [$ ' + paymentAmountRounded + ']';
    return "Cart Total : $ " + paymentAmountRounded;
  };

  const onPayment = () => {
    console.log("payment!");
    navigate("/checkout");
  };

  const onEmptyCart = () => {
    dispatch(setMyShoppingCart([]));
    navigate("/");
  };

  const renderCart =
    myShoppingCart.length > 0 ? (
      myShoppingCart.map((product) => {
        const { id, title, category, price, image, qty } = product;

        return (
          <div className={classes.cartItemsDiv} key={id}>
            <Grid container>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <div className={classes.actionDiv}>
                  <span>
                    <span
                      onClick={(e) => onMinus(e, id, product)}
                      className={classes.minusBtn}
                    >
                      <span>
                        <IndeterminateCheckBoxRoundedIcon
                          style={{ fontSize: 40 }}
                        />
                      </span>
                    </span>
                  </span>
                  <span>&nbsp;{qty}&nbsp;&nbsp;</span>
                  <span>
                    <span
                      onClick={(e) => onPlus(e, id, product)}
                      className={classes.plusBtn}
                    >
                      <span>
                        <AddBoxRoundedIcon style={{ fontSize: 40 }} />
                      </span>
                    </span>
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={1} md={1} lg={1}>
                <img src={image} className={classes.img} />
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8}>
                {title}
                <br />
                Item-Price:- $ {price}
                <br />
                <span className={classes.itemTotal}>
                  Item-Total:- $ {(qty * price).toFixed(2)}
                </span>
              </Grid>
            </Grid>
            <div>
              <Divider orientation="horizontal" />
            </div>
          </div>
        );
      })
    ) : (
      <div className="ui div empty">
        <h3>Cart is Empty!</h3>
      </div>
    );
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h2>Shopping Cart</h2>

        <div className={classes.actions}>
          <div>
            {myShoppingCart.length > 0 && (
              <span>
                <span className={classes.cartTotalAmount}>
                  {getCartTotal()}
                </span>
                &nbsp;&nbsp;
                <Button
                  color="primary"
                  onClick={(e) => onPayment(e)}
                  className={classes.actionButtonPayment}
                >
                  <span className={classes.cartTotal}>
                    <span>Check out&nbsp;&nbsp;</span>
                    <CreditCardIcon style={{ fontSize: 30 }} />
                  </span>
                </Button>
              </span>
            )}
          </div>

          <div>
            {myShoppingCart.length > 0 && (
              <Button
                color="primary"
                onClick={(e) => onEmptyCart(e)}
                className={classes.actionButtonEmptyCart}
              >
                <span className={classes.cartTotal}>
                  <span>Empty Cart&nbsp;&nbsp;</span>
                  <RemoveShoppingCartIcon style={{ fontSize: 20 }} />
                </span>
              </Button>
            )}
          </div>
        </div>

        <p></p>
        <div>{renderCart}</div>
      </Container>
    </div>
  );
};

export default ShoppingCart;
