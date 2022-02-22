import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/Cancel";

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
  const paymentStatus = useSelector((state) => state.checkout.paymentStatus);
  const paymentDetails = useSelector((state) => state.checkout.paymentDetails);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Order Details
      </Typography>

      <Container maxWidth="lg">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card className={classes.customerDetails}>
            <CardContent>
              <div>
                <Typography variant="h6" gutterBottom>
                  {paymentStatus ? (
                    <span className={classes.paymentSuccess}>
                      <CheckCircleRoundedIcon
                        style={{ marginBottom: "-3px" }}
                      />{" "}
                      Order Status : &nbsp;&nbsp;&nbsp; SUCCESS ! &nbsp;
                    </span>
                  ) : (
                    <span className={classes.paymentFail}>
                      <CancelIcon style={{ marginBottom: "-3px" }} 
                      />{" "}
                      Order Status : &nbsp;&nbsp;&nbsp; FAIL ! &nbsp;
                    </span>
                  )}
                </Typography>
                {paymentStatus ? (
                  <div className={classes.paymentSuccess}>
                    Payment Confirmation : &nbsp;&nbsp;&nbsp;
                    {paymentDetails.paymentId}
                    <br />
                    Card Type : &nbsp;&nbsp;&nbsp; {paymentDetails.cardBrand}
                    <br />
                    Payment Date &amp; Time : &nbsp; &nbsp;&nbsp;
                    {paymentDetails.paymentDateAndTime}
                    <br />
                    Amount Paid : &nbsp; &nbsp;&nbsp; ${" "}
                    {paymentDetails.amountPaid}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </CardContent>
          </Card>

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
