import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            RobuxPlanet
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
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
            <Button
              component={RouterLink}
              to="/buy-limiteds"
              startIcon={<ShoppingCartIcon />}
              color="primary"
            >
              Купить Limited
            </Button>
            <Button
              component={RouterLink}
              to="/add-balance"
              startIcon={<AccountBalanceWalletIcon />}
              color="primary"
            >
              Пополнить баланс
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<LoginIcon />}
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 