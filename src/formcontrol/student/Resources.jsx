import React from 'react'
import { Box } from '@mui/material'
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";

const drawerWidth = 240;

export default function Resources() {
  return (
    <>
        <div style={{minHeight: '100vh',background: '#ECEFF1',background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)'}}>
        <Navbar/>
        <Box height={20}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <h1>Resources</h1>
                </Box>
            </Box>
        </div>
        </>
  )
}
