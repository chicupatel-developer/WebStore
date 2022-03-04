import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentStatus,
  setPaymentDetails,
  setProductSoldResponse,
} from "../../../redux/actions/checkoutActions";
import { setMyShoppingCart } from "../../../redux/actions/productsActions";

import ShopperService from "../../../services/product-shopper.service";

const CurrentWeekHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => { }, []);
    
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Current Week History</h1>
      </Container>
    </div>
  );
};

export default CurrentWeekHistory;
