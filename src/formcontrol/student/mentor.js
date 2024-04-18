import React from 'react'
import { Button,Grid,Typography,Box,Avatar,TextField } from '@mui/material'
import Layout from '../../content/NavbarSidenavLayout';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const BlankAvatar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'grey.500',
      }}
    />
  );
};

export default function Mentor() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  return (
    <Layout>
      <Box p={10}>
        <Grid container spacing={2} sx={{ backgroundColor: '' }}>
              <Grid item xs={12} lg={3} sx={{display: 'flex',backgroundColor: '',justifyContent: 'center'}}>
                
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile Picture" style={{ width: '100%', height: 'auto' }} />
                  ) : (
                    <BlankAvatar />
                  )}
                </Avatar>
                <Typography>
                  Name
                </Typography>
              </Box>
              </Grid>
              <Grid item xs={12} lg={9}>
              <Typography variant='h4' sx={{textAlign:'left'}}>
                  Your Mentor
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: '0rem' }}>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="TextBox 1" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="TextBox 2" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="TextBox 3" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="TextBox 4" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="TextBox 5" variant="outlined" fullWidth />
              </Grid>
            </Grid>
              </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ width: '100%', marginTop: '0rem' }}>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={() => navigate("/book-appointment")}
        >
          Contact
        </Button>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="contained"
          onClick={() => navigate("/book-appointment")}
        >
          Schedule
        </Button>
      </Grid>
    </Grid>
        </Box>
    </Layout>
  )
}
