import React, { useState, useEffect } from "react";
import validator from "validator";

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

// date picker
import { alpha } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import AdminService from "../../services/product-admin.service";

const AdminProductDiscount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // date picker
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (date) => {
    console.log(date);

    if (date === "" || date === null) {
      setIsError({
        ...isError,
        startDate: "Start Date Is Required!",
      });
    } else {
      if (date >= endDate && endDate !== null) {
        setIsError({
          ...isError,
          startDate: "Start Date Must be < End Date!",
        });
      } else {
        setStartDate(date);
        setIsError({
          ...isError,
          startDate: "",
        });
      }
    }
  };
  // const [endDate, setEndDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const handleEndDateChange = (date) => {
    console.log(date);
    setEndDate(date);

    if (date === "" || date === null) {
      setIsError({
        ...isError,
        endDate: "End Date Is Required!",
      });
    } else {
      if (date <= startDate) {
        setIsError({
          ...isError,
          endDate: "End Date Must be > Start Date!",
        });
      } else {
        setEndDate(date);
        setIsError({
          ...isError,
          endDate: "",
        });
      }
    }
  };

  const currentUser = useSelector((state) => state.auth.currentUser);
  const discountOnProduct = useSelector(
    (state) => state.admin.productForDiscount
  );
  const { productId, title, description, category, price, image } =
    discountOnProduct;

  const [apiResponse, setApiResponse] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0.0);
  const [discountAfterQty, setDiscountAfterQty] = useState(0);
  const [isError, setIsError] = useState({
    discountPercentage: undefined,
    discountAfterQty: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(() => {
    if (discountOnProduct.productId === undefined) navigate("/home");
  }, []);

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

  const re = /^[0-9\b]+$/;
  const handleFormControlChangeEvent = (e) => {
    if (e.target.name === "discountPercentage") {
      if (e.target.value === "" || re.test(e.target.value)) {
        setDiscountPercentage(e.target.value);
        setIsError({
          ...isError,
          discountPercentage: "",
        });

        setDiscountedPrice(
          (
            Math.ceil(
              (price - (Number(e.target.value) * price) / 100) * 20 - 0.5
            ) / 20
          ).toFixed(2)
        );
      }
      if (e.target.value === "")
        setIsError({
          ...isError,
          discountPercentage: "Discount - % Is Required!",
        });
    }
    if (e.target.name === "discountAfterQty") {
      if (e.target.value === "" || re.test(e.target.value)) {
        setDiscountAfterQty(e.target.value);
        setIsError({
          ...isError,
          discountAfterQty: "",
        });
      }
      if (e.target.value === "")
        setIsError({
          ...isError,
          discountAfterQty: "Discount - Qty Is Required!",
        });
    }
  };

  const formValid = (isError) => {
    let isValid = false;
    var BreakException = {};
    try {
      for (const key in isError) {
        console.log(`${key}: ${isError[key]}`);
        if (isError[key] !== "" || isError[key] === undefined) {
          isValid = false;
          throw BreakException;
        } else {
          isValid = true;
        }
      }
    } catch (e) {
      return isValid;
    }
    return isValid;
  };

  const formReset = () => {
    setDiscountedPrice(0.0);
    setDiscountPercentage(0);
    setDiscountAfterQty(0);
    setStartDate(null);
    setEndDate(null);
  };
  const setDiscount = (evt) => {
    if (formValid(isError)) {
      if (discountAfterQty === "" || Number(discountAfterQty) < 1) {
        setIsError({
          ...isError,
          discountAfterQty: "Discount - Qty Is Required!",
        });
        return;
      }
      if (discountPercentage === "" || Number(discountPercentage) < 1) {
        setIsError({
          ...isError,
          discountPercentage: "Discount - % Is Required!",
        });
        return;
      }
      if (startDate === "" || startDate === null) {
        setIsError({
          ...isError,
          startDate: "Start Date Is Required!",
        });
        return;
      }

      if (endDate === "" || endDate === null) {
        setIsError({
          ...isError,
          endDate: "End Date Is Required!",
        });
        return;
      } else if (endDate <= startDate) {
        setIsError({
          ...isError,
          endDate: "End Date Must be > Start Date!",
        });
        return;
      }
    } else {
      console.log("Form is invalid!");
      if (discountAfterQty === "" || Number(discountAfterQty) < 1) {
        setIsError({
          ...isError,
          discountAfterQty: "Discount - Qty Is Required!",
        });
        return;
      }
      if (discountPercentage === "" || Number(discountPercentage) < 1) {
        setIsError({
          ...isError,
          discountPercentage: "Discount - % Is Required!",
        });
        return;
      }
      if (startDate === "" || startDate === null) {
        setIsError({
          ...isError,
          startDate: "Start Date Is Required!",
        });
        return;
      }

      if (endDate === "" || endDate === null) {
        setIsError({
          ...isError,
          endDate: "End Date Is Required!",
        });
        return;
      } else if (endDate <= startDate) {
        setIsError({
          ...isError,
          endDate: "End Date Must be > Start Date!",
        });
        return;
      }
      return;
    }
    console.log("Discount is Set for Product!");

    var CSToffSet = -360; //CST is -6:00 of UTC; i.e. 60*6 = -360 in minutes
    var offset = CSToffSet * 60 * 1000;
    var CSTTimeStartDate = new Date(startDate.getTime() + offset);
    var CSTTimeEndDate = new Date(endDate.getTime() + offset);

    let productDiscount = {
      productId: productId,
      price: price,
      discountedPrice: Number(discountedPrice),
      discountPercentage: Number(discountPercentage),
      discountQty: Number(discountAfterQty),
      // firstDateForDiscountedPrice: startDate,
      // lastDateForDiscountedPrice: endDate,
      firstDateForDiscountedPrice: CSTTimeStartDate,
      lastDateForDiscountedPrice: CSTTimeEndDate,
    };
    console.log(productDiscount);

    formReset();

    AdminService.addProductDiscount(productDiscount)
      .then((response) => {
        console.log(response.data);
        setApiResponse("200" + response.data.responseMessage);
        setTimeout(() => {
          setApiResponse("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          if (error.response.data.response) {
            setApiResponse(
              "400" + error.response.data.response.responseMessage
            );
          } else {
            setApiResponse("400" + error.response.statusText);
          }
        } else if (error.response.status === 500) {
          setApiResponse("500" + error.response.data.responseMessage);
        }

        console.log(apiResponse);
        setTimeout(() => {
          setApiResponse("");
        }, 3000);
      });
  };
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h3>[ Set - Product Discount ]</h3>

        <div className={classes.discountNote}>
          <span>
            if Admin sets Discount-Starts-After-Qty = 10 for any specific
            Product <b>[AND]</b>
            <br />
            if any user has bought that specific Product More Or Equal to 10 in
            Last 30 Days <b>[AND]</b>
            <br />
            if <b>Discount is still Active(RUNNING)</b> [ if current-date is
            between start-date-of-discount and end-date-of-discount ] for that
            specific Product <b>then,,,</b>
            <br />
            <u>
              this{" "}
              <b>
                user will see and get discounted-price for that specific Product
              </b>
            </u>
          </span>
        </div>

        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img src={image} className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box className={classes.root}>
              <Card>
                <CardHeader
                  title={getTitle(title, price)}
                  subheader={getSubHeader(category)}
                />
                <CardContent>
                  <div>
                    {apiResponse && (
                      <span>
                        {apiResponse.substring(0, 3) === "200" ? (
                          <span className={classes.apiSuccess}>
                            <h3>{apiResponse.substring(3)}</h3>
                          </span>
                        ) : (
                          <span className={classes.apiError}>
                            <h3>{apiResponse.substring(3)}</h3>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  <p></p>
                  {discountedPrice < price && discountedPrice > 0 && (
                    <span className={classes.discountedPrice}>
                      Discounted Price : $ {discountedPrice}
                    </span>
                  )}
                  <p></p>

                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="discountPercentage"
                          fullWidth
                          label="Discount In %"
                          value={discountPercentage}
                          onChange={(e) => handleFormControlChangeEvent(e)}
                        />
                        <span className={classes.controlInvalid}>
                          {isError.discountPercentage && (
                            <span className="invalid-feedback">
                              {isError.discountPercentage}
                            </span>
                          )}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="discountAfterQty"
                          fullWidth
                          label="Discount-Starts-After-Qty"
                          value={discountAfterQty}
                          onChange={(e) => handleFormControlChangeEvent(e)}
                        />
                        <span className={classes.controlInvalid}>
                          {isError.discountAfterQty && (
                            <span className="invalid-feedback">
                              {isError.discountAfterQty}
                            </span>
                          )}
                        </span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            label="Discount-Start-Date"
                            value={startDate}
                            onChange={handleStartDateChange}
                          />
                        </MuiPickersUtilsProvider>
                        <span className={classes.controlInvalid}>
                          {isError.startDate && (
                            <span className="invalid-feedback">
                              {isError.startDate}
                            </span>
                          )}
                        </span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            label="Discount-End-Date"
                            value={endDate}
                            onChange={handleEndDateChange}
                          />
                        </MuiPickersUtilsProvider>
                        <span className={classes.controlInvalid}>
                          {isError.endDate && (
                            <span className="invalid-feedback">
                              {isError.endDate}
                            </span>
                          )}
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                  <br />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button component={Link} variant="outlined" to="/products">
                      Back To Products
                    </Button>
                    <Button
                      onClick={(e) => setDiscount(e)}
                      type="button"
                      variant="contained"
                      color="primary"
                    >
                      Set Discount
                    </Button>
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

export default AdminProductDiscount;
