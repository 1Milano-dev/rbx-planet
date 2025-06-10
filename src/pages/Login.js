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
  Zoom
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();

  // Генерация случайного кода верификации
  useEffect(() => {
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = 'RP-VERIFY-';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    setVerificationCode(generateCode());
  }, []);

  // Получение аватара пользователя
  const fetchAvatar = async (username) => {
    try {
      const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
      const data = await response.json();
      
      if (data.Id) {
        setAvatarUrl(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=150x150&format=Png&isCircular=true`);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  // Обработка изменения имени пользователя
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length > 3) {
      fetchAvatar(newUsername);
    }
  };

  // Проверка кода в About через Roblox API
  const verifyRobloxAbout = async (username, code) => {
    try {
      // Получаем userId по нику
      const userIdRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
      const userIdData = await userIdRes.json();
      if (!userIdData.Id) return false;
      // Получаем описание профиля
      const profileRes = await fetch(`https://users.roblox.com/v1/users/${userIdData.Id}`);
      const profileData = await profileRes.json();
      return profileData.description && profileData.description.includes(code);
    } catch (e) {
      return false;
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Проверка верификации через Roblox API
      const verified = await verifyRobloxAbout(username, verificationCode);
      if (!verified) {
        setError('Код не найден в поле "О себе". Проверьте, что вы правильно вставили код в профиль Roblox!');
        setLoading(false);
        return;
      }
      // Сохраняем данные пользователя
      localStorage.setItem('user', JSON.stringify({
        username,
        verified: true,
        avatarUrl,
        verificationCode
      }));
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Ошибка при верификации. Пожалуйста, попробуйте снова.');
    } finally {
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
                  Вход через Roblox
                </Typography>
                <Typography variant="body1" color="#b0b8d1">
                  Войдите, чтобы получить доступ ко всем функциям
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

                <Box sx={{ mb: 3, p: 2, bgcolor: darkBg, borderRadius: '8px' }}>
                  <Typography variant="body2" color="#b0b8d1" gutterBottom>
                    Для верификации:
                  </Typography>
                  <Typography variant="body2" color={accent} sx={{ fontWeight: 'bold' }}>
                    1. Перейдите на страницу вашего профиля Roblox
                  </Typography>
                  <Typography variant="body2" color={accent} sx={{ fontWeight: 'bold' }}>
                    2. Добавьте этот код в поле "О себе":
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: accent2, 
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mt: 1,
                      p: 1,
                      bgcolor: cardBg,
                      borderRadius: '4px'
                    }}
                  >
                    {verificationCode}
                  </Typography>
                </Box>

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
                    Верификация успешна! Перенаправление...
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
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