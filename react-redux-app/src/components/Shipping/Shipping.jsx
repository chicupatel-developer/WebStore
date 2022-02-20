import React, { useEffect, useState } from "react";

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

import { useDispatch, useSelector } from "react-redux";
import { setShippingDetails } from "../../redux/actions/checkoutActions";

import { getCountry, getProvinces } from "../../services/localService";

const Shipping = ({ backStep, changeStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("CA");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("Manitoba");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [isError, setIsError] = useState({
    city: undefined,
    postalCode: undefined,
    address: undefined,
  });

  const postalCodeValidation = (pCode) => {
    const regex = /^\(?([A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9])$/;
    return regex.test(pCode);
  };

  useEffect(() => {
    setCountries(getCountry());
    setProvinces(getProvinces("CA"));
    return () => {};
  }, []);

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
      if (city === "")
        setIsError({
          ...isError,
          city: "City Is Required!",
        });
      if (postalCode === "") {
        setIsError({
          ...isError,
          postalCode: "Postal Code Is Required!",
        });
      } else if (!postalCodeValidation(postalCode)) {
        setIsError({
          ...isError,
          postalCode: "Invalid Postal Code!",
        });
      } else {
        setIsError({
          ...isError,
          postalCode: "",
        });
      }
      if (address === "")
        setIsError({
          ...isError,
          address: "Address Is Required!",
        });
      return;
    }

    console.log(
      "Shipping Details Submitted! Going to Next Step of Payment Details!"
    );
    // store shipping details to redux store
    let shippingDetailsData = {
      country: getCountry().find(x => x.code === selectedCountry).name,
      province: selectedProvince,
      city: city,
      postalCode: postalCode,
      address: address,
    };
    dispatch(setShippingDetails(shippingDetailsData));

    // and go to next step
    changeStep();
  };

  const renderOptionsForProvince = () => {
    return provinces.map((dt, i) => {
      return (
        <MenuItem value={dt.name} key={i} name={dt.name}>
          {dt.name}
        </MenuItem>
      );
    });
  };
  const onProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const renderOptionsForCountry = () => {
    return countries.map((dt, i) => {
      return (
        <MenuItem value={dt.code} key={i} name={dt.name}>
          {dt.name}
        </MenuItem>
      );
    });
  };
  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setProvinces(getProvinces(e.target.value));
    setSelectedProvince(getProvinces(e.target.value)[0].name);
  };

  const handleFormControlChangeEvent = (event) => {
    if (event.target.name === "city") {
      console.log("checking city!");
      setCity(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          city: "City Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          city: "",
        });
      }
    } else if (event.target.name === "postalCode") {
      console.log("checking postal code!");
      setPostalCode(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          postalCode: "Postal Code Is Required!",
        });
      } else if (!postalCodeValidation(event.target.value)) {
        setIsError({
          ...isError,
          postalCode: "Invalid Postal Code!",
        });
      } else {
        setIsError({
          ...isError,
          postalCode: "",
        });
      }
    } else if (event.target.name === "address") {
      console.log("checking address!");
      setAddress(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          address: "Address Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          address: "",
        });
      }
    }
  };

  return (
    <div>
      <h1>Shipping Info Form!</h1>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            Country : &nbsp;&nbsp;
            <Select
              onChange={(e) => onCountryChange(e)}
              value={selectedCountry}
            >
              {renderOptionsForCountry()}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            Province : &nbsp;&nbsp;
            <Select
              onChange={(e) => onProvinceChange(e)}
              value={selectedProvince}
            >
              {renderOptionsForProvince()}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              fullWidth
              label="City"
              value={city}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.city && (
                <span className="invalid-feedback">{isError.city}</span>
              )}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="postalCode"
              fullWidth
              label="Postal-Code"
              value={postalCode}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.postalCode && (
                <span className="invalid-feedback">{isError.postalCode}</span>
              )}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="address"
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => handleFormControlChangeEvent(e)}
            />
            <span className={classes.controlInvalid}>
              {isError.address && (
                <span className="invalid-feedback">{isError.address}</span>
              )}
            </span>
          </Grid>
        </Grid>

        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
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

export default Shipping;
