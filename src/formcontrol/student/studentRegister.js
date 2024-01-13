import * as React from "react";

//mui imports
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

//import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

//icons
//import AccountCircle from "@mui/icons-material/AccountCircle";

// const Root = styled("div")(({ theme }) => ({
//   width: "100%",
//   ...theme.typography.body2,
//   color: theme.palette.text.secondary,
//   "& > :not(style) ~ :not(style)": {
//     marginTop: theme.spacing(2),
//   },
// }));

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isRegNum = (regNum) => /^[A-Z]{2}\/\d{4}\/\d+$/i.test(regNum);

//asd

export default function Signup() {
  // new
  //first time password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Confirm password
  // const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  //inputs
  const [firstNameInput, setFirstNameInput] = React.useState();
  const [lastNameInput, setLastNameInput] = React.useState();
  const [emailInput, setEmailInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState();
  const [regNumInput, setRegNumInput] = React.useState();

  //input validation

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);

    if (firstNameError || !firstNameInput) {
      setFormValid("First name should be 1 to 15 characters ");
      return;
    }
    if (lastNameError || !lastNameInput) {
      setFormValid("Last name should be 1 to 15 characters ");
      return;
    }
    if (regNumError || !regNumInput) {
      setFormValid(
        "Please enter a valid Register Number!\nIt should be in the format SC/2020/1176"
      );
      return;
    }
    if (emailError || !emailInput) {
      setFormValid("Please enter a valid Email");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Please enter a strong password");
      return;
    }
    if (passwordInput !== confirmPasswordInput) {
      setFormValid("Paswords do not match");
      return;
    }

    setFormValid(null);
    setSuccess("Registered Successfuly");

    console.log("First Name : " + firstNameInput);
    console.log("Last Name : " + lastNameInput);
    console.log("Email : " + emailInput);
    console.log("Registration Number : " + regNumInput);
    console.log("Password : " + passwordInput);
    console.log("confirmPassword : " + confirmPasswordInput);
  };

  //input errors

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [regNumError, setRegNumError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  //const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  //validation for onBlur Email

  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  //validation for onBlur firstname

  const handleFirstName = () => {
    if (!firstNameInput || firstNameInput.length > 15) {
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);
  };

  //validation for onBlur lastname

  const handleLastName = () => {
    if (!lastNameInput || lastNameInput.length > 15) {
      setLastNameError(true);
      return;
    }
    setLastNameError(false);
  };

  //validation for onBlur lastname

  const handleRegNum = () => {
    if (!isRegNum(regNumInput) || regNumInput.length !== 13) {
      setRegNumError(true);
      return;
    }
    setRegNumError(false);
  };

  //validation for onBlur password
  const handlePassword = () => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

    if (
      !passwordInput ||
      passwordInput.length < 8 ||
      !passwordRegex.test(passwordInput)
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  //form validity
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p align="left">
              <Typography component="h5" variant="h6" color="#580990">
                <ArrowBackIosIcon alignItem="left" />
                Back{" "}
              </Typography>
            </p>

            <p>
              <h3 color="red">Register as a Student!</h3>

              <Typography component="h5" variant="h6" color="#580990">
                Please enter following details{" "}
              </Typography>
            </p>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* First name */}
              <TextField
                margin="normal"
                required
                fullWidth
                error={firstNameError}
                label="First Name"
                value={firstNameInput}
                onBlur={handleFirstName}
                onChange={(event) => setFirstNameInput(event.target.value)}
                variant="outlined"
                size="small"
                autoComplete="firstName"
                autoFocus
                style={{ backgroundColor: "#F3EDFB" }}
              />
              {/* Last name */}
              <TextField
                margin="normal"
                required
                fullWidth
                error={lastNameError}
                label="Last Name"
                value={lastNameInput}
                onBlur={handleLastName}
                onChange={(event) => setLastNameInput(event.target.value)}
                variant="outlined"
                size="small"
                autoComplete="lastName"
                style={{ backgroundColor: "#F3EDFB" }}
              />

              {/* email */}

              <TextField
                margin="normal"
                required
                fullWidth
                error={emailError}
                label="Email Address"
                value={emailInput}
                onBlur={handleEmail}
                onChange={(event) => setEmailInput(event.target.value)}
                variant="outlined"
                size="small"
                autoComplete="email"
                style={{ backgroundColor: "#F3EDFB" }}
              />
              <p>
                {/* Registration number */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={regNumError}
                  label="Registration number"
                  value={regNumInput}
                  onBlur={handleRegNum}
                  onChange={(event) => setRegNumInput(event.target.value)}
                  variant="outlined"
                  size="small"
                  autoComplete="regNum"
                  style={{ backgroundColor: "#F3EDFB" }}
                />
              </p>
              {/* password - first time */}
              <p>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="password">Create Password</InputLabel>
                  <OutlinedInput
                    margin="normal"
                    required
                    fullWidth
                    style={{ backgroundColor: "#F3EDFB" }}
                    name="password"
                    label="Create Password"
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onBlur={handlePassword}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </p>
              {/* confirm password */}
              <p>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <OutlinedInput
                    margin="normal"
                    required
                    fullWidth
                    style={{ backgroundColor: "#F3EDFB" }}
                    name="password"
                    label="Confirm Password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    error={passwordError}
                    type={showPassword ? "text" : "password"}
                    value={confirmPasswordInput}
                    onBlur={handlePassword}
                    onChange={(event) =>
                      setConfirmPasswordInput(event.target.value)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </p>
              <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>

              <p>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ backgroundColor: "#42026F", borderRadius: 10 }}
                  fullWidth
                >
                  Register
                </Button>
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
