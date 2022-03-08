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
  setWeekHistoryData,
  callApiForWeeklyData,
} from "../../../redux/actions/historyActions";

import ShopperService from "../../../services/product-shopper.service";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Moment from "moment";
const CurrentWeekHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // redux
  // read
  const currentUser = useSelector((state) => state.auth.currentUser);
  const weekHistoryData = useSelector(
    (state) => state.shopperHistory.weekHistoryData
  );

  const getApiForWeeklyData = useSelector(
    (state) => state.shopperHistory.callApiForWeeklyData
  );

  // this will read allProducts.products from redux-store
  const products = useSelector((state) => state.allProducts.products);

  useEffect(() => {
    // Moment.locale("en");

    if (getApiForWeeklyData) {
      getWeekHistory();
    } else {
      console.log("getting weekly-history data from Rudux store!");
      console.log(weekHistoryData);
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

      // get image for related productId
      let _product = products.find((p) => p.id === group[key][0].productId);

      let _productHistory = {
        productId: group[key][0].productId,
        qty: productWiseQtyBought,
        date: group[key][0].soldDate,
        productPrice: group[key][0].price,
        image: _product.image,
      };

      _history.push(_productHistory);
      console.log("------------------------");
    }
    console.log(_history);

    // order by date
    _history.sort((a, b) => {
      let da = new Date(a.date),
        db = new Date(b.date);
      return da - db;
    });

    dispatch(setWeekHistoryData(_history));
  };
  const getWeekHistory = () => {
    ShopperService.getWeekHistory(currentUser.userName)
      .then((response) => {
        dispatch(callApiForWeeklyData(false));

        console.log(response);
        getStatisticalData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalForProduct = (totalData) => {
    var paymentAmount = totalData.toFixed(2);
    return (Math.ceil(paymentAmount * 20 - 0.5) / 20).toFixed(2);
  };

  const getTotalForWeek = () => {
    var grandTotal = 0.0;
    weekHistoryData.forEach(function (arrayItem) {
      var productTotal = Number(
        getTotalForProduct(arrayItem.qty * arrayItem.productPrice)
      );

      console.log(productTotal);
      grandTotal += productTotal;
    });
    return grandTotal.toFixed(2);
  };

  const rows = weekHistoryData;

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Current Week History</h1>
        <h3>
          <span className={classes.totalWeeklySpent}>
            [ Total Spent &nbsp; $ {getTotalForWeek()} ]
          </span>
        </h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="History">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">$ [Unit Price]</TableCell>
                <TableCell align="right">Purchased Qty</TableCell>
                <TableCell align="right">$ [Total]</TableCell>
                <TableCell align="right">Purchased Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* {row.productId} */}
                    <img src={row.image} alt="Image__" width="90" height="90" />
                  </TableCell>

                  <TableCell align="right">$ {row.productPrice}</TableCell>

                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">
                    $ {getTotalForProduct(row.qty * row.productPrice)}
                  </TableCell>
                  <TableCell align="right">
                    {Moment(row.date).format("ddd  DD MMM , hh:mm a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CurrentWeekHistory;
