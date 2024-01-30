import * as React from "react";
import { Link } from "react-router-dom";

//mui imports
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import axios from "axios";

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

export default function Signup() {
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
      setFormValid("Please enter a strong password");
      return;
    }
    setFormValid(null);
    setSuccess("Form Submited Successfuly");

    //How the output be
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);
    //console.log("Remember user : " + rememberMe);

    try {
      axios
        .post("http://localhost:8081/login-user", {
          email: emailInput,
          password: passwordInput,
        })
        .then((response) => {
          console.log(response.data, "userRegister");
          if (response.data.status === "ok") {
            alert("Login successful");
            window.localStorage.setItem("token", response.data.data);
            window.localStorage.setItem("loggedIn", true);
            if (response.data.UT === "Student") {
              window.localStorage.setItem("User", "Student");
              window.location.href = "./Student-Dashboard";
            } else {
              window.localStorage.setItem("User", "Mentor");
              window.location.href = "./Mentor-Dashboard";
            }
          } else {
            alert("Invalid Email or Password");
          }
        });

      // if (response.data.status === "ok") {
      // alert("Registered successfully");
      // window.location.href = "./";
      // }
    } catch (error) {
      console.error(error.response.data);
      alert("Invalid logging!");
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
                }}
              />
            </div>

            <Typography
              xs={false}
              variant="h6"
              align="justify"
              style={{
                position: "absolute",
                top: "300px",
                right: "100px",
                left: "100px",
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
                <Button //add button
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
