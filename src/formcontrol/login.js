import * as React from "react";
import { Link } from "react-router-dom";

//mui imports
import {
  IconButton,
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Alert,
  Button,
  CssBaseline,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Divider,
  styled,

  // other components...
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const defaultTheme = createTheme();

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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
//
//
//

export default function Signup() {
  const dispatch = useDispatch();

  // Initializing a state variable named 'showPassword' using the useState hook.
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //inputs
  const [emailInput, setEmailInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();
  const [rememberMe, setRememberMe] = React.useState();

  //input errors

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  //form validity
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();

  //input validation

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);

    if (emailError || !emailInput) {
      setFormValid("Please enter a valid Email");
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        "Please enter a strong password. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form Submited Successfuly");

    //How the output be
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);

    try {
      dispatch(showLoading());
      setTimeout(() => {
        axios
          .post("http://localhost:8081/login-user", {
            email: emailInput,
            password: passwordInput,
          })
          .then((response) => {
            console.log(response.data, "userRegister");
            if (
              response.data.status === "ok" &&
              response.data.UT !== "Mentor"
            ) {
              toast.success("Login successful! , Welcome");
              window.localStorage.setItem("token", response.data.data);
              window.localStorage.setItem("loggedIn", true);

              if (response.data.UT === "Student") {
                window.localStorage.setItem("User", "Student");
                window.location.href = "./Student-Dashboard";
              } else {
                window.localStorage.setItem("User", "Admin");
                window.location.href = "./Admin-Dashboard";
              }
            } else if (
              response.data.status === "ok" &&
              response.data.UT === "Mentor"
            ) {
              if (response.data.isApproved === true) {
                window.localStorage.setItem("token", response.data.data);
                window.localStorage.setItem("loggedIn", true);
                window.localStorage.setItem("User", "Mentor");
                window.location.href = "./Mentor-Dashboard";
                toast.success("Login successful! , Welcome");
              } else {
                toast.error("Please wait for your approval");
              }
              dispatch(hideLoading());
            } else {
              toast.error("Invalid Login");
            }
            dispatch(hideLoading());
          });
      }, 2000);
      // if (response.data.status === "ok") {
      // alert("Registered successfully");
      // window.location.href = "./";
      // }
    } catch (error) {
      dispatch(hideLoading());

      console.error(error.response.data);
      toast.error("Something went wrong");
    }
  };

  //validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  //validation for onBlur password
  const handlePassword = () => {
    const passwordRegx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    if (
      !passwordInput ||
      passwordInput.length < 8 ||
      !passwordRegx.test(passwordInput) //conditions
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

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
          //For the responsiveness
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
              "linear-gradient(to bottom, transparent 0%, #9837DC 100%)",
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
              overflow: "hidden",
            }}
          />
          {/* Content */}
          <div
            xs={false}
            sm={4}
            md={7}
            align="left"
            style={{
              position: "absolute",
              top: "100px",
              left: "50px",
              right: "700px",
              color: "white",
              overflow: "hidden",
            }}
          >
            <div>
              <img
                src={require("../content/logo.png")}
                alt="My Logo"
                style={{
                  width: "300px",
                  height: "55px",
                  filter: "brightness(0) invert(1)",
                  overflow: "hidden",
                }}
              />
            </div>

            <Typography
              xs={false}
              variant="h6"
              align="justify"
              style={{
                top: "300px",
                right: "100px",
                left: "100px",
                overflow: "hidden",
              }}
            >
              ❝ Welcome to ScholarSage! Your stress-free study buddy. Connect
              with mentors, make study plans, and boost skills effortlessly.
              It's your go-to for a smooth academic journey. Log in now! ❞
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={require("../content/logo.png")}
                alt="My Logo"
                style={{ width: "300px", height: "55px" }}
              />
              {/* Additional content or components can be added here */}
            </div>

            <Typography component="h5" variant="h6">
              Sign in to your account here!
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                // Styling and configuration for a text input field
                margin="normal" //  margin  to the normal spacing.
                required // input is required mark.
                fullWidth // take up the full width of the container.
                error={emailError} //  If emailError is true, visually indicate an error.
                label="Enter Your Email Address" // label
                value={emailInput} // Binds the value of the input field to the emailInput variable.
                onBlur={handleEmail} // Calls the handleEmail function when the input field loses focus (on blur).
                onChange={(event) => setEmailInput(event.target.value)} // Updates the emailInput state variable with the new value when the input value changes.
                variant="filled" //apply filled variant for the TextField, there are others like "outlined"
                size="small" //Sets the size of the TextField to small.
                autoComplete="email" //Provides a hint to the browser for autofilling the input with an email address.
                autoFocus // Sets the focus on the TextField when the component opened(page).
                style={{ backgroundColor: "#F3EDFB" }} // Applies inline styling to set the background color of the TextField to #F3EDFB.
              />
              <FormControl sx={{ width: "100%" }} variant="filled">
                <InputLabel htmlFor="password">Enter Your Password</InputLabel>
                <FilledInput
                  margin="normal"
                  required
                  fullWidth
                  style={{ backgroundColor: "#F3EDFB" }}
                  name="password"
                  label="Password"
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
              <div align="left">
                <Grid container>
                  <Grid item xs>
                    <p style={{ color: "#42026F" }}>
                      <Checkbox
                        style={{ color: "#42026F" }}
                        onChange={(event) =>
                          setRememberMe(event.target.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      Remember Me
                    </p>
                  </Grid>

                  <Grid item>
                    <Link
                      to="/forgot-password"
                      color="primary"
                      style={{ color: "#9837DC" }}
                    >
                      Forgot Password?
                    </Link>
                  </Grid>
                </Grid>
              </div>
              <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
              <p>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ backgroundColor: "#42026F", borderRadius: 10 }}
                  fullWidth
                >
                  Sign in
                </Button>
              </p>
              <p>
                <Root>
                  <Divider>OR</Divider>
                </Root>
              </p>
              <p align="left"> Don't have an account? </p>
              <p>
                <Link to="/Reg">
                  <Button
                    variant="outlined"
                    style={{
                      color: "#42026F",
                      borderColor: "#42026F",
                      borderRadius: 10,
                      borderWidth: 2,
                    }}
                    fullWidth
                    onClick={() => {
                      dispatch(showLoading());
                      setTimeout(() => {
                        dispatch(hideLoading());
                      }, 500);
                    }}
                  >
                    Register Now
                  </Button>
                </Link>
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
