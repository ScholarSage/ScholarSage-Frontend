import React, { useEffect, useState } from "react";
//import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Typography } from "antd";
import Layout from "../../content/NavbarSidenavLayout";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper, Grid, Button, Box } from "@mui/material";
import { TextField } from "@mui/material";

function BookAppointment() {
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [MentorData, setMentorData] = useState("");
  const [date, setDate] = useState(dayjs(null));
  const [time, setTime] = useState(dayjs(null));

  const params = useParams();

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

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      const response = await axios.post(
        "/book-appointment",
        {
          scnumber: userData.scnumber,
          mentorid: MentorData.mentorid,
          mentorInfo: MentorData,
          studentInfo: userData,

          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        setUserData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post("/check-booking-availability", {
        mentorid: MentorData.mentorid,
        date: date,
        time: time,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
        console.log("OKOK");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div sx={{ height: "100vh" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DesktopTimePicker", "DesktopDatePicker"]}
          >
            <Grid container component="main" sx={{ height: "100vh" }}>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div sx={{ margin: "50" }}>
                  <Typography
                    component="h2"
                    variant="h2"
                    style={{ color: "#42026F" }}
                  >
                    Book Appointment
                  </Typography>
                  <Typography
                    component="h5"
                    variant="h6"
                    style={{ color: "#42026F" }}
                  >
                    Choose your appointment date and time!
                  </Typography>
                  <Box mt={7} mb={4}>
                    <DemoItem>
                    <DesktopDatePicker
  value={date}
  onChange={(newValue) => {
    setDate(newValue);
  }}
  renderInput={(params) => <TextField {...params} />}
  inputFormat="DD-MM-YYYY"
/>
                    </DemoItem>
                  </Box>

                  <DemoItem>
                  <DesktopTimePicker
  value={time}
  onChange={(newValues) => {
    setTime(newValues);
  }}
  renderInput={(params) => <TextField {...params} />}
/>
                  </DemoItem>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    mt={4}
                    mb={7}
                  >
                    {!isAvailable && (
                      <Button
                        onClick={checkAvailability}
                        variant="contained"
                        style={{
                          backgroundColor: "#42026F",
                          borderRadius: 10,
                          marginTop: "10px",
                        }}
                        fullWidth
                      >
                        Check availability
                      </Button>
                    )}

                    {isAvailable && (
                      <Button
                        onClick={bookNow}
                        variant="contained"
                        style={{
                          backgroundColor: "#42026F",
                          borderRadius: 10,
                          marginTop: "10px",
                        }}
                        fullWidth
                      >
                        Book now
                      </Button>
                    )}
                  </Box>
                </div>
                <Typography
                  component="h5"
                  variant="h6"
                  sx={{ width: "80%" }}
                  style={{ color: "#42026F" }}
                >
                  Pick a date and time for your appointment. Check availability
                  and confirm by clicking "Book Now".
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} md={7}>
                <div xs={false} sm={4} md={7}>
                  <img
                    src={require("../../content/booking.jpg")}
                    style={{
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100vh",

                      pointerEvents: "none",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Layout>
  );
}

export default BookAppointment;
