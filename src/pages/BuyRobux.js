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

// Обновленные пакеты с ценами в рублях
const robuxPackages = [
  { amount: 100, price: 55 },
  { amount: 500, price: 275 },
  { amount: 1000, price: 550 },
  { amount: 2000, price: 1100 },
  { amount: 5000, price: 2750 },
  { amount: 10000, price: 5500 },
];

const BuyRobux = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [username, setUsername] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePurchase = () => {
    if (!username || !selectedPackage) return;
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: accent }}>
            Купить Robux
          </Typography>
        </Fade>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Fade in timeout={1200}>
              <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3, color: accent }}>
                    Выберите количество Robux
                  </Typography>
                  <Grid container spacing={2}>
                    {robuxPackages.map((pkg, index) => (
                      <Grid item xs={6} sm={4} key={pkg.amount}>
                        <Zoom in timeout={300} style={{ transitionDelay: `${index * 100}ms` }}>
                          <Card
                            onClick={() => handlePackageSelect(pkg)}
                            sx={{
                              cursor: 'pointer',
                              bgcolor: selectedPackage?.amount === pkg.amount ? accent : darkBg,
                              transition: 'all 0.3s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px 0 rgba(0,191,255,0.15)',
                              },
                            }}
                          >
                            <CardContent>
                              <MonetizationOnIcon sx={{ fontSize: 40, color: selectedPackage?.amount === pkg.amount ? textLight : accent, mb: 1 }} />
                              <Typography variant="h5" sx={{ color: selectedPackage?.amount === pkg.amount ? textLight : accent, fontWeight: 'bold' }}>
                                R$ {pkg.amount}
                              </Typography>
                              <Typography variant="body1" color={selectedPackage?.amount === pkg.amount ? textLight : "#b0b8d1"} sx={{ mt: 0.5 }}>
                                {pkg.price} ₽
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
                    <Box sx={{ mb: 3, p: 2, bgcolor: darkBg, borderRadius: '8px' }}>
                      <Typography variant="body1" color="#b0b8d1" gutterBottom>
                        Выбранный пакет:
                      </Typography>
                      <Typography variant="h6" color={accent} sx={{ fontWeight: 'bold' }}>
                        R$ {selectedPackage.amount}
                      </Typography>
                      <Typography variant="body1" color={accent2} sx={{ fontWeight: 'bold' }}>
                        {selectedPackage.price} ₽
                      </Typography>
                    </Box>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handlePurchase}
                    disabled={!username || !selectedPackage}
                    sx={{
                      py: 1.5,
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                      transition: 'all 0.3s',
                      bgcolor: accent,
                      color: textLight,
                      '&:hover': { 
                        boxShadow: '0 8px 32px 0 rgba(0,191,255,0.25)',
                        bgcolor: accent2
                      },
                    }}
                  >
                    Купить
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