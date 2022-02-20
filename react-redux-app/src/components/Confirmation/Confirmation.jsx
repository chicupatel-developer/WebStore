import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerDetails } from "../../redux/actions/checkoutActions";

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

const Confirmation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // redux
  // read
  const customerDetails = useSelector(
    (state) => state.checkout.customerDetails
  );
  const shippingDetails = useSelector(
    (state) => state.checkout.shippingDetails
  );

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Order Confirmation
      </Typography>

      <Container maxWidth="lg">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card className={classes.customerDetails}>
            <CardContent>
              <div>
                <Typography variant="h6" gutterBottom>
                  Customer Details
                </Typography>
                Customer : {customerDetails.firstName},{" "}
                {customerDetails.lastName}
                <br />
                Email : {customerDetails.email}
                <br />
                Phone : {customerDetails.phoneNumber}
              </div>
            </CardContent>
          </Card>

          <Card className={classes.shippingDetails}>
            <CardContent>
              <div>
                <Typography variant="h6" gutterBottom>
                  Shipping Details
                </Typography>
                Country : {shippingDetails.country}
                <br />
                Province : {shippingDetails.province}
                <br />
                City : {shippingDetails.city}
                <br />
                Address : {shippingDetails.address}
                <br />
                Postal Code : {shippingDetails.postalCode}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default Confirmation;
