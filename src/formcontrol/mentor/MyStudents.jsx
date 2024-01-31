import React from 'react'
import { Box } from '@mui/material'
import MentorNavbar from '../../content/MentorNavbar';
import MentorSidenav from '../../content/MentorSidenav';

const drawerWidth = 240;

export default function MyStudents() {
  return (
    <>
        <div style={{minHeight: '100vh',background: '#ECEFF1',background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)'}}>
        
        <MentorNavbar/>
        <Box height={20}/>
            <Box sx={{ display: 'flex' }}>
                <MentorSidenav/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <h1>My Students</h1>
                </Box>
            </Box>
        </div>
        </>
  )
}
