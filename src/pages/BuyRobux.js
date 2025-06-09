import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Alert,
} from '@mui/material';

const robuxPackages = [
  { amount: 100, price: 0.55 },
  { amount: 500, price: 2.75 },
  { amount: 1000, price: 5.50 },
  { amount: 2000, price: 11.00 },
  { amount: 5000, price: 27.50 },
  { amount: 10000, price: 55.00 },
];

const BuyRobux = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [username, setUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = () => {
    if (!selectedPackage || !username) return;
    // Here you would typically handle the payment processing
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Buy Robux
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Purchase successful! Your Robux will be delivered shortly.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Package
              </Typography>
              <Grid container spacing={2}>
                {robuxPackages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={4} key={pkg.amount}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        bgcolor: selectedPackage?.amount === pkg.amount ? 'primary.light' : 'background.paper',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        },
                      }}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <CardContent>
                        <Typography variant="h6" align="center">
                          R$ {pkg.amount}
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary">
                          ${pkg.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Purchase Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Roblox Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                />
              </Box>
              {selectedPackage && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Selected Package: R$ {selectedPackage.amount}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Price: ${selectedPackage.price}
                  </Typography>
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePurchase}
                disabled={!selectedPackage || !username}
              >
                Purchase Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuyRobux; 