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

  const rows = weekHistoryData;

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Current Week History</h1>
        <p></p>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="History">
            <TableHead>
              <TableRow>
                <TableCell>Product #</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.productId}
                  </TableCell>
                  <TableCell align="right">{row.productPrice}</TableCell>
                  <TableCell align="right">
                    {Moment(row.date).format("ddd  DD MMM , hh:mm a")}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
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
