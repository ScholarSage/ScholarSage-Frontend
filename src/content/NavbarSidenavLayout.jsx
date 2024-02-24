// Layout.js
import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

const drawerWidth = 240;

const Layout = ({ children }) => {
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)'}}>
      <Navbar />
      <Box height={20} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
