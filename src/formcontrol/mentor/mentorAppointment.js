import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Layout from "../../content/NavbarSidenavLayout";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

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

  const getAppointmentsData = async (mentorID) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/get-appointments-mentor",
        {
          mentorID,
        }
      );
      console.log(response.data);
      const appointmentsWithId = response.data.appointments.map((appointment) => ({
        ...appointment,
        id: appointment._id,
      }));
      setAppointments(appointmentsWithId);
      console.log(appointmentsWithId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData();
      if (userData) {
        getAppointmentsData(userData.mentorid);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout>
    <Box
    sx={{
      height: "100%",
      width: '100%',
      '& .MuiDataGrid-root': {
        border: 'none',
      },
      '& .MuiDataGrid-cell': {
        borderBottom: 'none',
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '', // Change header background color
        borderBottom: '',
        color:'',
      },
      '& .MuiDataGrid-virtualScroller': {
        backgroundColor: '', // Change row background color
        color:'',
      },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: '', // Change hover color of rows
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: 'none',
        backgroundColor: '', // Change footer background color
        color: '', // Change footer font color
      },
      '& .MuiDataGrid-footerContainer .MuiTypography-root': { // Change font color of footer text
        color: '',
      },
    }}
    >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 60, // Set the height of the title bar
        backgroundColor: '#720dba', // Change title bar background color
        color: 'white', // Change title bar font color
        paddingLeft: 2,
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">My Students</Typography>
    </Box>
    <DataGrid
  rows={appointments}
  columns={[
    { field: 'scnumber', headerName: 'Student ID', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'time', headerName: 'Time', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ]}
  sx={{
    height:500
  }}
/>
    </Box>
</Layout>
  );
}

export default MentorAppointments;