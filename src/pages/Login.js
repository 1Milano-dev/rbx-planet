import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
  useTheme,
  Fade,
  Zoom,
  FormControlLabel
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  // Автоматическая инициализация пользователя 310x216 с PIN-кодом 2008
  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.username !== '310x216' || !storedUser.pin) {
      const defaultUser = {
        username: '310x216',
        verified: true,
        avatarUrl: 'https://www.roblox.com/headshot-thumbnail/image?userId=87948332&width=420&height=420&format=png', // Пример аватара для 310x216
        pin: '2008',
        balance: 0,
        history: [],
        achievements: [],
        lastBonus: null
      };
      localStorage.setItem('user', JSON.stringify(defaultUser));
      setUsername('310x216');
      setAvatarUrl(defaultUser.avatarUrl);
    } else {
      setUsername(storedUser.username);
      setAvatarUrl(storedUser.avatarUrl);
    }
  }, []);

  // Получение аватара пользователя (для отображения, если ник меняется)
  const fetchAvatar = async (username) => {
    try {
      const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
      const data = await response.json();

      if (data.Id) {
        setAvatarUrl(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=150x150&format=Png&isCircular=true`);
      } else {
        setAvatarUrl(''); // Очищаем аватар, если ник не найден
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
      setAvatarUrl('');
    }
  };

  // Обработка изменения имени пользователя
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length > 3) {
      fetchAvatar(newUsername);
    } else {
      setAvatarUrl('');
    }
  };

  // Обработка отправки формы (только для входа по PIN-коду)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.pin === pin) {
      // Успешный вход по PIN-коду
      localStorage.setItem('user', JSON.stringify(storedUser)); // Обновляем localStorage на случай изменений
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError('Неверное имя пользователя или PIN-код.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: accent, fontWeight: 'bold' }}>
                  Вход в RobuxPlanet
                </Typography>
                <Typography variant="body1" color="#b0b8d1">
                  Используйте свой ник и PIN-код для входа
                </Typography>
              </Box>

              {avatarUrl && (
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <img 
                    src={avatarUrl} 
                    alt="Roblox Avatar" 
                    style={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: '50%',
                      border: `3px solid ${accent}`,
                      boxShadow: `0 0 20px ${accent}40`
                    }} 
                  />
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Имя пользователя Roblox"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  sx={{
                    mb: 3,
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

                <TextField
                  fullWidth
                  label="PIN-код (4 цифры)"
                  variant="outlined"
                  type="password"
                  inputProps={{ maxLength: 4, inputMode: 'numeric' }}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  sx={{
                    mb: 3,
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
                      <LockIcon sx={{ color: accent, mr: 1 }} />
                    ),
                  }}
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(211, 47, 47, 0.1)' }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3, 
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                      '& .MuiAlert-icon': { color: accent }
                    }}
                  >
                    <VerifiedUserIcon sx={{ mr: 1 }} />
                    Вход выполнен! Перенаправление...
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !username || pin.length !== 4}
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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Войти'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login; 