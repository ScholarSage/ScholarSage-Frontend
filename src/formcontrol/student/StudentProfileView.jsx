import React, { useState } from 'react';
import { useEffect } from "react";
import axios from 'axios'; 
import Navbar from '../../content/Navbar';
import Sidenav from '../../content/Sidenav';
import { Divider } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, Button, Stack, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, Grid, Item } from '@mui/material';


const drawerWidth = 240;

function StudentProfileView (){
  
  const [userData, setUserData] = useState("");

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
            <Card variant="outlined" sx={{ p: 2, width: { xs: '100%', sm: 'auto' }, height: 250, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2, backgroundColor: '#D8BFD8'}}>
                <CardMedia component="img" width="100" height="100" alt="Profile" src="profile.jpg" sx={{ width: { xs: '100%', sm: 100 }, borderRadius: 0.6, }} />
                <Stack direction="column" spacing={2} alignItems="center">
    
                  <Typography color="text.primary" fontWeight="medium" fontSize={15}>{userData.name} </Typography>
                  <Typography variant="subtitle1" color="text.secondary">Level 2 undergraduate</Typography>
                </Stack>

                <Stack>
                <Button variant="contained" className="update-btn" sx={{ marginLeft: '500px' }}>Update Profile</Button>
                </Stack>

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
                    <Typography variant="body2" color="secondary">{userData.regNumInput}</Typography>

                  </Grid>

                  <Grid  item xs={12} md={3} sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Academic Year :</strong></Typography>
                    <Typography variant="body2" color="secondary">academic year</Typography>
                  </Grid>

                  <Grid  item xs={12} md={3}sx={{padding: "1em 1em 0em 1em !important"}}>
                    <Typography variant="body1" gutterBottom ><strong>Personality Type :</strong></Typography>
                    <Typography variant="body2" color="secondary">personality type</Typography>
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
