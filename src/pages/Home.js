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
  useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/roblox_character.png") no-repeat bottom right',
            backgroundSize: 'contain',
            opacity: 0.1,
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
              '100%': { transform: 'translateY(0px)' }
            }
          }
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              color: theme.palette.common.white,
              py: 8,
              animation: 'fadeIn 1s ease-in',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient 3s ease infinite',
                '@keyframes gradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' }
                }
              }}
            >
              RBX Planet
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                fontWeight: 500,
                mb: 4,
                color: theme.palette.common.white,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Купите Robux по лучшей цене
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 400,
                mb: 6,
                color: theme.palette.common.white,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              1 рубль = 2 робукса
            </Typography>
            <Button
              component={RouterLink}
              to="/buy-robux"
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.common.white,
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '30px',
                boxShadow: theme.shadows[5],
                '&:hover': {
                  bgcolor: theme.palette.secondary.dark,
                  transform: 'translateY(-3px)',
                  boxShadow: theme.shadows[8],
                },
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' }
                }
              }}
            >
              Начать
            </Button>
          </Box>
        </Container>
        {/* Decorative Image */}
        <Box
          component="img"
          src="/roblox_character.png"
          alt="Roblox Character"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: 'auto',
            width: { xs: '50%', md: '30%' },
            opacity: 0.7,
            pointerEvents: 'none',
            transform: 'translateX(20%)',
            filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.5))',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%': { transform: 'translateX(20%) translateY(0px)' },
              '50%': { transform: 'translateX(20%) translateY(-20px)' },
              '100%': { transform: 'translateX(20%) translateY(0px)' }
            }
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: theme.palette.text.primary }}>
          Наши Особенности
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '15px',
                boxShadow: theme.shadows[3],
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8],
                },
                bgcolor: theme.palette.background.paper,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <ShoppingCartIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Купить Robux
                </Typography>
                <Typography align="center" color="text.secondary">
                  Получите Robux по лучшим ценам с мгновенной доставкой
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '15px',
                boxShadow: theme.shadows[3],
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8],
                },
                bgcolor: theme.palette.background.paper,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Пополнить Баланс
                </Typography>
                <Typography align="center" color="text.secondary">
                  Доступны различные способы оплаты
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '15px',
                boxShadow: theme.shadows[3],
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8],
                },
                bgcolor: theme.palette.background.paper,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Безопасные Транзакции
                </Typography>
                <Typography align="center" color="text.secondary">
                  Надежная и безопасная обработка платежей
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Recent Sales Section */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: theme.palette.text.primary }}>
            Недавние Выплаты
          </Typography>
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
                <Card
                  sx={{
                    borderRadius: '10px',
                    boxShadow: theme.shadows[2],
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <CardContent>
                    <AccessTimeIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      R$ {sale.amount}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Продано за {sale.price}
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