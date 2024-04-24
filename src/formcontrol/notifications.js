import React from "react";
import Layout from "../content/NavbarSidenavLayout";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";

//mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
//import TabList from "@mui/lab/TabList";
import Tabs from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Notifications() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      setTimeout(async () => {
        const response = await axios.post(
          "http://localhost:8081/mark-as-seen",
          {
            id: userData._id,
          }
        );
        if (response.data.success) {
          console.log(response.data);
          toast.success(response.data.message);
          setUserData({ ...userData, unseenNotifications: [] }); // Update userData state

          getData();
        } else {
          toast.error(response.data.message);
        }
        dispatch(hideLoading());
      }, 500);
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      setTimeout(async () => {
        const response = await axios.post(
          "http://localhost:8081/delete-all-notifications",
          {
            id: userData._id,
          }
        );
        if (response.data.success) {
          console.log(response.data);

          toast.success(response.data.message);
          getData();
        } else {
          toast.error(response.data.message);
        }
        dispatch(hideLoading());
      }, 500);
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something went wrong");
    }
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <h1 style={{ color: "#42026F" }}>Notifications</h1>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab label="unseen" value="1" />
                <Tab label="seen" value="2" />
              </Tabs>
            </Box>
            {value === "1" && (
              <Button
                onClick={markAllAsSeen}
                variant="contained"
                style={{
                  backgroundColor: "#42026F",
                  borderRadius: 10,
                  width: "20%",
                }}
              >
                Mark all as read
              </Button>
            )}
            {value === "2" && (
              <Button
                onClick={deleteAll}
                variant="contained"
                style={{
                  backgroundColor: "#42026F",
                  borderRadius: 10,
                  width: "20%",
                }}
              >
                Delete all
              </Button>
            )}
          </Box>
          <TabPanel value="1">
            {userData?.unseenNotifications?.map((notification, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 5,
                  display: "block",
                  textAlign: "left",

                  backgroundColor: "#F3EDFB",
                  padding: 10,
                  borderRadius: 5,
                }}
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="2">
            {userData?.seenNotifications?.map((notification, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 5,
                  display: "block",
                  textAlign: "left",

                  backgroundColor: "#F3EDFB",
                  padding: 10,
                  borderRadius: 5,
                }}
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </div>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export default Notifications;
