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
  Snackbar,
  useTheme,
  Fade,
  Zoom,
  Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

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
    setOpenSnackbar(true);
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
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 6 }}>
      <Container maxWidth="lg">
        <Fade in timeout={900}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: accent, fontWeight: 'bold', mb: 5 }}>
            Купить Robux
          </Typography>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={7}>
            <Fade in timeout={1200}>
              <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', color: textLight }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: accent }}>
                    Выберите Пакет
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    {robuxPackages.map((pkg, i) => (
                      <Grid item xs={12} sm={6} md={4} key={pkg.amount}>
                        <Zoom in style={{ transitionDelay: `${300 + i * 120}ms` }}>
                          <Card
                            sx={{
                              cursor: 'pointer',
                              p: 2,
                              textAlign: 'center',
                              borderRadius: '10px',
                              border: selectedPackage?.amount === pkg.amount ? `2px solid ${accent}` : `1px solid ${cardBg}`,
                              bgcolor: selectedPackage?.amount === pkg.amount ? accent + '22' : darkBg,
                              color: textLight,
                              transition: 'all 0.3s',
                              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
                              '&:hover': {
                                transform: 'scale(1.04)',
                                boxShadow: `0 8px 32px 0 ${accent}33`,
                                borderColor: accent,
                              },
                            }}
                            onClick={() => setSelectedPackage(pkg)}
                          >
                            <CardContent>
                              <MonetizationOnIcon sx={{ fontSize: 40, color: accent, mb: 1 }} />
                              <Typography variant="h5" sx={{ color: accent, fontWeight: 'bold' }}>
                                R$ {pkg.amount}
                              </Typography>
                              <Typography variant="body1" color="#b0b8d1" sx={{ mt: 0.5 }}>
                                ${pkg.price.toFixed(2)}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Zoom>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={5}>
            <Fade in timeout={1500}>
              <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', color: textLight }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: accent }}>
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
                          '& fieldset': { borderColor: cardBg },
                          '&:hover fieldset': { borderColor: accent },
                          '&.Mui-focused fieldset': { borderColor: accent },
                          bgcolor: darkBg,
                          color: textLight,
                        },
                        '& .MuiInputLabel-root': { color: '#b0b8d1' },
                        '& .MuiInputBase-input': { color: textLight },
                      }}
                      InputProps={{
                        startAdornment: (
                          <AccountCircleIcon sx={{ color: accent, mr: 1 }} />
                        ),
                      }}
                    />
                  </Box>
                  {selectedPackage && (
                    <Box sx={{ mb: 3, p: 2, bgcolor: darkBg, borderRadius: '10px', border: `1px solid ${accent}55` }}>
                      <Typography variant="body1" gutterBottom sx={{ color: textLight }}>
                        Выбранный Пакет: <Typography component="span" sx={{ fontWeight: 'bold', color: accent }}>R$ {selectedPackage.amount}</Typography>
                      </Typography>
                      <Typography variant="body1" gutterBottom sx={{ color: textLight }}>
                        Цена: <Typography component="span" sx={{ fontWeight: 'bold', color: accent }}>${selectedPackage.price.toFixed(2)}</Typography>
                      </Typography>
                    </Box>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handlePurchase}
                    disabled={!selectedPackage || !username}
                    sx={{
                      mt: selectedPackage ? 0 : 2,
                      py: 1.5,
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      bgcolor: accent,
                      color: textLight,
                      boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: accent2,
                        color: '#fff',
                        boxShadow: '0 8px 32px 0 rgba(255,64,129,0.18)',
                        transform: 'scale(1.04)',
                      },
                    }}
                  >
                    Купить Сейчас
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', bgcolor: accent, color: textLight }}>
            <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Покупка успешна! Ваши Robux будут доставлены в ближайшее время.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default BuyRobux; 