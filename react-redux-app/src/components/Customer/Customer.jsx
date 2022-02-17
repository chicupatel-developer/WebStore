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

const Customer = ({ changeStep }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(
      "Customer Details Submitted! Going to Next Step of Shipping Details!"
    );

    // store customer details to redux store
    // and go to next step
    changeStep();
  };

  return (
    <div>
      <h1>Customer Info Form!</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={Link} variant="outlined" to="/cart">
            Back to Cart
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Customer;
