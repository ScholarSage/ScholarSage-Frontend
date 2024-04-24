import React, { useState,useEffect } from 'react'
import { Button,Grid,Typography,Box,Avatar,TextField } from '@mui/material'
import Layout from '../../content/NavbarSidenavLayout';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import { useParams } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ClearIcon from '@mui/icons-material/Clear';


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



export default function MentorDetails() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [userData,setUserData] = useState("");
  const [MentorData,setMentorData] = useState("");
  const  mentorid  = useParams();


const MentorGetForAdmin = async (mentorID) => {
  console.log(mentorID);
  
  try {
    const response = await axios.post("http://localhost:8081/MentorGetForAdmin/",
      mentorID
    );
    console.log(response.data);
    if(response.data.status=="ok"){
      setMentorData(response.data.data);
    }else if(response.data.status=="Mentor Not Found"){
      toast.error("Mentor Not Found");
    }else{
      toast.error("Somthing Went Wrong");
    }

  } catch (error) {
    console.error(error);
  }
};

const ApproveMentor = async (id) =>{
  const status = "ok";
  try {
    const response = await axios.put(`http://localhost:8081/Approve-Mentor/${id}/${status}`);
    toast.success(response.data.message);
    navigate("/Mentor-Requests");
  } catch (error) {
    toast.error("Something Went Wrong");
    console.error(error);
  }
}

const RejectMentor = async (id) =>{
  const status = "reject";
  try {
    const response = await axios.put(`http://localhost:8081/Approve-Mentor/${id}/${status}`);
    toast.success(response.data.message);
    navigate("/Mentor-Requests");
  } catch (error) {
    toast.error("Something Went Wrong");
    console.error(error);
  }
}

useEffect(() => {
    MentorGetForAdmin(mentorid);
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
                    {MentorData.image ? (
                  <img src={`data:image/png;base64,${MentorData.image}`} alt="Profile Picture" style={{ width: '100%', height: '100%' }} />
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
                  Name : {MentorData.fname} {MentorData.lname}
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
                  Designation :
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
                  Email : {MentorData.email}
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
                  Department :
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
                  Internal TP No : {MentorData.mentorid}
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
                  Mobile No :
                </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '3rem' }}>
          <Grid item lg={4} xs={12} sx={{
            display:'flex',
            justifyContent:'flex-end',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }} >
            <Button
              variant="contained"
              onClick={() => navigate("/book-appointment")}
              sx={{
                background:'#60008a',
                pl:10,
                pr:10,
                borderRadius:3,
                width:250,
              }}
            >
              LinkedIn <LinkedInIcon/>
            </Button>
          </Grid>
          <Grid item lg={4} xs={12} sx={{display:'flex',
            justifyContent:'flex-start',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} >
            <Button
              variant="contained"
              onClick={() => ApproveMentor(MentorData._id)}
              sx={{
                background:'green',
                pl:10,
                pr:10,
                borderRadius:3,
                width:250,
              }}
            >
              Accept <ThumbUpAltIcon/>
            </Button>
          </Grid>
          <Grid item lg={4} xs={12} sx={{display:'flex',
            justifyContent:'flex-start',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} >
          <Button
                      variant="contained"
                      onClick={() => RejectMentor(MentorData._id)}
                      sx={{
                        background:'red',
                        pl:10,
                        pr:10,
                        borderRadius:3,
                        width:250,
                      }}
                    >
                    Reject <ClearIcon/>
           </Button>
           </Grid>
        </Grid>
        </Box>
    </Layout>
  )
}
