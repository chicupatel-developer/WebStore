import React, { useState, useEffect } from "react";
import validator from "validator";

import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

const AdminProductDiscount = () => {
  const classes = useStyles();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {}, []);

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Admin Area [ Product Discount ]</h1>
      </Container>
    </div>
  );
};

export default AdminProductDiscount;
