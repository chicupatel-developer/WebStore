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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Moment from "moment";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const AdminViewProductDiscount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [discountData, setDiscountData] = useState([]);
  const [discountZoneSales, setDiscountZoneSales] = useState({});

  const currentUser = useSelector((state) => state.auth.currentUser);
  const discountOnProduct = useSelector(
    (state) => state.admin.productForDiscount
  );
  const { productId, title, description, category, price, image } =
    discountOnProduct;

  const setDiscountStatus = (data) => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);

    data.forEach((prDis) => {
      if (
        currentDate >=
          new Date(prDis.firstDateForDiscountedPrice).setHours(0, 0, 0, 0) &&
        currentDate <=
          new Date(prDis.lastDateForDiscountedPrice).setHours(0, 0, 0, 0)
      ) {
        // discount scheme is still ACTIVE/RUNNING
        prDis.discountStatus = "RUNNING";
      } else {
        // discount either EXPIRED or COMING-SOON
        if (
          currentDate >
          new Date(prDis.lastDateForDiscountedPrice).setHours(0, 0, 0, 0)
        )
          prDis.discountStatus = "EXPIRED";
        if (
          currentDate <
          new Date(prDis.firstDateForDiscountedPrice).setHours(0, 0, 0, 0)
        )
          prDis.discountStatus = "COMING-SOON";
      }
    });
    setDiscountData(data);
  };

  const getProductDiscountData = () => {
    AdminService.getProductDiscountData(productId)
      .then((response) => {
        console.log(response.data);
        setDiscountStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (discountOnProduct.productId === undefined) navigate("/home");
    else {
      getProductDiscountData();
    }
  }, [discountOnProduct]);

  const getSubHeader = (subHeaderString) => {
    return <div className={classes.subHeader}>{subHeaderString}</div>;
  };
  const getTitle = (titleString, priceString) => {
    return (
      <div className={classes.title}>
        <div className={classes.price}>
          <b>$ {priceString}</b>
        </div>
        {titleString}
      </div>
    );
  };

  const rows = discountData;

  const getDiscountZoneProductSales = (e, row) => {
    console.log(
      "getting sales!",
      row.firstDateForDiscountedPrice,
      row.lastDateForDiscountedPrice
    );

    let data = {
      productId: row.productId,
      discountStartDate: row.firstDateForDiscountedPrice,
      discountEndDate: row.lastDateForDiscountedPrice,
      id: row.productDiscountId,
    };
    console.log(data);

    AdminService.getDiscountZoneProductSales(data)
      .then((response) => {
        console.log(response.data);

        setDiscountZoneSales({
          sales: response.data.sales,
          id: data.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="lg">
        <h3>[ View - Product Discount ]</h3>

        <Grid container>
          <Grid item xs={12} sm={1} md={1} lg={1}>
            <img src={image} className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={11} md={11} lg={11}>
            <Box className={classes.root}>
              <Card>
                <CardHeader
                  title={getTitle(title, price)}
                  subheader={getSubHeader(category)}
                />
                <CardContent>
                  <div>
                    {rows && rows.length > 0 ? (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350 }} aria-label="History">
                          <TableHead>
                            <TableRow>
                              <TableCell>Discount</TableCell>
                              <TableCell align="right">
                                $ Discounted Price
                              </TableCell>
                              <TableCell align="right">Discount %</TableCell>
                              <TableCell align="right">Discount Qty</TableCell>
                              <TableCell align="right">
                                Discount Start Date
                              </TableCell>
                              <TableCell align="right">
                                Discount End Date
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.productDiscountId}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">
                                  {/* {row.productId} */}
                                  {row.discountStatus === "RUNNING" ? (
                                    <span className={classes.runningDiscount}>
                                      <h3>{row.discountStatus}</h3>
                                    </span>
                                  ) : (
                                    <span>
                                      {row.discountStatus === "EXPIRED" ? (
                                        <span
                                          className={classes.expiredDiscount}
                                        >
                                          <h5>{row.discountStatus}</h5>
                                        </span>
                                      ) : (
                                        <span
                                          className={classes.comingSoonDiscount}
                                        >
                                          <h5>{row.discountStatus}</h5>
                                        </span>
                                      )}
                                    </span>
                                  )}
                                  &nbsp;
                                  {row.discountStatus !== "COMING-SOON" && (
                                    <span>
                                      <Button
                                        onClick={(e) =>
                                          getDiscountZoneProductSales(e, row)
                                        }
                                      >
                                        <TrendingUpIcon />
                                      </Button>
                                      &nbsp;
                                      <span>
                                        {discountZoneSales &&
                                        discountZoneSales.id ===
                                          row.productDiscountId ? (
                                          <span
                                            className={
                                              classes.discountZoneSalesSpan
                                            }
                                          >
                                            Sales [$ {discountZoneSales.sales}]
                                          </span>
                                        ) : (
                                          <span></span>
                                        )}
                                      </span>
                                    </span>
                                  )}
                                </TableCell>

                                <TableCell align="right">
                                  $ {row.discountedPrice}
                                </TableCell>

                                <TableCell align="right">
                                  {row.discountPercentage}
                                </TableCell>
                                <TableCell align="right">
                                  {row.discountQty}
                                </TableCell>
                                <TableCell align="right">
                                  {Moment(
                                    row.firstDateForDiscountedPrice
                                  ).format("ddd  DD MMM")}
                                </TableCell>
                                <TableCell align="right">
                                  {Moment(
                                    row.lastDateForDiscountedPrice
                                  ).format("ddd  DD MMM")}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <span className={classes.noDiscountData}>
                        Discount-Data Not Available !
                      </span>
                    )}
                  </div>
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
