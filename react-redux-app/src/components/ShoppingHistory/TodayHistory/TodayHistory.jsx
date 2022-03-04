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

const TodayHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    getTodayHistory();
  }, []);

  const getTodayHistory = () => {
    ShopperService.getTodayHistory("haha")
      .then((response) => {
        console.log(response);

        let group = response.data.reduce((r, a) => {    
          r[a.productId] = [...(r[a.productId] || []), a];
          return r;
        }, {});
        console.log("group", group);

       for (const key in group) {
           console.log(`${key}: ${group[key]}`);
           
           group[key].forEach((product) => {
               console.log(product);
           });

           console.log('------------------------');
       }

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Today History</h1>
      </Container>
    </div>
  );
};

export default TodayHistory;
