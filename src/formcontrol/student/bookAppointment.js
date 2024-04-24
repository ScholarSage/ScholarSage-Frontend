import React, { useEffect, useState } from "react";
//import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Row, Col, DatePicker, TimePicker, Typography } from "antd";

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

function BookAppointment() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  window.localStorage.setItem("User", "Student");

  const params = useParams();

  const getMentorData = async () => {
    try {
      // const response=await axios.get()
    } catch (error) {
      console.log(error);
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      const response = await axios.post(
        "/book-appointment",
        {
          scnumber: "SC/2020/11111",
          mentorid: "SC/2020/11276",
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
        mentorid: params.mentorid,
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

  useEffect(() => {
    getMentorData();
  }, []);

  return (
    <div sx={{ height: "100vh" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DesktopTimePicker", "DesktopDatePicker"]}>
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
                      defaultValue={dayjs()}
                      onChange={(value) => {
                        setIsAvailable(false);
                        setDate(moment(value).format("DD-MM-YYYY"));
                      }}
                    />
                  </DemoItem>
                </Box>

                <DemoItem>
                  <DesktopTimePicker
                    onChange={(value) => {
                      setIsAvailable(false);
                      setTime(moment(value).format("HH:mm"));
                    }}
                    defaultValue={dayjs()}
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
  );
}

export default BookAppointment;
