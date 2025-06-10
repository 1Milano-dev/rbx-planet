import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  useTheme,
  Fade
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.isAdmin) {
        setIsAdmin(true);
      } else {
        setError('У вас нет прав для доступа к этой странице.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: darkBg }}>
        <CircularProgress sx={{ color: accent }} />
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ bgcolor: 'rgba(211, 47, 47, 0.1)' }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 40, color: accent, mr: 2 }} />
                <Typography variant="h4" component="h1" sx={{ color: accent, fontWeight: 'bold' }}>
                  Админ-панель
                </Typography>
              </Box>

              <Typography variant="body1" color="#b0b8d1" paragraph>
                Добро пожаловать в панель администратора! Здесь вы можете управлять пользователями и настройками сайта.
              </Typography>

              {/* Здесь будут добавлены функции управления пользователями */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: accent, mb: 2 }}>
                  Управление пользователями
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<SecurityIcon />}
                  sx={{
                    bgcolor: accent,
                    color: textLight,
                    '&:hover': { bgcolor: accent2 }
                  }}
                >
                  Назначить администратора
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminPanel; 