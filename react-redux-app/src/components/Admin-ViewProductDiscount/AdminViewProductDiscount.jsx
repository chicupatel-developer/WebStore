import React, { useState, useEffect } from "react";

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
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import AdminService from "../../services/product-admin.service";

const AdminViewProductDiscount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {}, []);

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h3>[ View - Product Discount ]</h3>

        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            Image
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box className={classes.root}>
              <Card>
                <CardHeader title="Title" subheader="Subheader" />
                <CardContent>
                  <div>Content</div>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminViewProductDiscount;
