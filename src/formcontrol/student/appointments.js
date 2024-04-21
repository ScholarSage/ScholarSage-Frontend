import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";

import Layout from "../../content/NavbarSidenavLayout";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Typography, MenuItem, Select, Button } from "@mui/material";
import { darken, lighten, styled } from "@mui/material/styles";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .super-app-theme--Pending": {
    backgroundColor: getBackgroundColor(
      theme.palette.info.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode
        ),
      },
    },
  },
  "& .super-app-theme--Accepted": {
    backgroundColor: getBackgroundColor(
      theme.palette.success.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode
        ),
      },
    },
  },
  "& .super-app-theme--PartiallyFilled": {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
      },
    },
  },
  "& .super-app-theme--Rejected": {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
    },
  },
}));

function MentorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  //const [time, setTime] = useState();
  const dispatch = useDispatch();

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
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentsData = async (scnumber) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/get-appointments-student",
        {
          scnumber,
        }
      );
      console.log(response.data);
      const appointmentsWithId = response.data.appointments.map(
        (appointment) => ({
          ...appointment,
          id: appointment._id,
        })
      );
      setAppointments(appointmentsWithId);
      console.log(appointmentsWithId);
    } catch (error) {
      console.log(error);
    }
  };

  // const changeAppointmentStatus = async (record, status) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/change-appointment-status",

  //       {
  //         appointmentId: record._id,
  //         status: status,
  //       }
  //     );

  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       getAppointmentsData();
  //     }
  //   } catch (error) {
  //     toast.error("error changing appointment status1");
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData();
      if (userData) {
        getAppointmentsData(userData.scnumber);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 style={{ color: "#42026F" }}>Meeting Appointments</h1>

      <Box
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#42026F",
            color: "#F3EDFB",
          },
        }}
      >
        <StyledDataGrid
          rows={appointments}
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
          columns={[
            {
              field: "mentorid",
              headerName: "Mentor ID",
              flex: 1,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "date",
              headerName: "Date",
              flex: 1,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "time",
              headerName: "Time",
              flex: 1,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "status",
              headerName: "Status",
              flex: 1,
              headerClassName: "super-app-theme--header",
            },
            // {
            //   field: "status",
            //   headerName: "Status",
            //   flex: 1,
            //   renderCell: (params) => {
            //     return (
            //       <Select
            //         value={params.row.status}
            //         onChange={(event) => {
            //           changeAppointmentStatus(params.row, event.target.value);
            //         }}
            //       >
            //         <MenuItem value="Pending">Pending</MenuItem>
            //         <MenuItem value="Accepted">Accepted</MenuItem>
            //         <MenuItem value="Rejected">Rejected</MenuItem>
            //       </Select>
            //     );
            //   },
            // },
            // {
            //   field: "status",
            //   headerName: "Status",
            //   width: 100,
            //   type: "singleSelect",
            //   valueOptions: ["Pending", "Accepted", "Rejected"],
            //   editable: true,
            // },
          ]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pagination
          pageSizeOptions={[10, 20, 30]}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Layout>
  );
}

export default MentorAppointments;
