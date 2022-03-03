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
} from "@material-ui/core";

const ShoppingHistory = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h2>History of Shopping</h2>
        <Divider />
      </Container>
    </div>
  );
};

export default ShoppingHistory;
