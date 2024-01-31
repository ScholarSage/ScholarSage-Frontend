import React, { useState } from 'react';
import { useEffect } from "react";
import axios from 'axios'; 
import Navbar from '../../content/Navbar';
import Sidenav from '../../content/Sidenav';
import { Divider } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, Button, Stack, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, Grid, Item } from '@mui/material';
import backgroundImage from "../../content/dash.PNG";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

function StudentProfileView (){
  
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`http://localhost:8081/userData`);
          console.log('API Response:', response.data);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching student details:', error);
       }
      };
  
      fetchData();
    }, []);


  

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)' }}>
        <Navbar />
        
        <Box sx={{ display: 'flex' }}>
      
          <Sidenav />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Card sx={{ position: "relative", height: 180 }}>
                      <CardMedia
                        component="img"
                        alt="Background Image"
                        height="100%"
                        width="100%" // Use 100% height to cover the entire Card
                        image={backgroundImage}
                        sx={{
                          objectFit: "cover", // Make sure the image covers the entire space
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            color: "#ffffff",
                            mt: "10px",
                            ml: "20px", // Adjust ml for Typography
                          }}
                        >
                          Welcome {userData.fname}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            color: "#ffffff",
                            mt: "60px",
                            ml: "10px", // Adjust ml for Button
                            bgcolor: "#A3CF23 ",
                            "&:hover": { bgcolor: "#0f8544" },
                            borderRadius: "15px",
                          }}
                          onClick={() => {
                            navigate("/update");
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                              color: "#FFFFFF",
                            }}
                          >
                            {" "}
                            View Profile
                          </Typography>
                        </Button>
                      </div>
                    </Card>

            
            <Box
            
            sx={{ flexGrow: 1, p: 3,  width: { xs: '100%', sm: 'auto' },display: 'flex' ,flexDirection: { xs: 'column', sm: 'row' }}}
            >

              <div className="info"> 
               

             
                
                <Divider
                  sx={{
                    height: 2,
                    backgroundColor: '#bdbdbd', 
                    margin: '10px 0', 
                  }}
                />

                <Paper
                sx={{
                  p: 3,
                  margin: 'auto',
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={3}>

                  <Grid  item xs={12} md={3} sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom><strong>First Name :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.fname}</Typography>
                  </Grid>

                  <Grid item xs={12} md={3}sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom><strong>Last Name :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.lname}</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3}sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom><strong>Email :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.email}</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3} sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Mobile No :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.phoneno}</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3}sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Date of Birth :</strong></Typography>
                    <Typography variant="body2" color="secondary">Date of Birth</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3} sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Index Number :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.scnumber}</Typography>

                  </Grid>

                  <Grid  item xs={12} md={3} sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Academic Year :</strong></Typography>
                    <Typography variant="body2" color="secondary">academic year</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3}sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Personality Type :</strong></Typography>
                    <Typography variant="body2" color="secondary">{userData.usertype}</Typography>
                  </Grid>

                </Grid>
              </Paper>
              </div>
              <Box height={30} />
              </Box>
              <Box position="absolute" bottom={0} left={0} right={0} p={2}></Box>
            <Box height={30} />
            <Stack spacing={2} direction="row">
            
              <Button variant="contained">Cancel</Button>
              <Button variant="outlined">Sign Out</Button>
            </Stack>
            
          </Box>
        </Box>
      </div>
    </>

  );
}

export default StudentProfileView;
