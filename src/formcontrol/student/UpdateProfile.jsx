import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
  MenuItem,
  Select, 
  InputLabel, 
  FormControl,

} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const drawerWidth = 240;

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function UpdateProfile() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNo: "",
    degreeProgram: "",
    academicLevel: "",
    year: "",
    department: "",
    faculty: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordChangeOption, setPasswordChangeOption] = useState("no");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8081/userData", {
          token: window.localStorage.getItem("token"),
        });

        const data = response.data;
        console.log(data, "userData");
        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // empty dependency array means useEffect runs once after the initial render

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    // Trigger the input field when the button is clicked to change the photo
    inputRef.current.click();
  };

  const handleSaveClick = () => {
    // Display the uploaded image
    if (file) {
      console.log("File uploaded:", file);
      setImagePreview(URL.createObjectURL(file));

      // Reset file state after saving
      setFile(null);
    } else {
      console.log("No new photo selected.");
    }
  };

  const handleChange = (field, value) => {
    setUserData((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <>
        <div style={{minHeight: '100vh',background: '#ECEFF1',background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)'}}>
        <Navbar/>
        <Box height={20}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
			<div>
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="210vh"
          flexDirection="column"
        >
          <Grid container spacing={2} sx={{ width: "70%", mt: "1rem" }}>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <Avatar
                alt="Profile Picture"
                src={imagePreview}
                sx={{ width: 200, height: 200 }}
              />
              <input
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <h3>{userData.fname}</h3>
              <Button
                variant="contained"
                size="large"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#42026F",
                  color: "#fff",
                  padding: "0.5em 1em 0.5em 1em !important",
                }}
                onClick={() => {
                  handleButtonClick();
                  handleSaveClick();
                }}
              >
                {file ? "Update Profile" : "Change Photo"}
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1em 1em 0em 1em !important",
              }}
            ></Grid>
            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <p>
                <Root>
                  <Divider>
                    {" "}
                    <h3>Personal Details</h3>
                  </Divider>
                </Root>
              </p>
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="FirstName"
                label="First Name"
                placeholder="First Name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="LastName"
                label="Last Name"
                placeholder="Last Name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            {/* <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="About"
                label="About"
                placeholder="About"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid> */}

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Email"
                label="E-mail"
                placeholder="E-mail"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Address"
                label="Address"
                placeholder="Address"
                multiline
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="ContactNo"
                label="Contact No:"
                placeholder="07XXXXXXXX"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                select
                id="scnumber"
                label="Registration Number"
                helperText="Enter Registration Number"
                variant="outlined"
                sx={{ width: "100%" }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ width: "70%", mt: "1rem" }}>
            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <p>
                <Root>
                  <Divider>
                    {" "}
                    <h3>Academic Details</h3>
                  </Divider>
                </Root>
              </p>
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="DegreeProgram"
                label="DegreeProgram"
                placeholder="Degree Progree"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="AcademicLevel"
                label="AcademicLevel"
                placeholder="Academic Level"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Year"
                label="Year"
                placeholder="Year"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Department"
                label="Department"
                placeholder="Department"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                select
                id="Faculty"
                label="Faculty"
                placeholder="Faculty"
                variant="outlined"
                value={userData.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                sx={{ width: "100%" }}
                >
                  {['Agriculture', 'Allied Health Science', 'Engineering', 'Fisheries and Marine Sciences & Technology', 'Graduate Studies', 'Humanities and Social Sciences', 'Management & Finance', 'Medicine', 'Science', 'Technology'].map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: "70%", mt: "1rem" }}>
            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <p>
                <Root>
                  <Divider></Divider>
                </Root>
              </p>
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
  <FormControl variant="outlined" sx={{ width: "100%" }}>
    <InputLabel id="passwordChangeOption-label">Change Password?</InputLabel>
    <Select
      labelId="passwordChangeOption-label"
      id="passwordChangeOption"
      label="Change Password?"
      value={passwordChangeOption}
      onChange={(e) => setPasswordChangeOption(e.target.value)}
    >
      <MenuItem value="yes">Yes</MenuItem>
      <MenuItem value="no">No</MenuItem>
    </Select>
  </FormControl>
</Grid>

{passwordChangeOption === "yes" && (
  <>
    {/* Current Password field */}
    <TextField
      required
      type={showCurrentPassword ? "text" : "password"}
      id="CurrentPassword"
      label="Current Password"
      placeholder="Current Password"
      variant="outlined"
      sx={{ width: "100%" }}
      onChange={(e) => handleChange("currentPassword", e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    {/* New Password field */}
    <TextField
      required
      type={showNewPassword ? "text" : "password"}
      id="NewPassword"
      label="New password"
      placeholder="New password"
      variant="outlined"
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    {/* Confirm Password field */}
    <TextField
      required
      type={showConfirmPassword ? "text" : "password"}
      id="ConfirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      variant="outlined"
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </>
)}

          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end", width: "70%" }}
          >
            <Grid item>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#42026F",
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#42026F",
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
                </Box>
            </Box>
        </div>
        </>
  );
}
