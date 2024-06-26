import React, { useState,useEffect } from 'react'
import { Button,Grid,Typography,Box,Avatar,TextField } from '@mui/material'
import Layout from '../../content/NavbarSidenavLayout';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';


const drawerWidth = 240;

const BlankAvatar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'grey.500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" color="white">
        No Image
      </Typography>
    </Box>
  );
};



export default function MentorProfileView() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [userData,setUserData] = useState("");

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
    return null;
  }
};

useEffect(() => {
  getData();
}, []);

  return (
    <Layout>
      <Box p={4}>
        <Grid container spacing={2} >
            <Grid item xs={12} lg={12} 
              sx={{display: 'flex',
                  backgroundColor: '',
                  justifyContent: 'center'
              }} >
                <Typography variant='h4' sx={{ textAlign: 'left' }}>
                    Your Mentor
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ backgroundColor: '2rem' }}>
        <Grid item xs={12} lg={12} sx={{display: 'flex',backgroundColor: '',justifyContent: 'center',marginTop: '2rem' }}  >
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #ccc',
                    }}
                  >
                    {userData.image ? (
    <img src={`data:image/png;base64,${userData.image}`} alt="Profile Picture" style={{ width: '100%', height: '100%' }} />
  ) : (
    <BlankAvatar />
  )}
                  </Avatar>
                  <br/><br/>
                    
                </Box>
                </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ backgroundColor: '' }}>
              
              <Grid item xs={12} lg={12}>
            
            <Grid container spacing={2} sx={{ marginTop: '' }}>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Name : {userData.fname} {userData.lname}
                </Typography>
                
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Designation : {userData.designation}
                </Typography>
                
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Email : {userData.email}
                </Typography>
                
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Department : {userData.department}
                </Typography>
                
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Internal TP No : {userData.mentorid}
                </Typography>
                
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography 
                  variant="body1" 
                  sx={{ textAlign: 'center',
                        background:'#deaef2', 
                        p:1,
                        borderRadius:4,
                        fontSize:20 
                        }}
                  >
                  Mobile No :  {userData.mobile}
                </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '3rem' }}>
          <Grid item lg={12} xs={12} sx={{
            display:'flex',
            justifyContent:'flex-end',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }} >
            <Button
              variant="contained"
              onClick={() => navigate("/Mentor-Update-Profile")}
              sx={{
                background:'#60008a',
                pl:10,
                pr:10,
                borderRadius:3,
                width:250,
              }}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
        </Box>
    </Layout>
  )
}
