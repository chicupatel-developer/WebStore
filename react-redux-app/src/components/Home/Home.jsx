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

import { useDispatch, useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>
      </Container>
    </div>
  );
};

export default Home;
