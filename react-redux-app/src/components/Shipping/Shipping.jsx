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
import { getCountry, getProvinces } from "../../services/localService";

const Shipping = ({ backStep, changeStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("CA");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('Manitoba');

    useEffect(() => {
        setCountries(getCountry());
        setProvinces(getProvinces('CA'));
    return () => {};
  }, []);

  useEffect(() => {
      setProvinces(getProvinces(selectedCountry));
      var firstProvince = provinces[0];
      console.log(firstProvince);
    return () => {};
  }, [selectedCountry]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(
      "Shipping Details Submitted! Going to Next Step of Payment Details!"
    );

    // store shipping details to redux store
    // and go to next step
    changeStep();
  };

  const renderOptionsForProvince = () => {
    return provinces.map((dt, i) => {
      return (
        <MenuItem
          value={dt.name}
          key={i}
          name={dt.name}
        >
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
        <MenuItem          
          value={dt.code}
          key={i}
          name={dt.name}
        >
          {dt.name}
        </MenuItem>
      );
    });
  };
  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  return (
    <div>
      <h1>Shipping Info Form!</h1>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            Country : &nbsp;&nbsp;
            <Select
              onChange={(e) => onCountryChange(e)}
              value={selectedCountry}
            >
              {renderOptionsForCountry()}
            </Select>
            <h3>Selected Country - {selectedCountry}</h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            Province : &nbsp;&nbsp;
            <Select
              onChange={(e) => onProvinceChange(e)}
              value={selectedProvince}
            >
              {renderOptionsForProvince()}
            </Select>
            <h3>Selected Province - {selectedProvince}</h3>
          </Grid>
        </Grid>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
