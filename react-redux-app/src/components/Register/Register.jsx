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

import { getRoles } from "../../services/localService";

import validator from "validator";

import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/Cancel";

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Shopper");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState({
    userName: undefined,
    password: undefined,
    email: undefined,
  });

  const [modelErrors, setModelErrors] = useState([]);

  useEffect(() => {
    setRoles(getRoles());

    return () => {};
  }, []);

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
    }
  };

  const onRoleChange = (e) => {
    setSelectedRole(e.target.value);
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

  const resetForm = () => {
    setModelErrors([]);
    setUserName("");
    setPassword("");
    setEmail("");
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
      return;
    }

    console.log("Register data Submitted!");

    var loginModel = {
      userName: userName,
      password: password,
      email: email,
    };

    // api call
    AuthService.register(loginModel, selectedRole)
      .then((response) => {
        let apiResponse = {
          responseCode: response.data.responseCode,
          responseMessage: response.data.responseMessage,
        };
          console.log(apiResponse);
          resetForm();
      })
      .catch((error) => {
        setModelErrors([]);
        // 400-ModelState, 500
        // 400
        if (error.response.status === 400) {
          console.log(error.response.data);
          setModelErrors(handleModelState(error));
        } else {
          // all other than 400 errors from api
          // console.log('500 : Error');
          // console.log(error.response.data.responseMessage);
          var errors = [];
          errors.push(error.response.data.responseMessage);
          setModelErrors(errors);
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

  const renderOptionsForRole = () => {
    return roles.map((dt, i) => {
      return (
        <MenuItem value={dt.name} key={i} name={dt.name}>
          {dt.name}
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="xs">
        <h1>Register</h1>

        <div className={classes.errorList}>
          {modelErrors.length > 0 ? (
            <span style={{ color: "red" }}>{modelErrorList}</span>
          ) : (
            <span></span>
          )}
        </div>

        <form noValidate>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6}>
              Role : &nbsp;&nbsp;
              <Select onChange={(e) => onRoleChange(e)} value={selectedRole}>
                {renderOptionsForRole()}
              </Select>
            </Grid>
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
            <Grid item xs={12} sm={12}>
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
              Register
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;
