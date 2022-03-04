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
import { setUpdateHistory } from "../../../redux/actions/historyActions";

import ShopperService from "../../../services/product-shopper.service";

const TodayHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // redux
  // read
  const currentUser = useSelector((state) => state.auth.currentUser);
  const updateHistory = useSelector(
    (state) => state.shopperHistory.updateHistory
  );

  useEffect(() => {
    if (updateHistory) {
      console.log("get shopper history : call API");
      getTodayHistory();
      dispatch(setUpdateHistory(false));
    } else {
      console.log("No need for API call to get shopper history");
    }
  }, []);

  const getStatisticalData = (apiResponse) => {
    let group = apiResponse.reduce((r, a) => {
      r[a.productId] = [...(r[a.productId] || []), a];
      return r;
    }, {});
    console.log("group", group);

    let _history = [];

    for (const key in group) {
      console.log(`${key}: ${group[key]}`);

      let productWiseQtyBought = 0;
      group[key].forEach((product) => {
        console.log(product);
        productWiseQtyBought += product.qty;
      });

      let _productHistory = {
        productId: group[key][0].productId,
        qty: productWiseQtyBought,
        date: group[key][0].soldDate,
        productPrice: group[key][0].price,
      };

      _history.push(_productHistory);
      console.log("------------------------");
    }
    console.log(_history);
  };
  const getTodayHistory = () => {
    ShopperService.getTodayHistory(currentUser.userName)
      .then((response) => {
        console.log(response);
        getStatisticalData(response.data);
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
