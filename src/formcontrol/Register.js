import * as React from 'react';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Register() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',overflow: "hidden" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor:
              "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
          }}
        >
          {/* Transparent Color Above the Grid */}
          <div
            xs={false}
            sm={4}
            md={7}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
              pointerEvents: "none", // Prevent the overlay from capturing mouse events
            }}
          />
          {/* Content */}
          <div
            xs={false}
            sm={4}
            md={7}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(152,56,121) 100%)",
              pointerEvents: "none", // Prevent the overlay from capturing mouse events
            }}
          />
          {/* Content */}
          <div
            align="left"
            style={{
              position: "absolute",
              top: "100px",
              left: "50px",
              right: "700px",
              color: "white",
            }}
          >
            <div>
              <img
                src={require("../content/logo.png")}
                alt="My Logo"
                style={{ 
                  width: "300px", 
                  height: "55px",
                  filter: "brightness(0) invert(1)", 
                }}
              />
              {/* Additional content or components can be added here */}
            </div>
    
            <Typography variant="h6"
             align="justify"  style={{
              position: "absolute",
              top: "300px",
              right: '100px', 
              left: "100px", 
            }}>
              ❝ Excited to join ScholarSage? Choose your path - Student or Mentor. Tailor your academic journey or offer guidance. The adventure begins with your selection. Let's get started on your chosen path!  ❞
            </Typography>
          </div>
        </Grid>
 
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute', 
              zIndex: 2, 
            }}
          >
            
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 2 }}>
                Already have an account? <Link to="/" color="primary" style={{ color: '#9837DC' }}>Sign In</Link><br/><br/><br/><br/>
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Register<br/>
              </Typography>
              <Typography variant="title" sx={{ mt: 1, mb: 3 }} style={{color:"gray"}}>
                To begin this journey, tell us what type of account you’d be creating.<br/><br/>
              </Typography>
              <Link to="/stReg" >
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#F3EDFB', '&:hover': { backgroundColor: '#BD90F1' },color: 'black' }}
                startIcon={<Avatar src={<SchoolIcon />} />} 
              >
               <Typography variant="body1" component="span">
               Student
                  <br />
                  <span style={{ color: "#9837DC", textTransform: "none" }}>Register as a Student</span>
                  
                </Typography>
              </Button>
              </Link>
              <Link to="/mtReg" >
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#F3EDFB', '&:hover': { backgroundColor: '#BD90F1' },color: 'black' }}
                startIcon={<Avatar src={<PersonIcon />} />} 
              >
               
                <Typography variant="body1" component="span">
                Mentor
                  <br />
                  <span style={{ color: "#8692A6", textTransform: "none" }}>Register as a Mentor</span>
                </Typography>   
              </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}