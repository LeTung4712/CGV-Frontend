import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BannerTop from "../BannerTop/BannerTop";

const Layout = () => {
  return (
    <Box>
      <BannerTop />
      <Box 
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#fdfcf0'
        }}
      >
        <Header />
      </Box>
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
