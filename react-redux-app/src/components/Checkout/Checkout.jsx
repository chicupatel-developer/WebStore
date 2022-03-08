import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";

import Customer from "../Customer/Customer";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPaymentStatus } from "../../redux/actions/checkoutActions";
import { PaymentStatusTypes } from "../../redux/constants/paymentStauts-types";

import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/Cancel";

const steps = ["Customer Details", "Shipping Details", "Payement Details"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  // redux
  // read
  const cartTotalAmount = useSelector(
    (state) => state.checkout.cartTotalAmount
  );
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );
  const paymentStatus = useSelector((state) => state.checkout.paymentStatus);

  useEffect(() => {
    console.log("Checkout is loading!!");
    //  if (cartTotalAmount < 1) navigate("/");
    if (myShoppingCart.length < 1) navigate("/");

    dispatch(setPaymentStatus(PaymentStatusTypes.IN_PROGRESS));

    return () => {
      console.log("checkout unmount!");
      dispatch(setPaymentStatus(PaymentStatusTypes.IN_PROGRESS));
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, [paymentStatus]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Form = () =>
    activeStep === 0 ? (
      <Customer changeStep={changeStep} />
    ) : activeStep === 1 ? (
      <Shipping backStep={backStep} changeStep={changeStep} />
    ) : (
      <Payment changeStep={changeStep} backStep={backStep} />
    );

  const changeStep = () => {
    nextStep();
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              {cartTotalAmount ? (
                <span>
                  Checkout [ $ {cartTotalAmount} ]
                  {paymentStatus !== PaymentStatusTypes.IN_PROGRESS && (
                    <span>
                      {/*
                        <CheckCircleRoundedIcon
                            style={{
                            marginBottom: "-10px",
                            fontSize: "40px",
                            color: "green",
                            }}
                        />
                    */}
                      <CheckCircleRoundedIcon className={classes.iconSuccess} />
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  Checkout &nbsp;&nbsp; <CancelIcon />
                </span>
              )}
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
          </Paper>
        </main>
      </Container>
    </div>
  );
};

export default Checkout;
