import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import MonthlyProductReport from "./Monthly-Product-Report/Monthly-Product-Report";
import QuartlyProductReport from "./Quartly-Product-Report/Quartly-Product-Report";
import DiscountTrendReport from "./Discount-Trend-Report/Discount-Trend-Report";

const AdminReport = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="lg">
        <h2>Admin - Reports</h2>
        <Divider />

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Monthly-Report" />
          <Tab label="Quartly-Report" />
          <Tab label="Discount-Trend" />
        </Tabs>

        <div className={classes.tabContentDiv}>
          {value === 0 && (
            <div>
              <MonthlyProductReport />
            </div>
          )}
          {value === 1 && (
            <div>
              <QuartlyProductReport />
            </div>
          )}
          {value === 2 && (
            <div>
              <DiscountTrendReport />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminReport;
