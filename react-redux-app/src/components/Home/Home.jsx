import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import {
  MenuItem,
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
  Select,
} from "@material-ui/core";

const Home = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <div className={classes.homePageHeader}>
          <h3>Web-Store</h3>
          <h5>
            Web API Core / EF Core / SQL Server / Angular / React-Redux / JWT
            Authentication
          </h5>
        </div>
        <p></p>

        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.rightColumn}
          >
            <Card>
              <CardHeader title="Role : Admin" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>
                    <span className={classes.titleSpan}>
                      View list of Products
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>Search Products</span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      <u>Set Discount on Products</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - For any Date, Admin can Set-Discount-Policy --- One,,,
                      For any Product
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      <b>
                        {" "}
                        means... Only One Discount-Policy can connect with
                        Product at a Time{" "}
                      </b>
                      <br />[ Discount in %, Discount-Starts-After-Qty,
                      Discount-Start-Date, Discount-End-Date ]
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      <u>View Discount</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - View{" "}
                      <b>
                        {" "}
                        Discount-Status &nbsp;[RUNNING, EXPIRED, COMING-SOON]{" "}
                      </b>{" "}
                      and other Discount-Policy Info
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - View <b> Trend of Sales versus Discount-Policy</b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      [ View &nbsp;
                      <b>
                        Total Sales[$] of any Product during
                        Discount-Policy-Time-Duration
                      </b> ]
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      <u>Admin Reports</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      <b>- Monthly-Report</b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      - Display Line-Chart and Bar-Chart for
                      <b>
                        {" "}
                        Total Sales($) versus Month for a selected Product and
                        Year{" "}
                      </b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      - Display <b>Total Sales($) for the Year </b>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      <b>- Quarterly-Report</b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      - Display Line-Chart and Bar-Chart for{" "}
                      <b>
                        {" "}
                        Total Sales($) versus Quarter for a selected Product and
                        Year{" "}
                      </b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      - Display <b> Total Sales($) for the Year </b>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      <b>- Discount-Trend-Report</b>
                    </span>
                    <br />
                    <span className={classes.indent2}>
                      - Display Line-Chart and Bar-Chart for{" "}
                      <b>
                        {" "}
                        Total Sales($) versus Last 5 Discount-Policy for a
                        selected Product{" "}
                      </b>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.leftColumn}
          >
            <Card>
              <CardHeader title="Role : Shopper" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>
                    <span className={classes.titleSpan}>
                      View list of Products
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>Search Products</span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      View details of Product
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      Add Product to Shopping-Cart
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      <u>Get Discounted Price on Product</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      [ If Discount is currently RUNNING (Current Date is
                      between Discount-Start-Date &amp; Discount-End-Date)
                      &amp;&amp;{" "}
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      If in last 30 days, Shopper has bought more or equal to
                      Discount-Starts-After-Qty ] &nbsp;
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      For a specific Product
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      View / Edit / Empty - Shopping-Cart
                    </span>
                  </li>
                  <li>
                    <span className={classes.titleSpan}>
                      <u>CheckOut from Shopping-Cart</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - Enter <b>Customer Details</b>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - Enter <b>Shipping Details</b>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - Enter <b>Payment Details [ Stripe - CC ]</b>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      - <b>Receive Confirmation</b>
                    </span>
                    <br />
                    <span className={classes.indent3}>
                      <b>- SUCCESS MESSAGE</b> [ - Stripe Payment Gateway
                      Response - Web API Response ]
                    </span>
                    <br />
                    <span className={classes.indent3}>--- OR ---</span>

                    <br />
                    <span className={classes.indent3}>
                      <b>- ERROR MESSAGE</b>
                    </span>
                  </li>

                  <li>
                    <span className={classes.titleSpan}>
                      <u>View Shopping-History</u>
                    </span>
                    <br />
                    <span className={classes.indent1}>
                      <b>- Today-History</b>
                      <br />
                      <span className={classes.indent2}>
                        - Display{" "}
                        <b>Today's Shopping History Data - Product wise</b>
                      </span>
                      <br />
                      <span className={classes.indent2}>
                        - Display <b>Total $ Spent on Today's Shopping</b>
                      </span>
                    </span>
                    <br />

                    <span className={classes.indent1}>
                      <b>- Current-Week-History</b>
                      <br />
                      <span className={classes.indent2}>
                        - Display{" "}
                        <b>
                          Current-Week's Shopping History Data - Product wise
                        </b>
                      </span>
                      <br />
                      <span className={classes.indent2}>
                        - Display{" "}
                        <b>Total $ Spent on Current-Week's Shopping</b>
                      </span>
                    </span>
                    <br />

                    <span className={classes.indent1}>
                      <b>- Current-Month-History</b>
                      <br />
                      <span className={classes.indent2}>
                        - Display{" "}
                        <b>
                          Current-Month's Shopping History Data - Product wise
                        </b>
                      </span>
                      <br />
                      <span className={classes.indent2}>
                        - Display{" "}
                        <b>Total $ Spent on Current-Month's Shopping</b>
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.rightColumn}
          >
            <Card>
              <CardHeader title="Register" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>
                    User can register with valid Username, Password, Email and
                    Role [Admin/Shopper]
                  </li>
                  <li>
                    after successful registration, user is redirected to login
                    page
                  </li>
                  <li>
                    after un-successful register, error message is displayed
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.rightColumn}
          >
            <Card>
              <CardHeader title=" Role based Authentication" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>JWT Authentication</li>
                  <li>
                    after successful login, respective Role is returned in Token
                    / Response
                  </li>
                  <li>React/Redux stores Role info with Token</li>
                  <li>Menu displays as per Role info</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.leftColumn}
          >
            <Card>
              <CardHeader title="Login" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>User can login with valid Username and Password</li>
                  <li>
                    after successful login, Token, Role and other User's
                    information is stored on Client side(Redux Store) and menu
                    options are displayed as per User's Role
                  </li>
                  <li>after un-successful login, error message is displayed</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.leftColumn}
          >
            <Card>
              <CardHeader title="Exceptions Handling" />
              <CardContent className={classes.cardContent}>
                <ul>
                  <li>
                    Model validations are handled on Client side - React -
                    Component
                  </li>
                  <li>
                    all Server side exceptions are handled on Api - Controller /
                    C# Service
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
