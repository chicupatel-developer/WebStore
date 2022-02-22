import React, { useEffect } from "react";
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
} from "../../redux/actions/checkoutActions";
import {
  setMyShoppingCart,
} from "../../redux/actions/productsActions";
import { PaymentStatusTypes } from "../../redux/constants/paymentStauts-types";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({ changeStep, backStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // redux
  // read
  const cartTotalAmount = useSelector(
    (state) => state.checkout.cartTotalAmount
  );

  useEffect(() => {}, []);

  const doPayment = async (event, elements, stripe) => {
    console.log("do payment!");

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
      console.log("success!", paymentMethod);

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

      // dispatch(setPaymentStatus(true));
      dispatch(setPaymentStatus(PaymentStatusTypes.SUCCESS));      
      dispatch(setPaymentDetails(paymentDetails));
      dispatch(setMyShoppingCart([]));
      changeStep();
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
