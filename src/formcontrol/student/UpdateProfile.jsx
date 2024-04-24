import React, { useState, useRef , useEffect} from "react";
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
  const [address, setAddressInput] = useState(null);
  const [contactNo, setContactNoInput] = useState(null);
  const [degreeProgram, setDegreeProgramInput] = useState(null);
  const [academicLevel, setAcademicLevelInput] = useState(null);
  const [year, setYearInput] = useState(null);
  const [department, setDepartmentInput] = useState(null);
  const [faculty, setFacultyInput] = useState(null);
  const [currentPassword,setCurrentPassword] = useState(null);
  const [newPassword,setNewPassword] = useState(null);
  const [confirmNewPassword,setConfirmNewPassword] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
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

  const saveData=async()=>{
    const response = await axios.post(`http://localhost:8081/update-profile/${userData1._id}`,{
      address,
      contactNo,
      degreeProgram,
      academicLevel,
      year,
      department,
      faculty,
      currentPassword,
      newPassword,
      confirmNewPassword,
      image: imageBase64,
    });
    if(response.data.status=="ok"){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  }

  const getData=async()=>{
    try {
      const response = await axios.post(
        "http://localhost:8081/userData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setUserData1(response.data.data);
      setContactNoInput(response.data.data.contactNumber);
      setAddressInput(response.data.data.address);
      setDegreeProgramInput(response.data.data.degreeProgram);
      setAcademicLevelInput(response.data.data.academicLevel);
      setYearInput(response.data.data.year);
      setDepartmentInput(response.data.data.department);
      setFacultyInput(response.data.data.faculty);
      setImageBase64(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // empty dependency array means useEffect runs once after the initial render

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

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8081/userData",
        userData1,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(userData1);
      console.log(response.data);
      // Optionally, handle success response or display a message
    } catch (error) {
      console.log(error);
      // Handle errors, such as displaying an error message
    }
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "address":
        setAddressInput(value);
        break;
      case "contactNo":
        setContactNoInput(value);
        break;
      case "degreeProgram":
        setDegreeProgramInput(value);
        break;
      case "academicLevel":
        setAcademicLevelInput(value);
        break;
      case "year":
        setYearInput(value);
        break;
      case "department":
        setDepartmentInput(value);
        break;
      case "faculty":
        setFacultyInput(value);
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
                    <h3>Personal Details</h3>
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
                id="Address"
                label="Address"
                placeholder="Address"
                multiline
                variant="outlined"
                value={address}
                onChange={(e) => handleChange("address", e.target.value)}
                onBlur={userData1.address && userData1.address.length > 0 ? () => 
                  { if (address.length === 0) 
                    { setAddressInput(userData1.address); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.address && userData1.address.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="ContactNo"
                label="Contact No:"
                placeholder="07XXXXXXXX"
                variant="outlined"
                value={contactNo}
                onChange={(e) => handleChange("contactNo", e.target.value)}
                onBlur={userData1.contactNumber && userData1.contactNumber.length > 0 ? () => 
                  { if (contactNo.length === 0) 
                    { setContactNoInput(userData1.contactNumber); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.contactNumber && userData1.contactNumber.length > 0 }}
              />
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
                value={degreeProgram}
                onChange={(e) => handleChange("degreeProgram", e.target.value)}
                onBlur={userData1.degreeProgram && userData1.degreeProgram.length > 0 ? () => 
                  { if (degreeProgram.length === 0) 
                    { setDegreeProgramInput(userData1.degreeProgram); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.degreeProgram && userData1.degreeProgram.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="AcademicLevel"
                label="AcademicLevel"
                placeholder="Academic Level"
                variant="outlined"
                value={academicLevel}
                onChange={(e) => handleChange("academicLevel", e.target.value)}
                onBlur={userData1.academicLevel && userData1.academicLevel.length > 0 ? () => 
                  { if (academicLevel.length === 0) 
                    { setAcademicLevelInput(userData1.academicLevel); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.academicLevel && userData1.academicLevel.length > 0 }}
              />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="Year"
                label="Year"
                placeholder="Year"
                variant="outlined"
                value={year}
                onChange={(e) => handleChange("year", e.target.value)}
                onBlur={userData1.year && userData1.year.length > 0 ? () => 
                  { if (year.length === 0) 
                    { setYearInput(userData1.year); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.year && userData1.year.length > 0 }}
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
                select
                id="Faculty"
                label="Faculty"
                placeholder="Faculty"
                variant="outlined"
                value={faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                onBlur={userData1.faculty && userData1.faculty.length > 0 ? () => 
                  { if (faculty.length === 0) 
                    { setFacultyInput(userData1.faculty); } 
                  } 
                  : undefined
                }
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: userData1.faculty && userData1.faculty.length > 0 }}
                >
                  <MenuItem value="">Select Faculty</MenuItem>
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
                    onChange={(e) =>
                      handleChange("currentPassword", e.target.value)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
