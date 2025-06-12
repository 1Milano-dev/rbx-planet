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
  Paper
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);
const MotionCard = motion(Card);

const Home = () => {
  const theme = useTheme();

  const featureItems = [
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Выгодные цены',
      description: 'Получайте больше Robux за меньшие деньги благодаря нашим эксклюзивным предложениям.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Безопасные транзакции',
      description: 'Ваши данные и средства надежно защищены современными технологиями шифрования.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Мгновенная доставка',
      description: 'Robux начисляются на ваш аккаунт практически сразу после покупки.',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Поддержка 24/7',
      description: 'Наша команда всегда готова помочь вам с любыми вопросами и проблемами.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle at 70% 30%, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          overflow: 'hidden',
          pt: { xs: 8, md: 0 },
          pb: { xs: 8, md: 0 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/roblox_character.png") no-repeat bottom right',
            backgroundSize: '50% auto',
            backgroundPosition: 'right -10% bottom -20px',
            opacity: 0.08,
            animation: 'float 6s ease-in-out infinite alternate',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
              '100%': { transform: 'translateY(0px)' }
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/roblox_character1.png") no-repeat top left',
            backgroundSize: '40% auto',
            backgroundPosition: 'left -5% top -10px',
            opacity: 0.05,
            animation: 'float 7s ease-in-out infinite reverse',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(15px)' },
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
              color: theme.palette.text.primary,
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
                fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' },
                fontWeight: 700,
                mb: 2,
                textShadow: '0 5px 25px rgba(0, 201, 255, 0.4)',
                ...theme.typography.h1,
                animation: 'gradient-shift 8s ease infinite',
                '@keyframes gradient-shift': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' }
                }
              }}
            >
              RobuxPlanet
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                fontWeight: 600,
                mb: 3,
                color: theme.palette.text.secondary,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Купите Robux по лучшей цене
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                fontWeight: 400,
                mb: 6,
                color: theme.palette.text.primary,
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}
            >
              1 рубль = 2 робукса
            </Typography>
            <MotionButton
              component={RouterLink}
              to="/buy-robux"
              variant="contained"
              color="primary"
              size="large"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: theme.components.MuiButton.styleOverrides.root['&:hover'].boxShadow }}
              sx={{ mt: 4, px: 6, py: 2, fontSize: '1.2rem' }}
            >
              Начать
            </MotionButton>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00C9FF 30%, #92FE9D 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Почему выбирают нас
          </Typography>
          <Grid container spacing={4}>
            {featureItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ translateY: -10, boxShadow: theme.components.MuiCard.styleOverrides.root['&:hover'].boxShadow }}
                  sx={{
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 3,
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.primary.dark}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.light }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
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

      {/* Тестовый вывод изображения для проверки */}
      <img src="/roblox_character1.png" alt="roblox_character1" style={{ width: 200, border: '2px solid red', zIndex: 9999, position: 'relative' }} />
    </Box>
  );
};

export default Home; 