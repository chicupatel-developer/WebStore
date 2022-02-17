import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";

import useStyles from "./styles";
import { Container, Typography, Button, Divider } from "@material-ui/core";

// stripe
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Home = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  const signin = () => {
    console.log("signin");

    var userUser = {
      userName: "user-user",
      role: "user-role",
      token: "user-token",
    };
    var adminUser = {
      userName: "admin-user",
      role: "admin-role",
      token: "admin-token",
    };
  };

  const signout = () => {
    console.log("signout");

    // .card.created = 1645122620 = returns after payment is confirmed from stripe
    // convert GMT to CST(Central Standard Time=local time)
    var date = new Date(1645122620 * 1000);
    console.log(date.toUTCString().toLocaleString());
    console.log(
      date.toLocaleString("en-US", {
        timeZone: "CST",
      })
    );
  };

  const goBack = (e) => {
    console.log("go back!");
  };
  const doPayment = async (event, elements, stripe) => {
    console.log("do payment!");

    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    console.log(error);
    console.log(paymentMethod);
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('success!');
    }
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>
        <div onClick={(e) => signin(e)} className="ui button" tabIndex="0">
          <div className="visible content">
            Signin &nbsp;&nbsp;
            <Icon name="sign in alternate" size="large" />
          </div>
        </div>
        <div onClick={(e) => signout(e)} className="ui button" tabIndex="1">
          <div className="visible content">
            Signout &nbsp;&nbsp;
            <Icon name="sign out alternate" size="large" />
          </div>
        </div>

        <p></p>
        <Divider />
        <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
          Payment method
        </Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => doPayment(e, elements, stripe)}>
                <CardElement />
                <br /> <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={(e) => goBack(e)}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                  >
                    Pay: $ 500
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

export default Home;
