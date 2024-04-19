import  { React,useState,useEffect } from 'react'
import Layout from '../../content/NavbarSidenavLayout';
import {Box,Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import '../../../src/Table.css'
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function MentorRequests() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  const MentorRequestsList = async () => {
    try {
      const response = await axios.get("http://localhost:8081/mentor-request-list");
      const mentorsWithId = response.data.data.map((mentor) => ({
        id: mentor._id,
        ...mentor,
      }));
      setMentors(mentorsWithId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    MentorRequestsList();
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
          <Typography variant="h6">Mentor Requests</Typography>
        </Box>
          <DataGrid
            rows={mentors}
            columns={[
              { field: 'fname', headerName: 'First Name', flex: 1 },
              { field: 'lname', headerName: 'Last Name', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'mentorid', headerName: 'TP No', flex: 1 },
              // Add more columns as needed
            ]}
            sx={{
                height:600
              }}
            onRowClick={(params) => {
              navigate(`/MentorDertails/${params.row.mentorid}`);
            }}
          />
        </Box>
    </Layout>
  );
}