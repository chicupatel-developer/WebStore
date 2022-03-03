import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

// stripe
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentStatus,
  setPaymentDetails,
  setProductSoldResponse,
} from "../../redux/actions/checkoutActions";
import { setMyShoppingCart } from "../../redux/actions/productsActions";
import { PaymentStatusTypes } from "../../redux/constants/paymentStauts-types";

import ProductService from "../../services/product.service";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({ changeStep, backStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // redux
  // read
  const cartTotalAmount = useSelector(
    (state) => state.checkout.cartTotalAmount
  );
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {}, []);

  const addProductSold = (data) => {
    ProductService.addProductSold(data)
      .then((response) => {
        console.log(response.data);

        // store product-sold-response from api to redux store
        // and go to next step
        let apiResponse = {
          responseCode: 200,
          responseMessage: "SUCCESS! : " + response.data,
        };
        dispatch(setProductSoldResponse(apiResponse));
        changeStep();
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.responseMessage);
          let apiResponse = {
            responseCode: error.response.status,
            responseMessage: "FAIL ! : " + error.response.data.responseMessage,
          };
          dispatch(setProductSoldResponse(apiResponse));
        } else if (error.response.status === 400) {
          // Model State Invalid
          if (error.response.data !== undefined) {
            // 400 : Bad Request
            if (error.response.data.response !== undefined) {
              let apiResponse = {
                responseCode: error.response.status,
                responseMessage:
                  "FAIL ! : " + error.response.data.response.responseMessage,
              };
              dispatch(setProductSoldResponse(apiResponse));
            }
            // Model State Invalid 
            else {
              let apiResponse = {
                responseCode: error.response.status,
                responseMessage: "FAIL ! : Invalid Model State !",
              };
              dispatch(setProductSoldResponse(apiResponse));
            }
          }
        } else {
          console.log(error);
          let apiResponse = {
            responseCode: 400,
            responseMessage: "FAIL! : Other Error !",
          };
          dispatch(setProductSoldResponse(apiResponse));
        }

        changeStep();
      });
  };

  const doPayment = async (event, elements, stripe) => {
    console.log("do payment !");

    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      // dispatch(setPaymentStatus(false));
      dispatch(setPaymentStatus(PaymentStatusTypes.FAIL));
    } else {
      console.log("success !", paymentMethod);

      // store payment details to redux store
      // and go to next step
      var date = new Date(paymentMethod.created * 1000);
      // console.log(date.toUTCString().toLocaleString());
      /*
      console.log(
        date.toLocaleString("en-US", {
          timeZone: "CST",
        })
      );
      */
      let paymentDetails = {
        cardBrand: paymentMethod.card.brand,
        paymentDateAndTime: date.toLocaleString("en-US", {
          timeZone: "CST",
        }),
        paymentId: paymentMethod.id,
        amountPaid: cartTotalAmount,
      };

      // product-sold db table
      // call to web-api for sending my-shopping-cart info
      console.log(myShoppingCart);
      /*
      (3) [{…}, {…}, {…}]
        0:
        category: "men's clothing"
        id: 1
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        price: 109.95
        qty: 1
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        [[Prototype]]: Object
        1: {id: 2, qty: 1, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', title: 'Mens Casual Premium Slim Fit T-Shirts ', category: "men's clothing", …}
        2: {id: 3, qty: 1, image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', title: 'Mens Cotton Jacket', category: "men's clothing", …}
      */
      let myPurchaseItems = [];
      let currentDate = new Date();
      var CSToffSet = -360; //CST is -6:00 of UTC; i.e. 60*6 = -360 in minutes
      var offset = CSToffSet * 60 * 1000;
      var CSTTime = new Date(currentDate.getTime() + offset);

      myShoppingCart.forEach(function (arrayItem) {
        myPurchaseItems.push({
          productId: arrayItem.id,
          qty: arrayItem.qty,
          price: arrayItem.price,
          soldDate: CSTTime,
          userName: currentUser.userName,
        });
      });
      addProductSold(myPurchaseItems);

      dispatch(setPaymentStatus(PaymentStatusTypes.SUCCESS));
      dispatch(setPaymentDetails(paymentDetails));
      dispatch(setMyShoppingCart([]));
      // changeStep();
    }
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Enter Payment Details
        </Typography>

        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form className={classes.paymentForm}>
                <CardElement />
                <br /> <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={backStep}>
                    Back
                  </Button>
                  <Button
                    onClick={(e) => doPayment(e, elements, stripe)}
                    type="button"
                    variant="contained"
                    color="primary"
                    disabled={!stripe}
                  >
                    Pay: $ {cartTotalAmount}
                  </Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </Container>
    </div>
  );
};

export default Payment;
