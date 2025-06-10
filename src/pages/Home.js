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
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Добро пожаловать на RobuxPlanet
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom sx={{ opacity: 0.9 }}>
            Ваш надежный источник Robux и лимитированных предметов
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
            }}
          >
            Начать
          </Button>
        </Container>
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