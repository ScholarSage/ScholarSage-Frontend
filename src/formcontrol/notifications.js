import React from "react";
import Layout from "../content/NavbarSidenavLayout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

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
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const markAllAsSeen = async () => {
    try {
      const response = await axios.post(
        "api/user/mark-all-notifications-as-seen",
        {
          userId: user.scnumber,
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
            <div onClick={() => markAllAsSeen()}>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                Mark all as read
              </Typography>
            </div>

            {user.unseenNotificatins.map((notification) => (
              <div onClick={() => navigate(notification.onClickPath)}>
                {notification.message}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              Delete all
            </Typography>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export default Notifications;
