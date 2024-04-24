import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Layout from "../../content/NavbarSidenavLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";

const drawerWidth = 240;

const BlankAvatar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "grey.500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" color="white">
        No Image
      </Typography>
    </Box>
  );
};

export default function Mentor() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [userData, setUserData] = useState("");
  const [MentorData, setMentorData] = useState("");

  const getData = async () => {
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
      setUserData(response.data.data);
      return response.data.data; // Return the data for use in studentListGet
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const MentorGet = async (scnumber) => {
    try {
      const response = await axios.post("http://localhost:8081/MentorGet", {
        scnumber: scnumber,
      });
      console.log(response.data);
      if (response.data.status == "ok") {
        setMentorData(response.data.data);
      } else if (response.data.status == "Mentor Not Found") {
        toast.error("Mentor Not Found");
      } else {
        toast.error("Somthing Went Wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData(); // Wait for userData to be set
      if (userData) {
        MentorGet(userData._id);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <Box p={4}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              backgroundColor: "",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "#42026F" }}>Mentor Details </h1>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ backgroundColor: "2rem" }}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              backgroundColor: "",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ccc",
                }}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <BlankAvatar />
                )}
              </Avatar>
              <br />
              <br />
            </Box>
          </Grid>
        </Grid>
        <Box
          fullwidth
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4, // Increased gap value to 4
            width: "100%",

            p: 2,
            borderRadius: 4,
            backgroundColor: "#F3EDFB",
          }}
        >
          <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
            <Grid
              item
              lg={8}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  fontSize: 18,

                  color: "#24003D",
                  lineHeight: 2.5,
                }}
              >
                Name : {MentorData.fname} {MentorData.lname}
                <Divider />
                Designation : {MentorData.designation}
                <Divider />
                Email : {MentorData.email}
                <Divider />
                Department : {MentorData.department}
                <Divider />
                Internal TP No : {MentorData.mentorid}
                <Divider />
                Mobile No : {MentorData.mobile}
                <Divider />
                Available Time : {MentorData.availablefrom} -
                {MentorData.availableto}
              </Typography>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/book-appointment")}
                  sx={{
                    background: "#60008a",
                    pl: 10,
                    pr: 10,
                    borderRadius: 3,
                    width: 250,
                  }}
                >
                  Contact <ChatIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/book-appointment")}
                  sx={{
                    background: "#60008a",
                    pl: 10,
                    pr: 10,
                    borderRadius: 3,
                    width: 250,
                  }}
                >
                  Schedule <CalendarMonthIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/book-appointment")}
                  sx={{
                    background: "#60008a",
                    pl: 10,
                    pr: 10,
                    borderRadius: 3,
                    width: 250,
                  }}
                >
                  LinkedIn <LinkedInIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
