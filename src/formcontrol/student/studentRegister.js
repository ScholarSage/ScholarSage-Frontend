import * as React from "react";
import { Link } from "react-router-dom";

//mui imports
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Alert,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
//

const defaultTheme = createTheme();

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isRegNum = (regNum) => /^[A-Z]{2}\/\d{4}\/\d+$/i.test(regNum);


// .
// .
// .
// .
// Function
//     ||
// .   ||
// . \    /
// .  \  /
//     \/

export default function StudentSignup() {
  //

  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
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
    toast.success("Registration successful!");

    // console.log("First Name : " + firstNameInput);
    // console.log("Last Name : " + lastNameInput);
    // console.log("Email : " + emailInput);
    //console.log("Registration Number : " + regNumInput);
    //console.log("Password : " + passwordInput);
    //console.log("confirmPassword : " + confirmPasswordInput);

    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://localhost:8081/StudentRegister",
        {
          fname: firstNameInput,
          lname: lastNameInput,
          email: emailInput,
          scnumber: regNumInput,
          password: passwordInput,
          confirmpassword: confirmPasswordInput,
          usertype: "Student",
        }
      );
      dispatch(hideLoading());

      if (response.data.error === "Email Already Used") {
        toast.error("Email Already Used, Please try another one");
      } else if (response.data.error === "Student Number Already Used") {
        toast.error("Student Number Already Used, You already have an account");
      } else {
        if (response.data.status === "ok") {
          toast.success("Registration successful!");
          window.location.href = "./";
        }
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error("Something went wrong!");
      dispatch(hideLoading());
    }
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
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
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
            backgroundColor:
              "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
          }}
        >
          {/* Transparent Color Above the Grid */}
          <div
            xs={false}
            sm={4}
            md={7}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
              pointerEvents: "none", // Prevent the overlay from capturing mouse events
            }}
          />
          {/* Content */}
          <div
            xs={false}
            sm={4}
            md={7}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
              pointerEvents: "none", // Prevent the overlay from capturing mouse events
            }}
          />
          {/* Content */}
          <div
            align="left"
            style={{
              position: "absolute",
              top: "100px",
              left: "50px",
              right: "700px",
              color: "white",
            }}
          >
            <div>
              <img
                src={require("../../content/logo.png")}
                alt="My Logo"
                style={{
                  width: "300px",
                  height: "55px",
                  filter: "brightness(0) invert(1)",
                }}
              />
              {/* Additional content or components can be added here */}
            </div>

            <Typography
              variant="h6"
              align="justify"
              style={{
                position: "absolute",
                top: "300px",
                right: "100px",
                left: "100px",
              }}
            >
              ❝ Unlock a world of support! Fill in your details to access
              personalized mentorship, stress relief, and academic guidance.
              Connect with mentors, shape study plans, and enhance your skills
              effortlessly. Your academic success starts with
              ScholarSage—register now! ❞
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Back button */}
            <Link
              to="/Reg"
              style={{ textDecoration: "none", alignSelf: "flex-start" }}
            >
              <Typography
                component="span"
                variant="body2"
                color="#580990"
                style={{ cursor: "pointer" }}
              >
                &lt; Back
              </Typography>
            </Link>

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
