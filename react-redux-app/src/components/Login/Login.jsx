import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/authActions";

import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    userName: undefined,
    password: undefined,
  });

  useEffect(() => {}, []);

  const handleFormControlChangeEvent = (event) => {
    if (event.target.name === "userName") {
      setUserName(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          userName: "User Name Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          userName: "",
        });
      }
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      if (event.target.value === "") {
        setIsError({
          ...isError,
          password: "Password Is Required!",
        });
      } else {
        setIsError({
          ...isError,
          password: "",
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

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (formValid(isError)) {
    } else {
      console.log("Form is invalid!");
      if (userName === "")
        setIsError({
          ...isError,
          userName: "User Name Is Required!",
        });
      if (password === "")
        setIsError({
          ...isError,
          password: "Password Is Required!",
        });
      return;
    }

    console.log("Login data Submitted!");

    var loginModel = {
      userName: userName,
      password: password,
    };

    // api call
    AuthService.login(loginModel)
      .then((response) => {
        console.log(response.data);
        let apiResponse = {
          userName: response.data.userName,
          role: response.data.myRole, // "admin-role",
          token: response.data.token, // "admin-token",
        };
        // store current user @ redux store
        dispatch(setCurrentUser(apiResponse));

        // store current user @ browser local storage
        localStorage.setItem("currentUser", JSON.stringify(apiResponse));

        // navigate to home page
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      }); 
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Login</h1>

        <form noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="userName"
                fullWidth
                label="User Name"
                value={userName}
                onChange={(e) => handleFormControlChangeEvent(e)}
              />
              <span className={classes.controlInvalid}>
                {isError.userName && (
                  <span className="invalid-feedback">{isError.userName}</span>
                )}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => handleFormControlChangeEvent(e)}
              />
              <span className={classes.controlInvalid}>
                {isError.password && (
                  <span className="invalid-feedback">{isError.password}</span>
                )}
              </span>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/home">
              Cancel
            </Button>
            <Button
              onClick={(e) => handleSubmit(e)}
              type="button"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
