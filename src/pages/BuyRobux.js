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
  Snackbar,
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();

  const handlePurchase = () => {
    if (!selectedPackage || !username) return;
    // Здесь обычно обрабатывается процесс оплаты
    setOpenSnackbar(true);
    // Имитация сброса формы после покупки
    setSelectedPackage(null);
    setUsername('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
        Купить Robux
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={7}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: '15px', boxShadow: theme.shadows[5] }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: theme.palette.text.primary }}>
                Выберите Пакет
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {robuxPackages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={4} key={pkg.amount}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        p: 2,
                        textAlign: 'center',
                        borderRadius: '10px',
                        border: selectedPackage?.amount === pkg.amount ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        bgcolor: selectedPackage?.amount === pkg.amount ? theme.palette.primary.light + '20' : theme.palette.background.default,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[3],
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <CardContent>
                        <MonetizationOnIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                        <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                          R$ {pkg.amount}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                          ${pkg.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: '15px', boxShadow: theme.shadows[5] }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: theme.palette.text.primary }}>
                Детали Покупки
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Имя пользователя Roblox"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.divider },
                      '&:hover fieldset': { borderColor: theme.palette.primary.main },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    },
                    '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                    '& .MuiInputBase-input': { color: theme.palette.text.primary },
                  }}
                  InputProps={{
                    startAdornment: (
                      <AccountCircleIcon sx={{ color: theme.palette.action.active, mr: 1 }} />
                    ),
                  }}
                />
              </Box>
              {selectedPackage && (
                <Box sx={{ mb: 3, p: 2, bgcolor: theme.palette.action.hover, borderRadius: '10px' }}>
                  <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Выбранный Пакет: <Typography component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>R$ {selectedPackage.amount}</Typography>
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Цена: <Typography component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>${selectedPackage.price.toFixed(2)}</Typography>
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
                sx={{
                  mt: selectedPackage ? 0 : 2,
                  py: 1.5,
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  boxShadow: theme.shadows[3],
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                Купить Сейчас
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', bgcolor: theme.palette.success.main, color: theme.palette.success.contrastText }}>
          <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Покупка успешна! Ваши Robux будут доставлены в ближайшее время.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BuyRobux; 