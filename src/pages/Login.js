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
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isPinLoginMode, setIsPinLoginMode] = useState(false);
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

    // Check if user is already registered with PIN
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.pin) {
      setIsPinLoginMode(true);
    }
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

  // Обработка установки PIN-кода
  const handleSetPin = () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setError('PIN-код должен состоять из 4 цифр.');
      return;
    }
    if (pin !== confirmPin) {
      setError('PIN-коды не совпадают.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      storedUser.pin = pin;
      // Добавляем ачивку за установку PIN-кода
      if (!storedUser.achievements.includes('set-pin')) {
        storedUser.achievements.push('set-pin');
      }
      localStorage.setItem('user', JSON.stringify(storedUser));
    }
    setSuccess(true);
    setError('');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isPinLoginMode) {
      // Вход по PIN-коду
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
    } else {
      // Вход через Roblox верификацию
      try {
        const verified = await verifyRobloxAbout(username, verificationCode);
        if (!verified) {
          setError('Код не найден в поле "О себе". Проверьте, что вы правильно вставили код в профиль Roblox!');
          setLoading(false);
          return;
        }
        // Сохраняем данные пользователя
        const newUser = {
          username,
          verified: true,
          avatarUrl,
          verificationCode,
          balance: 0,
          history: [],
          achievements: [],
          lastBonus: null
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        // Предлагаем установить PIN
        setShowPinSetup(true);
        setLoading(false);
      } catch (error) {
        setError('Ошибка при верификации. Пожалуйста, попробуйте снова.');
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

              <FormControlLabel
                control={<Switch checked={isPinLoginMode} onChange={() => setIsPinLoginMode(!isPinLoginMode)} />}
                label="Войти по PIN-коду"
                sx={{ mb: 2, '.MuiFormControlLabel-label': { color: textLight } }}
              />

              {!showPinSetup ? (
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

                  {!isPinLoginMode ? (
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
                  ) : (
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
                      {isPinLoginMode ? 'Вход выполнен! Перенаправление...' : 'Верификация успешна! Перенаправление...'}
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
                      isPinLoginMode ? 'Войти' : 'Верифицировать и войти'
                    )}
                  </Button>
                </form>
              ) : (
                <Box>
                  <Typography variant="h5" sx={{ color: accent, mb: 2, textAlign: 'center' }}>
                    Установите PIN-код для быстрого входа
                  </Typography>
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
                      mb: 2,
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
                  />
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
                  />
                  {error && (
                    <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(211, 47, 47, 0.1)' }}>
                      {error}
                    </Alert>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSetPin}
                    disabled={pin.length !== 4 || confirmPin.length !== 4}
                    sx={{
                      py: 1.5,
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      bgcolor: accent,
                      color: textLight,
                      '&:hover': { bgcolor: accent2 },
                    }}
                  >
                    Установить PIN-код
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login; 