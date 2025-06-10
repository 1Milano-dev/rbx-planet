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
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight }}>
      {/* Hero Section */}
      <Fade in timeout={900}>
        <Box
          sx={{
            bgcolor: cardBg,
            color: textLight,
            py: { xs: 7, md: 11 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2, letterSpacing: 1 }}>
              Добро пожаловать на RobuxPlanet
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom sx={{ opacity: 0.9, mb: 3 }}>
              Ваш надежный источник Robux и лимитированных предметов
            </Typography>
            <Zoom in timeout={1200}>
              <Button
                component={RouterLink}
                to="/buy-robux"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: accent,
                  color: textLight,
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 24px 0 rgba(0,191,255,0.25)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: accent2,
                    color: '#fff',
                    transform: 'scale(1.07)',
                    boxShadow: '0 8px 32px 0 rgba(255,64,129,0.25)',
                  },
                }}
              >
                Начать
              </Button>
            </Zoom>
          </Container>
        </Box>
      </Fade>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Fade in timeout={1200}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: accent }}>
            Наши Особенности
          </Typography>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          {[{
            icon: <ShoppingCartIcon sx={{ fontSize: 60, color: accent }} />, title: 'Купить Robux', desc: 'Получите Robux по лучшим ценам с мгновенной доставкой.'
          }, {
            icon: <AccountBalanceWalletIcon sx={{ fontSize: 60, color: accent }} />, title: 'Пополнить Баланс', desc: 'Доступны различные способы оплаты.'
          }, {
            icon: <SecurityIcon sx={{ fontSize: 60, color: accent }} />, title: 'Безопасные Транзакции', desc: 'Надежная и безопасная обработка платежей.'
          }].map((feature, i) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Zoom in style={{ transitionDelay: `${300 + i * 200}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '18px',
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)',
                    bgcolor: cardBg,
                    color: textLight,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: `0 8px 32px 0 ${accent}55`,
                      transform: 'translateY(-7px) scale(1.03)',
                      border: `2px solid ${accent}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: accent }}>
                      {feature.title}
                    </Typography>
                    <Typography align="center" color="#b0b8d1">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Recent Sales Section */}
      <Box sx={{ bgcolor: cardBg, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Fade in timeout={1500}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: accent }}>
              Недавние Выплаты
            </Typography>
          </Fade>
          <Grid container spacing={3} justifyContent="center">
            {[
              { amount: '1,120', price: '$8.12' },
              { amount: '100', price: '$0.55' },
              { amount: '3,334', price: '$25.01' },
              { amount: '1,000', price: '$7.25' },
              { amount: '500', price: '$3.50' },
              { amount: '2,500', price: '$18.00' },
            ].map((sale, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Zoom in style={{ transitionDelay: `${500 + index * 150}ms` }}>
                  <Card
                    sx={{
                      borderRadius: '12px',
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
                      bgcolor: darkBg,
                      color: textLight,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      border: `1.5px solid ${cardBg}`,
                      transition: 'all 0.3s',
                      '&:hover': {
                        border: `2px solid ${accent2}`,
                        boxShadow: `0 8px 32px 0 ${accent2}33`,
                        transform: 'scale(1.04)',
                      },
                    }}
                  >
                    <CardContent>
                      <AccessTimeIcon sx={{ fontSize: 40, color: accent2, mb: 1 }} />
                      <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: accent }}>
                        R$ {sale.amount}
                      </Typography>
                      <Typography variant="body2" align="center" color="#b0b8d1">
                        Продано за {sale.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 