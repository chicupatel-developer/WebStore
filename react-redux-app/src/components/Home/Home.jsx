import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import {
  TextField,
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";


// date picker
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { alpha } from '@material-ui/core/styles';

const Home = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const testCode = () => {
    var today = new Date();

    // back 30 days
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));

    console.log(today);
    console.log(priorDate);
  };
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>

        {testCode()}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="Discount Start Date!"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Container>
    </div>
  );
};

export default Home;
