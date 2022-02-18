import React, { useState, useEffect } from "react";
import validator from "validator";

import {
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

const Customer = ({ changeStep }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isError, setIsError] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
  });

  const phoneValidation = (phone) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phone);
  };

  const handleFormControlChangeEvent = (event) => {
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          firstName: "First Name Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          firstName: "",
        });
      }
    } else if (event.target.name === "lastName") {
      setLastName(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          lastName: "Last Name Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          lastName: "",
        });
      }
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          email: "Email Is Required!",
        });
      } else if (validator.isEmail(event.target.value)) {
        console.log("email ok...");
        setIsError({
          ...isError,
          email: "",
        });
      } else {
        setIsError({
          ...isError,
          email: "Invalid Email!",
        });
      }
    } else if (event.target.name === "phoneNumber") {
      setPhoneNumber(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          phoneNumber: "Phone Number Is Required!",
        });
      } else if (!phoneValidation(event.target.value)) {
        setIsError({
          ...isError,
          phoneNumber: "Invalid Phone Number!",
        });
      } else {
        setIsError({
          ...isError,
          phoneNumber: "",
        });
      }
    }
  };

  const formValid = (isError) => {
    let isValid = false;
    var BreakException = {};
    try {
      Object.values(isError).forEach((val) => {
        console.log("checking... " + val);
        if (val.length > 0) {
          isValid = false;
          throw BreakException;
        } else {
          isValid = true;
        }
      });
    } catch (e) {
      return isValid;
    }
    return isValid;
  };

  const handleSubmit = (evt) => {
    if (formValid(isError)) {
    } else {
      console.log("Form is invalid!");
      if (firstName === "")
        setIsError({
          ...isError,
          firstName: "First Name Is Required!",
        });
      if (lastName === "")
        setIsError({
          ...isError,
          lastName: "Last Name Is Required!",
        });
      if (email === "")
        setIsError({
          ...isError,
          email: "Email Is Required!",
        });
      else if (!validator.isEmail(email)) {
        setIsError({
          ...isError,
          email: "Invalid Email!",
        });
      }
      if (phoneNumber === "") {
        setIsError({
          ...isError,
          phoneNumber: "Phone Number Is Required!",
        });
      } else if (!phoneValidation(phoneNumber)) {
        setIsError({
          ...isError,
          phoneNumber: "Invalid Phone Number!",
        });
      } else {
        setIsError({
          ...isError,
          phoneNumber: "",
        });
      }
      return;
    }

    console.log(
      "Customer Details Submitted! Going to Next Step of Shipping Details!"
    );

    // store customer details to redux store
    let customerDetailsData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    // and go to next step
    changeStep();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>

      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.firstName && (
                <span className="invalid-feedback">{isError.firstName}</span>
              )}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.lastName && (
                <span className="invalid-feedback">{isError.lastName}</span>
              )}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.email && (
                <span className="invalid-feedback">{isError.email}</span>
              )}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phoneNumber"
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.phoneNumber && (
                <span className="invalid-feedback">{isError.phoneNumber}</span>
              )}
            </span>
          </Grid>
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={Link} variant="outlined" to="/cart">
            Back to Cart
          </Button>
          <Button
            onClick={(e) => handleSubmit(e)}
            type="button"
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Customer;
