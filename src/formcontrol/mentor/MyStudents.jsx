import { React, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Layout from "../../content/NavbarSidenavLayout";

import axios from "axios";

export default function MyStudents() {
  const [userData, setUserData] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

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

  const studentListGet = async (mentorID) => {
    try {
      const response = await axios.post("http://localhost:8081/studentList", {
        mentorID: mentorID,
      });
      console.log(response.data);
      setStudents(response.data.students);
      console.log(students);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData(); // Wait for userData to be set
      if (userData) {
        studentListGet(userData._id);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "", // Change header background color
            borderBottom: "",
            color: "",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "", // Change row background color
            color: "",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "", // Change hover color of rows
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "", // Change footer background color
            color: "", // Change footer font color
          },
          "& .MuiDataGrid-footerContainer .MuiTypography-root": {
            // Change font color of footer text
            color: "",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 60, // Set the height of the title bar
            backgroundColor: '#720dba', // Change title bar background color
            color: 'white',
            paddingLeft: 2,
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">My Students</Typography>
        </Box>
        <DataGrid
          rows={students.map((student) => ({ ...student, id: student._id }))}
          columns={[
            { field: "fname", headerName: "First Name", flex: 1 },
            { field: "lname", headerName: "Last Name", flex: 1 },
            { field: "email", headerName: "Email", flex: 1 },
            { field: "scnumber", headerName: "Student ID", flex: 1 },
            // Add more columns as needed
          ]}
          onRowClick={(params) => {
            navigate(`/StudentDetails/${params.row.scnumber}`);
          }}
          sx={{
            height: 500,
          }}
        />
      </Box>
    </Layout>
  );
}
