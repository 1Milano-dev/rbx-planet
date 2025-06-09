import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to RobuxPlanet
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your trusted source for Robux and Limited items
          </Typography>
          <Button
            component={RouterLink}
            to="/buy-robux"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <ShoppingCartIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  Buy Robux
                </Typography>
                <Typography align="center">
                  Get Robux at the best prices with instant delivery
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  Add Balance
                </Typography>
                <Typography align="center">
                  Multiple payment methods available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  Secure Transactions
                </Typography>
                <Typography align="center">
                  Safe and secure payment processing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Recent Sales Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Recently Sold
          </Typography>
          <Grid container spacing={2}>
            {[
              { amount: '1,120', price: '$8.12' },
              { amount: '100', price: '$0.55' },
              { amount: '3,334', price: '$25.01' },
              { amount: '1,000', price: '$7.25' },
            ].map((sale, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      R$ {sale.amount}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Sold for {sale.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 