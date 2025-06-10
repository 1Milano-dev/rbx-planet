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
  Fade
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

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

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)'
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
              color: theme.palette.primary.main,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            RobuxPlanet
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: theme.palette.background.default, borderRadius: 2, px: 2, py: 0.5, mr: 2 }}>
                  <MonetizationOnIcon sx={{ color: theme.palette.primary.main, mr: 0.5 }} />
                  <span style={{ color: theme.palette.text.primary, fontWeight: 700 }}>{user.balance || 0} R$</span>
                </Box>
                <Button
                  component={RouterLink}
                  to="/tasks"
                  startIcon={<AssignmentIcon />}
                  color="primary"
                >
                  Задания
                </Button>
                <Button
                  component={RouterLink}
                  to="/buy-robux"
                  startIcon={<ShoppingCartIcon />}
                  color="primary"
                >
                  Купить R$
                </Button>
                <IconButton
                  onClick={handleMenu}
                  sx={{ ml: 1 }}
                >
                  {user.avatarUrl ? (
                    <Avatar 
                      src={user.avatarUrl} 
                      alt={user.username}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      bgcolor: theme.palette.background.paper,
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        px: 2,
                        py: 1.5,
                      },
                    },
                  }}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile"
                    onClick={handleClose}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {user.username}
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/settings"
                    onClick={handleClose}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    <SettingsIcon sx={{ mr: 1 }} />
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
              </>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 