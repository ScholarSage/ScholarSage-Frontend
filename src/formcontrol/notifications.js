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

function Notifications() {
  const { user, reloadUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const markAllAsSeen = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/mark-all-notifications-as-seen",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
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
        "http://localhost:8081/delete-all-notifications",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
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
              <Tab label="seen" value="1" />
              <Tab label="unseen" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            {/* <div onClick={() => markAllAsSeen()} sx={{ textAlign: "right" }}>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                Mark all as seen
              </Typography>
            </div> */}

            <Button
              onClick={markAllAsSeen}
              variant="contained"
              style={{ backgroundColor: "#42026F", borderRadius: 10 }}
              fullWidth
            >
              Mark all as read
            </Button>

            {user?.unseenNotificatins.map((notification) => (
              <div onClick={() => navigate(notification.onClickPath)}>
                {notification.message}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="2">
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
