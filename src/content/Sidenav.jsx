import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import FunctionsIcon from "@mui/icons-material/Functions";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SourceIcon from "@mui/icons-material/Source";
import PersonIcon from "@mui/icons-material/Person";
import MoodIcon from "@mui/icons-material/Mood";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListIcon from "@mui/icons-material/List";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const logout = () => {
  window.localStorage.clear();
  window.location.href = "/";
};

const theme1 = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#F3EDFB", // Set your desired background color here
        },
      },
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const roles = {
  Student: [
    { label: "Dashboard", icon: DashboardIcon, route: "/Student-Dashboard" },
    {
      label: "Personality Test",
      icon: PsychologyAltIcon,
      route: "/Student-Personality-Test",
    },
    {
      label: "GPA Calculator",
      icon: FunctionsIcon,
      route: "/Student-GPA-Calculator",
    },
    { label: "Mentor", icon: PersonIcon, route: "/Student-Mentor" },
    {
      label: "Personality Types",
      icon: MoodIcon,
      route: "/Student-Personality-Types",
    },
    {
      label: "Appointments",
      icon: SelfImprovementIcon,
      route: "/Appointments",
    },
    { label: "Resources", icon: SourceIcon, route: "/Student-Resources" },
  ],
  Mentor: [
    { label: "Dashboard", icon: DashboardIcon, route: "/Mentor-Dashboard" },
    { label: "My Students", icon: GroupIcon, route: "/Mentor-My-Studnets" },
    {
      label: "Personality Types",
      icon: PersonOutlineIcon,
      route: "/Mentor-Personality-Types",
    },
    {
      label: "Appointments",
      icon: PersonOutlineIcon,
      route: "/Mentor/Appointments",
    },
  ],
  Admin: [
    { label: "Dashboard", icon: DashboardIcon, route: "/Admin-Dashboard" },
    {
      label: "Mentor Requests",
      icon: ListIcon,
      route: "/Mentor-Requests",
    },
  ],
};

export default function Sidenav() {
  const theme = useTheme();
  //const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const role = window.localStorage.getItem("User");

  return (
    <ThemeProvider theme={theme1}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box height={30} />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ color: "#24003D" }}>
            {roles[role].map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate(item.route);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#24003D",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <List sx={{ color: "red" }}>
            <ListItem disablePadding sx={{ display: "block" }} onClick={logout}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ height: 30 }} />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
