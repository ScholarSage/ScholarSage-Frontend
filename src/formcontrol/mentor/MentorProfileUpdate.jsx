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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Layout from "../../content/NavbarSidenavLayout";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const drawerWidth = 240;

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function MentorUpdateProfile() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef();
  const [fname, setFNameInput] = useState(null);
  const [department, setDepartmentInput] = useState(null);
  const [lname, setLNameInput] = useState(null);
  const [designation, setDesignationInput] = useState(null);
  const [currentPassword,setCurrentPassword] = useState(null);
  const [newPassword,setNewPassword] = useState(null);
  const [confirmNewPassword,setConfirmNewPassword] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [mobile, setMobileInput] = useState(null);
  const [linkedin,setLinkedInInput] = useState(null);
  const navigate = useNavigate();
  
  // const [userData, setUserData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   address: "",
  //   contactNo: "",
  //   degreeProgram: "",
  //   academicLevel: "",
  //   year: "",
  //   department: "",
  //   faculty: "",
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });
  const [passwordChangeOption, setPasswordChangeOption] = useState("no");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userData1, setUserData1] = useState("");

  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);

  const handleTimeChange1 = (newTime) => {
    setSelectedTime1(newTime);
  };

  const handleTimeChange2 = (newTime) => {
    setSelectedTime2(newTime);
  };


  

  const saveData=async()=>{
    const response = await axios.post(`http://localhost:8081/update-mentor-profile/${userData1._id}`,{
      fname,
      lname,
      mobile,
      designation,
      department,
      linkedin,
      currentPassword,
      newPassword,
      confirmNewPassword,
      image: imageBase64,
      availablefrom: selectedTime1 ? selectedTime1.format("HH:mm") : null,
      availableto: selectedTime2 ? selectedTime2.format("HH:mm") : null,
    });
    if(response.data.status=="ok"){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  }



  const getData=async()=>{
    try {
      const response = await axios.post("http://localhost:8081/userData",{},
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(response.data);
      setUserData1(response.data.data);
      setFNameInput(response.data.data.fname);
      setLNameInput(response.data.data.lname);
      setMobileInput(response.data.data.mobile);
      setDepartmentInput(response.data.data.department);
      setDesignationInput(response.data.data.designation);
      setLinkedInInput(response.data.data.linkedin);
      setImageBase64(response.data.data.image);

      return dayjs(response.data.data.availablefrom, 'HH:mm');
      
         
    } catch (error) {
      console.log(error);
    }
  }

  const getData2=async()=>{
    try {
      const response = await axios.post("http://localhost:8081/userData",{},
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
      return dayjs(response.data.data.availableto, 'HH:mm');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const time1 = await getData();
      const time2 = await getData2();
      if (time1) {
        setSelectedTime1(time1);
      }
      if (time2) {
        setSelectedTime2(time2);
      }
    };

    fetchData();
  }, []);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      setFile(selectedFile);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageBase64(btoa(reader.result));
      };
      reader.readAsBinaryString(selectedFile);
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
    switch (field) {
      case "fname":
        setFNameInput(value);
        break;
      case "lname":
        setLNameInput(value);
        break;
      case "department":
        setDepartmentInput(value);
        break;
      case "designation":
        setDesignationInput(value);
        break;
      case "mobile":
        setMobileInput(value);
        break;
        case "linkedin":
          setLinkedInInput(value);
          break;
      case "currentPassword":
          setCurrentPassword(value);
          break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmNewPassword":
        setConfirmNewPassword(value);
        break;
      default:                      
        break;
    }
  };
  return (
    <Layout>
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
              src={imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : imagePreview}
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
              <h3>{userData1.fname}</h3>
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
                {imageBase64 ? "Update Photo" : "Upload Photo"}
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
                <Root>
                  <Divider>
                    {" "}
                    <h3>Update Details </h3>
                  </Divider>
                </Root>
            </Grid>

            {/* <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
            <TextField
              required
              id="FirstName"
              label="First Name"
              placeholder="First Name"
              variant="outlined"
              value={fname}
              onChange={(e) => handleChange("fname", e.target.value)}
              onBlur={() => {
                if (fname.length === 0) {
                  setFNameInput(userData1.fname);
                }
              }}
              sx={{ width: "100%" }}
              InputLabelProps={{ shrink: true }}
            />
            </Grid> */}


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
                id="First Name"
                label="First Name"
                placeholder="First Name"
                variant="outlined"
                value={fname}
                onChange={(e) => handleChange("fname", e.target.value)}
                onBlur={userData1.fname && userData1.fname.length > 0 ? () => 
                  { if (fname.length === 0) 
                    { setFNameInput(userData1.fname); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.fname && userData1.fname.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Last Name"
                label="Last Name"
                placeholder="Last Name"
                variant="outlined"
                value={lname}
                onChange={(e) => handleChange("lname", e.target.value)}
                onBlur={userData1.lname && userData1.lname.length > 0 ? () => 
                  { if (lname.length === 0) 
                    { setLNameInput(userData1.lname); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.lname && userData1.lname.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Mobile"
                label="Mobile:"
                placeholder="07XXXXXXXX"
                variant="outlined"
                value={mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                onBlur={userData1.mobile && userData1.mobile.length > 0 ? () => 
                  { if (mobile.length === 0) 
                    { setMobileInput(userData1.mobile); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.mobile && userData1.mobile.length > 0 }}
              />
            </Grid>

          

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Department"
                label="Department"
                placeholder="Department"
                variant="outlined"
                value={department}
                onChange={(e) => handleChange("department", e.target.value)}
                onBlur={userData1.department && userData1.department.length > 0 ? () => 
                  { if (department.length === 0) 
                    { setDepartmentInput(userData1.department); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.department && userData1.department.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Designation"
                label="Designation"
                placeholder="Designation"
                variant="outlined"
                value={designation}
                onChange={(e) => handleChange("department", e.target.value)}
                onBlur={userData1.designation && userData1.designation.length > 0 ? () => 
                  { if (designation.length === 0) 
                    { setDesignationInput(userData1.designation); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.designation && userData1.designation.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Linkedin"
                label="Linkedin"
                placeholder="Designation"
                variant="outlined"
                value={linkedin}
                onChange={(e) => handleChange("department", e.target.value)}
                onBlur={userData1.linkedin && userData1.linkedin.length > 0 ? () => 
                  { if (linkedin.length === 0) 
                    { setLinkedInInput(userData1.linkedin); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.linkedin && userData1.linkedin.length > 0 }}
              />
            </Grid>

            <Grid container fullWidth>
              
              <Grid item xs={12} lg={6}  elevation={6} square ml={0}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DesktopTimePicker", "DesktopDatePicker"]}>      
                <DemoItem sx={{
                    width:'100%'
                  }}>
                  <DesktopTimePicker
                  label="From"
                  value={selectedTime1}
                  onChange={handleTimeChange1}
                  renderInput={(params) => <TextField {
                    ...params} variant="outlined" 
                    sx={{ backgroundColor: "#F3EDFB" }}/>}
                  defaultValue={dayjs()}
                  />
                </DemoItem>
              </DemoContainer>
              </LocalizationProvider>

              </Grid>

              <Grid item xs={12} lg={6}  elevation={6} ml={0} square>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DesktopTimePicker", "DesktopDatePicker"]}>      
                <DemoItem sx={{
                    width:'100%'
                  }}>
                  <DesktopTimePicker
                  label="To"
                  value={selectedTime2}
                  onChange={handleTimeChange2}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  style={{ backgroundColor: "#F3EDFB" }}
                  defaultValue={dayjs()}
                  />
                </DemoItem>
              </DemoContainer>
              </LocalizationProvider>

              </Grid>

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
      onChange={(e) => handleChange("newPassword", e.target.value)}
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
      onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
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
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  const handleClick = async () => {
                    await saveData();
                    navigate(0);
                  };
                  handleClick();
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
    </Layout>
  );
}

