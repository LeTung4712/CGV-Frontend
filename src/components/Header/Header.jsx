import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  useScrollTrigger,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import logo from '../../assets/images/logo1.png';
import { useLocation } from '../../contexts/LocationContext';

const navigation = {
  main: [
    {
      title: 'LỊCH CHIẾU',
      children: [
        { title: 'LỊCH CHIẾU PHIM', path: '/movies/now-showing' },
        { title: 'LỊCH CHIẾU RẠP', path: '/cinemas' }
      ]
    },
    { title: 'ĐỒ ĂN/COMBO', path: '/food-drinks' },
    { title: 'KHUYẾN MÃI', path: '/promotions' },
    {
      title: 'VỀ CHÚNG TÔI',
      children: [
        { title: 'HỆ THỐNG RẠP', path: '/theaters' },
        { title: 'VỀ CHÚNG TÔI', path: '/about' },
        { title: 'DỊCH VỤ QUẢNG CÁO', path: '/advertising' },
        { title: 'TUYỂN DỤNG', path: '/recruitment' }
      ]
    }
  ]
};

const locations = [
  { value: 'Hà Nội', label: 'Hà Nội' },
  { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' }
];

const styles = {
  navigationButton: {
    color: 'text.primary',
    mx: 1,
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    letterSpacing: '0.5px',
    '&:hover': { backgroundColor: 'transparent' },
    py: 1.5
  },
  select: (isMobile) => ({
    backgroundColor: '#fdfcf0',
    '& .MuiSelect-select': {
      py: 1,
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: 600,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      letterSpacing: '0.5px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0066cc',
      borderWidth: '2px',
      borderRadius: '8px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0066cc'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0066cc'
    }
  }),
  menuItem: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '0.5px'
  },
  appBar: (trigger) => ({
    top: 0,
    backgroundColor: '#fdfcf0',
    boxShadow: trigger ? 1 : 0,
    borderBottom: '1px solid',
    borderColor: 'divider',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    animation: trigger ? 'stuckMoveDown 0.6s' : 'none',
    position: 'relative',
    '@keyframes stuckMoveDown': {
      '0%': {
        transform: 'translateY(-100%)',
        opacity: 0
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1
      }
    },
    '& .MuiToolbar-root': {
      minHeight: { xs: '60px', sm: '70px' },
      py: { xs: 0.5, sm: 1 }
    }
  }),
  loginButton: {
    backgroundColor: '#0066cc',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0052a3'
    },
    borderRadius: '8px',
    px: 3,
    py: 1.5
  }
};

function Header() {
  const { location, updateLocation } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState('');
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('location');
    if (window.location.pathname === '/') {
      setOpenLocationDialog(true);
    }
  }, []);

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    if (locations.some(loc => loc.value === newLocation)) {
      updateLocation(newLocation);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    updateLocation(selectedLocation);
    setOpenLocationDialog(false);
  };

  // Thêm effect cho shadow khi scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmenuClick = (title) => {
    setOpenSubmenu(openSubmenu === title ? '' : title);
  };

  const logoutOnclick = () => {
    localStorage.removeItem("token");
    navigate("/logout");
  };

  // Location Selector Component
  const LocationSelector = React.memo(({ isMobile }) => (
    <FormControl sx={{ minWidth: isMobile ? 100 : 120, mr: 2 }}>
      <Select
        value={location}
        onChange={handleLocationChange}
        size="small"
        sx={styles.select(isMobile)}
      >
        {locations.map((loc) => (
          <MenuItem key={loc.value} value={loc.value}>
            {loc.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="sticky"
          color="default"
          sx={styles.appBar(trigger)}
        >
          <Container maxWidth="xl">
            <Toolbar 
              disableGutters 
              sx={{ 
                minHeight: { xs: '56px', sm: '64px' },
              }}
            >
              {/* Logo */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link to="/">
                  <img src={logo} alt="Logo" style={{ height: '45px', marginLeft: '15px' }} />
                </Link>
              </Box>

              {/* Desktop Menu - Điều chỉnh justifyContent thành flex-start */}
              <Box sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-start',
                ml: 4 // Thêm margin left để tạo khoảng cách với logo
              }}>
                {navigation.main.map((item) => (
                  item.children ? (
                    <Box
                      key={item.title}
                      sx={{ 
                        position: 'relative',
                        '&:hover > .MuiBox-root': { // Thay đổi selector
                          display: 'block'
                        },
                        mx: 1
                      }}
                    >
                      <Button
                        sx={styles.navigationButton}
                      >
                        {item.title}
                      </Button>
                      {/* Thay Menu bằng Box cho dropdown */}
                      <Box
                        sx={{
                          display: 'none',
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          minWidth: '200px',
                          backgroundColor: '#fdfcf0',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          zIndex: 1000
                        }}
                      >
                        {item.children.map((child) => (
                          <Button
                            key={child.title}
                            component={Link}
                            to={child.path}
                            fullWidth
                            sx={{
                              justifyContent: 'flex-start',
                              padding: '8px 16px',
                              textAlign: 'left',
                              color: 'text.primary',
                              '&:hover': { 
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                              }
                            }}
                          >
                            {child.title}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      key={item.title}
                      component={Link}
                      to={item.path}
                      sx={styles.navigationButton}
                    >
                      {item.title}
                    </Button>
                  )
                ))}
              </Box>

              {/* Mobile Menu */}
              <Box sx={{ 
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                flexGrow: 1 
              }}>
                {/* Logo */}
                <Link to="/">
                  <img src={logo} alt="Logo" style={{ height: '35px' }} />
                </Link>
                
                <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
                
                {/* Location Selector */}
                <LocationSelector isMobile />
                
                {/* Login/Register cho Mobile */}
                {!user ? (
                  <IconButton
                    component={Link}
                    to="/login"
                    sx={{ color: 'text.primary' }}
                  >
                    <PersonOutlineIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={logoutOnclick}
                    sx={{ color: 'text.primary' }}
                  >
                    <PersonOutlineIcon />
                  </IconButton>
                )}
                
                {/* Menu Button */}
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Login/Register Button và Location Selector cho Desktop */}
              <Box sx={{ 
                flexShrink: 0,
                display: { xs: 'none', md: 'flex' }, // Ẩn trên mobile
                alignItems: 'center'
              }}>
                <LocationSelector />

                {/* Login/Register buttons */}
                {!user ? (
                  <Button
                    component={Link}
                    to="/login"
                    sx={styles.loginButton}
                  >
                    ĐĂNG NHẬP/ĐĂNG KÝ
                  </Button>
                ) : (
                  <Stack 
                    direction="row" 
                    spacing={1}
                    sx={{ display: { xs: 'none', md: 'flex' } }} // Ẩn trên mobile
                  >
                    <Button
                      component={Link}
                      to="/profile"
                      sx={{ color: 'text.primary' }}
                    >
                      XIN CHÀO, {user.name}
                    </Button>
                    <Button
                      onClick={logoutOnclick}
                      sx={{ color: 'text.primary' }}
                    >
                      THOÁT
                    </Button>
                  </Stack>
                )}
              </Box>
            </Toolbar>
          </Container>

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 240,
                backgroundColor: '#fdfcf0',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          >
            <List sx={{ pt: 2 }}>
              {navigation.main.map((item) => (
                item.children ? (
                  <React.Fragment key={item.title}>
                    <ListItemButton onClick={() => handleSubmenuClick(item.title)}>
                      <ListItemText primary={item.title} />
                      {openSubmenu === item.title ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubmenu === item.title} timeout="auto">
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItemButton
                            key={child.title}
                            component={Link}
                            to={child.path}
                            sx={{ pl: 4 }}
                            onClick={handleDrawerToggle}
                          >
                            <ListItemText primary={child.title} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <ListItemButton
                    key={item.title}
                    component={Link}
                    to={item.path}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                )
              ))}
            </List>
          </Drawer>
        </AppBar>
      </Box>

      {/* Dialog chọn vị trí */}
      <Dialog
        open={openLocationDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#fdfcf0',
            borderRadius: '13px'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#333'
          }}
        >
          Chào mừng quý khách đến với LUX CINEMA
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {locations.map((location) => (
              <Grid item xs={12} sm={6} key={location.value}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleLocationSelect(location.value)}
                  sx={{
                    py: 2,
                    borderColor: '#0066cc',
                    color: '#0066cc',
                    '&:hover': {
                      borderColor: '#0066cc',
                      backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    },
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  LUX {location.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
