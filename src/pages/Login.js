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
  Switch,
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
  const [confirmPin, setConfirmPin] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
      setAvatarUrl(storedUser.avatarUrl);
    }
  }, []);

  const fetchAvatar = async (inputUsername) => {
    try {
      const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${inputUsername}`);
      const data = await response.json();
      if (data.Id) {
        setAvatarUrl(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=150x150&format=Png&isCircular=true`);
      } else {
        setAvatarUrl('');
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
      setAvatarUrl('');
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length > 3) {
      fetchAvatar(newUsername);
    } else {
      setAvatarUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isRegisterMode) {
      if (pin.length !== 4 || isNaN(pin)) {
        setError('PIN-код должен состоять из 4 цифр.');
        setLoading(false);
        return;
      }
      if (pin !== confirmPin) {
        setError('PIN-коды не совпадают.');
        setLoading(false);
        return;
      }

      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      if (allUsers.some(u => u.username === username)) {
        setError('Пользователь с таким ником уже зарегистрирован.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
        const data = await response.json();
        if (!data.Id) {
          setError('Roblox пользователь с таким ником не найден.');
          setLoading(false);
          return;
        }
        const newAvatarUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=150x150&format=Png&isCircular=true`;

        const newUser = {
          username,
          pin,
          avatarUrl: newAvatarUrl,
          balance: 0,
          history: [],
          achievements: [],
          isAdmin: false // Default to false for new users
        };
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        localStorage.setItem('user', JSON.stringify(newUser));

        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (err) {
        setError('Ошибка при проверке Roblox ника. Пожалуйста, попробуйте еще раз.');
        setLoading(false);
      }

    } else {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const foundUser = allUsers.find(u => u.username === username && u.pin === pin);

      if (foundUser) {
        // Set isAdmin to true for 310x216
        if (foundUser.username === '310x216') {
          foundUser.isAdmin = true;
          // Update the user in allUsers array
          const updatedUsers = allUsers.map(u => u.username === '310x216' ? foundUser : u);
          localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        }
        localStorage.setItem('user', JSON.stringify(foundUser));
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError('Неверное имя пользователя или PIN-код.');
        setLoading(false);
      }
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
                  {isRegisterMode ? 'Регистрация' : 'Вход в RobuxPlanet'}
                </Typography>
                <Typography variant="body1" color="#b0b8d1">
                  {isRegisterMode ? 'Создайте свой аккаунт' : 'Используйте свой ник и PIN-код для входа'}
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

                {isRegisterMode && (
                  <TextField
                    fullWidth
                    label="Подтвердите PIN-код"
                    variant="outlined"
                    type="password"
                    inputProps={{ maxLength: 4, inputMode: 'numeric' }}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, ''))}
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
                )}

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
                    {isRegisterMode ? 'Регистрация успешна! Перенаправление...' : 'Вход выполнен! Перенаправление...'}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !username || pin.length !== 4 || (isRegisterMode && confirmPin.length !== 4 && pin !== confirmPin)}
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
                    isRegisterMode ? 'Зарегистрироваться' : 'Войти'
                  )}
                </Button>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  sx={{ color: accent, textTransform: 'none' }}
                >
                  {isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login; 