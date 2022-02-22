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

const steps = ["Customer Details", "Shipping Details", "Payement Details"];

const Checkout = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  // redux
  // read
  const cartTotalAmount = useSelector(
    (state) => state.checkout.cartTotalAmount
  );

  useEffect(() => {
      console.log("Checkout is loading!!");
      if (cartTotalAmount < 1)
          navigate('/');

    return () => {
      console.log("checkout unmount!");
    };
  }, []);

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
                          {cartTotalAmount ? <span>Checkout [ $ {cartTotalAmount} ] </span> : <span>Checkout</span>}
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
