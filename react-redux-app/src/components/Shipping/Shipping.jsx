import React from "react";
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

const Shipping = ({ backStep, changeStep }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(
      "Shipping Details Submitted! Going to Next Step of Payment Details!"
    );

    // store shipping details to redux store
    // and go to next step
    changeStep();
  };

  return (
    <div>
      <h1>Shipping Info Form!</h1>
      <form onSubmit={handleSubmit} noValidate>
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
