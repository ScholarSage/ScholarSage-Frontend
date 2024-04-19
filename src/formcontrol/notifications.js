import React from "react";
import Layout from "../content/NavbarSidenavLayout";
import { useDispatch, useSelector } from "react-redux";
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

function Notifications() {
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
      const response = await axios.post(
        "http://localhost:8081/mark-as-seen",
        {id:userData._id},
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        navigate(0);
        // setUserData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/delete-all-notifications",{
          id:userData._id
        },
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        navigate(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
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
          <TabPanel value="1">
            {userData?.unseenNotifications?.map((notification) => (
              <div onClick={() => navigate(notification.onClickPath)}>
                {notification.message}
              </div>
            ))}

            <Button
              onClick={markAllAsSeen}
              variant="contained"
              style={{ backgroundColor: "#42026F", borderRadius: 10 }}
              fullWidth
            >
              Mark all as read
            </Button>
          </TabPanel>
          <TabPanel value="2">
            {userData?.seenNotifications?.map((notification) => (
              <div onClick={() => navigate(notification.onClickPath)}>
                {notification.message}
              </div>
            ))}
            <Button
              onClick={deleteAll}
              variant="contained"
              style={{ backgroundColor: "#42026F", borderRadius: 10 }}
              fullWidth
            >
              Delete all
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export default Notifications;
