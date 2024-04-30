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



export default function StudentProfileForMentor() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [userData,setUserData] = useState("");
  const [StudentData,setStudentData] = useState("");
  const  {value1,value2,value3}  = useParams();
  const scnumber = `${value1}/${value2}/${value3}`;


const OneStudentGetForMentor = async (scnumber) => {
  console.log(scnumber);
  
  try {
    const response = await axios.post("http://localhost:8081/OneStudentGetForMentor/",{
      scnumber,
    }
    );
    console.log(response.data);
    if(response.data.status=="ok"){
      setStudentData(response.data.data);
    }else if(response.data.status=="Student Not Found"){
      toast.error("Student Not Found");
    }else{
      toast.error("Somthing Went Wrong");
    }

  } catch (error) {
    console.error(error);
  }
};

// const ApproveMentor = async (id) =>{
//   const status = "ok";
//   try {
//     const response = await axios.put(`http://localhost:8081/Approve-Mentor/${id}/${status}`);
//     toast.success(response.data.message);
//     navigate("/Mentor-Requests");
//   } catch (error) {
//     toast.error("Something Went Wrong");
//     console.error(error);
//   }
// }

// const RejectMentor = async (id) =>{
//   const status = "reject";
//   try {
//     const response = await axios.put(`http://localhost:8081/Approve-Mentor/${id}/${status}`);
//     toast.success(response.data.message);
//     navigate("/Mentor-Requests");
//   } catch (error) {
//     toast.error("Something Went Wrong");
//     console.error(error);
//   }
// }

useEffect(() => {
    OneStudentGetForMentor(scnumber);
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
                    Your Student
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
                    {StudentData.image ? (
                  <img src={`data:image/png;base64,${StudentData.image}`} alt="Profile Picture" style={{ width: '100%', height: '100%' }} />
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
                  Name : {StudentData.fname} {StudentData.lname}
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
                  Registration NO : {StudentData.scnumber}
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
                  Email : {StudentData.email}
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
                  Faculty : {StudentData.faculty}
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
                  Contact : {StudentData.contactNumber}
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
                  GPA : {StudentData.gpa}
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
                  Personality Type : {StudentData.personalitytype}
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
                  Address : {StudentData.address}
                </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '3rem' }}>
          {/* <Grid item lg={4} xs={12} sx={{
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
            //   onClick={() => ApproveMentor(StudentData._id)}
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
                    //   onClick={() => RejectMentor(MentorData._id)}
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
           </Grid> */}
        </Grid>
        </Box>
    </Layout>
  )
}
