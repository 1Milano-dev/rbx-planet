import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  Fade,
  Divider,
  useMediaQuery
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CasinoIcon from '@mui/icons-material/Casino';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleClose();
    window.location.href = '/';
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: 'Колесо', icon: <CasinoIcon />, to: '/wheel' },
    { text: 'Задания', icon: <AssignmentIcon />, to: '/tasks' },
    { text: 'FAQ', icon: <HelpOutlineIcon />, to: '/faq' },
    { text: 'Обратная связь', icon: <FeedbackIcon />, to: '/feedback' },
    { text: 'Купить R$', icon: <ShoppingCartIcon />, to: '/buy-robux' },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{
        background: theme.components.MuiAppBar.styleOverrides.root.background,
        boxShadow: theme.components.MuiAppBar.styleOverrides.root.boxShadow,
        borderBottom: theme.components.MuiAppBar.styleOverrides.root.borderBottom,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              ...theme.typography.h1,
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            RobuxPlanet
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    bgcolor: theme.palette.background.default,
                    width: 250,
                  },
                }}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {user && (
                      <ListItem 
                        component={RouterLink} 
                        to="/profile"
                        sx={{ 
                          py: 1.5,
                          bgcolor: theme.palette.background.paper,
                          mb: 1,
                          justifyContent: 'center',
                          borderRadius: 2,
                          mx: 1
                        }}
                      >
                        {user.avatarUrl ? (
                          <Avatar 
                            src={user.avatarUrl} 
                            alt={user.username}
                            sx={{ width: 40, height: 40, mr: 1 }}
                          />
                        ) : (
                          <AccountCircleIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 1 }} />
                        )}
                        <Typography variant="h6" color="primary">
                          {user.username}
                        </Typography>
                      </ListItem>
                    )}

                    {navLinks.map((link) => (
                      <ListItem 
                        button 
                        key={link.text} 
                        component={RouterLink} 
                        to={link.to}
                        sx={{ color: theme.palette.text.primary }}
                      >
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                          {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.text} />
                      </ListItem>
                    ))}

                    {user ? (
                      <ListItem button onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
                        <ListItemIcon sx={{ color: theme.palette.error.main }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Выйти" />
                      </ListItem>
                    ) : (
                      <ListItem button component={RouterLink} to="/login" sx={{ color: theme.palette.primary.main }}>
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Войти" />
                      </ListItem>
                    )}
                    {user?.isAdmin && (
                      <ListItem button component={RouterLink} to="/admin" sx={{ color: theme.palette.secondary.main }}>
                        <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
                          <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Админ-панель" />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: 'linear-gradient(90deg, #1C1C1C 0%, rgba(0, 201, 255, 0.1) 100%)', 
                  borderRadius: 2, 
                  px: 2, 
                  py: 0.5, 
                  mr: 2, 
                  boxShadow: '0 2px 10px rgba(0, 201, 255, 0.1)'
                }}>
                  <MonetizationOnIcon sx={{ color: theme.palette.primary.light, mr: 0.5 }} />
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
                    {user.balance || 0} R$
                  </Typography>
                </Box>
              )}
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  component={RouterLink}
                  to={link.to}
                  startIcon={link.icon}
                  color="primary"
                  variant="text"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  {link.text}
                </Button>
              ))}
              {user ? (
                <IconButton
                  onClick={handleMenu}
                  sx={{ ml: 1 }}
                >
                  {user.avatarUrl ? (
                    <Avatar 
                      src={user.avatarUrl} 
                      alt={user.username}
                      sx={{ width: 36, height: 36, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                  )}
                </IconButton>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  startIcon={<LoginIcon />}
                  variant="contained"
                  color="primary"
                >
                  Войти
                </Button>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    mt: 1.5,
                    borderRadius: 3,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                    border: `1px solid ${theme.palette.primary.dark}`,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1.5,
                      color: theme.palette.text.primary,
                      transition: 'background-color 0.2s, color 0.2s',
                      '&:hover': {
                        bgcolor: 'rgba(0, 201, 255, 0.1)',
                        color: theme.palette.primary.light,
                      },
                    },
                  },
                }}
              >
                <MenuItem 
                  component={RouterLink} 
                  to="/profile"
                  onClick={handleClose}
                >
                  <AccountCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Личный кабинет
                </MenuItem>
                {user?.isAdmin && (
                  <>
                    <Divider sx={{ my: 1, bgcolor: theme.palette.background.default }} />
                    <MenuItem 
                      component={RouterLink} 
                      to="/admin"
                      onClick={handleClose}
                    >
                      <AdminPanelSettingsIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                      Админ-панель
                    </MenuItem>
                  </>
                )}
                <Divider sx={{ my: 1, bgcolor: theme.palette.background.default }} />
                <MenuItem 
                  component={RouterLink} 
                  to="/settings"
                  onClick={handleClose}
                >
                  <SettingsIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                  Настройки
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ color: theme.palette.error.main }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  Выйти
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 