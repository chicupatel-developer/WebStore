import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyShoppingCart,
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productsActions";

import useStyles from "./styles";

import {
  Container,
  Divider,
  CardMedia,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import TodayHistory from "./TodayHistory/TodayHistory";
import CurrentWeekHistory from "./CurrentWeekHistory/CurrentWeekHistory";
import CurrentMonthHistory from "./CurrentMonthHistory/CurrentMonthHistory";

const ShoppingHistory = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h2>History of Shopping</h2>
        <Divider />

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Today History" />
          <Tab label="This Week History" />
          <Tab label="This Month History" />
        </Tabs>

        <div className={classes.tabContentDiv}>
          {value === 0 && (
            <div>
              <TodayHistory />
            </div>
          )}
          {value === 1 && (
            <div>
              <CurrentWeekHistory />
            </div>
          )}
          {value === 2 && (
            <div>
              <CurrentMonthHistory />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ShoppingHistory;
