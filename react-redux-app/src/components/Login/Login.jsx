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
import {
  setCurrentUser,
  setLoginStatus,
} from "../../redux/actions/authActions";

import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    userName: undefined,
    password: undefined,
  });

  const [modelErrors, setModelErrors] = useState([]);

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {}, [currentUser]);

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

  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      for (let prop in error.response.data) {
        errors.push(error.response.data[prop]);
      }
    } else {
      console.log(modelErrors);
    }
    return errors;
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
        dispatch(setCurrentUser({}));
        dispatch(setCurrentUser(apiResponse));

        // store current user @ browser local storage
        localStorage.setItem("currentUser", JSON.stringify(apiResponse));
        setModelErrors([]);
      })
      .catch((error) => {
        setModelErrors([]);
        if (error.response.status === 400) {
          // 400:401
          if (
            typeof error.response.data.response !== "undefined" &&
            error.response.data.response.responseCode === 401
          ) {
            console.log(error.response.data.response.responseMessage);
            var errors = [];
            errors.push(error.response.data.response.responseMessage);
            setModelErrors(errors);
          } else if (
            typeof error.response.data.response !== "undefined" &&
            error.response.data.response.responseCode === 500
          ) {
            console.log(error.response.data.response.responseMessage);
            var errors = [];
            errors.push(error.response.data.response.responseMessage);
            setModelErrors(errors);
          }
          // 400
          else {
            setModelErrors(handleModelState(error));
          }
        } else {
          console.log("other error...");
        }
      });
  };

  const modelErrorList =
    modelErrors.length > 0 &&
    modelErrors.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: 0 }}>{item}</li>
        </ul>
      );
    }, this);

  return (
    <div className={classes.main}>
      <Container maxWidth="xs">
        <h1>Login</h1>

        <div className={classes.errorList}>
          {modelErrors.length > 0 ? (
            <span style={{ color: "red" }}>{modelErrorList}</span>
          ) : (
            <span></span>
          )}
        </div>

        <form noValidate>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                type="password"
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
            <Button
              onClick={(e) => handleSubmit(e)}
              type="button"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button component={Link} variant="outlined" to="/home">
              Cancel
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
