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
  FormControlLabel,
  Grid
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

      const newUser = {
        username,
        pin,
        avatarUrl: avatarUrl,
        balance: 0,
        history: [],
        achievements: [],
        isAdmin: false
      };
      allUsers.push(newUser);
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      localStorage.setItem('user', JSON.stringify(newUser));

      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    } else {
      // Login logic
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      
      // Special case for 310x216
      if (username === '310x216') {
        if (pin !== '2008') {
          setError('Неверный PIN-код для администратора.');
          setLoading(false);
          return;
        }
        const adminUser = {
          username: '310x216',
          pin: '2008',
          avatarUrl: 'https://thumbnails.roblox.com/v1/users/avatar?userIds=87948332&size=150x150&format=Png&isCircular=true',
          balance: 0,
          history: [],
          achievements: [],
          isAdmin: true
        };

        // Check if admin user exists in allUsers
        const existingAdminIndex = allUsers.findIndex(u => u.username === '310x216');
        if (existingAdminIndex !== -1) {
          allUsers[existingAdminIndex] = adminUser;
        } else {
          allUsers.push(adminUser);
        }
        
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        localStorage.setItem('user', JSON.stringify(adminUser));
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
        return;
      }

      // Regular user login
      const foundUser = allUsers.find(u => u.username === username && u.pin === pin);
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      } else {
        setError('Неверное имя пользователя или PIN-код.');
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ 
      bgcolor: darkBg, 
      minHeight: '100vh', 
      color: textLight, 
      py: 4,
      background: `linear-gradient(135deg, ${darkBg} 0%, #1a1c23 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,191,255,0.1) 0%, transparent 50%)',
        animation: 'pulse 8s infinite',
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        }
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <img 
                  src="/roblox_character.png" 
                  alt="Roblox Character" 
                  style={{ 
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    filter: 'drop-shadow(0 0 20px rgba(0,191,255,0.3))',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' },
                      '100%': { transform: 'translateY(0px)' }
                    }
                  }} 
                />
              </Box>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Card sx={{ 
                bgcolor: cardBg, 
                borderRadius: '20px', 
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography 
                      variant="h4" 
                      component="h1" 
                      gutterBottom 
                      sx={{ 
                        color: accent, 
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0,191,255,0.3)',
                        mb: 2
                      }}
                    >
                      {isRegisterMode ? 'Регистрация' : 'Вход в RobuxPlanet'}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#b0b8d1',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isRegisterMode ? 'Создайте свой аккаунт' : 'Используйте свой ник и PIN-код для входа'}
                    </Typography>
                  </Box>

                  {avatarUrl && (
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 3,
                      animation: 'glow 2s infinite alternate',
                      '@keyframes glow': {
                        '0%': { filter: 'drop-shadow(0 0 5px rgba(0,191,255,0.5))' },
                        '100%': { filter: 'drop-shadow(0 0 20px rgba(0,191,255,0.8))' }
                      }
                    }}>
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
                          '& fieldset': { 
                            borderColor: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.3s'
                          },
                          '&:hover fieldset': { 
                            borderColor: accent,
                            boxShadow: `0 0 10px ${accent}40`
                          },
                          '&.Mui-focused fieldset': { 
                            borderColor: accent,
                            boxShadow: `0 0 15px ${accent}40`
                          },
                          bgcolor: 'rgba(0,0,0,0.2)',
                          color: textLight,
                          borderRadius: '12px'
                        },
                        '& .MuiInputLabel-root': { 
                          color: '#b0b8d1',
                          '&.Mui-focused': { color: accent }
                        },
                        '& .MuiInputBase-input': { 
                          color: textLight,
                          '&::placeholder': { color: 'rgba(255,255,255,0.5)' }
                        },
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
                          '& fieldset': { 
                            borderColor: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.3s'
                          },
                          '&:hover fieldset': { 
                            borderColor: accent,
                            boxShadow: `0 0 10px ${accent}40`
                          },
                          '&.Mui-focused fieldset': { 
                            borderColor: accent,
                            boxShadow: `0 0 15px ${accent}40`
                          },
                          bgcolor: 'rgba(0,0,0,0.2)',
                          color: textLight,
                          borderRadius: '12px'
                        },
                        '& .MuiInputLabel-root': { 
                          color: '#b0b8d1',
                          '&.Mui-focused': { color: accent }
                        },
                        '& .MuiInputBase-input': { 
                          color: textLight,
                          '&::placeholder': { color: 'rgba(255,255,255,0.5)' }
                        },
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
                            '& fieldset': { 
                              borderColor: 'rgba(255,255,255,0.1)',
                              transition: 'all 0.3s'
                            },
                            '&:hover fieldset': { 
                              borderColor: accent,
                              boxShadow: `0 0 10px ${accent}40`
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: accent,
                              boxShadow: `0 0 15px ${accent}40`
                            },
                            bgcolor: 'rgba(0,0,0,0.2)',
                            color: textLight,
                            borderRadius: '12px'
                          },
                          '& .MuiInputLabel-root': { 
                            color: '#b0b8d1',
                            '&.Mui-focused': { color: accent }
                          },
                          '& .MuiInputBase-input': { 
                            color: textLight,
                            '&::placeholder': { color: 'rgba(255,255,255,0.5)' }
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <LockIcon sx={{ color: accent, mr: 1 }} />
                          ),
                        }}
                      />
                    )}

                    {error && (
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 3, 
                          bgcolor: 'rgba(211, 47, 47, 0.1)',
                          border: '1px solid rgba(211, 47, 47, 0.2)',
                          borderRadius: '12px'
                        }}
                      >
                        {error}
                      </Alert>
                    )}

                    {success && (
                      <Alert 
                        severity="success" 
                        sx={{ 
                          mb: 3, 
                          bgcolor: 'rgba(46, 125, 50, 0.1)',
                          border: '1px solid rgba(46, 125, 50, 0.2)',
                          borderRadius: '12px',
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
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                        transition: 'all 0.3s',
                        bgcolor: accent,
                        color: textLight,
                        '&:hover': { 
                          boxShadow: '0 8px 32px 0 rgba(0,191,255,0.25)',
                          bgcolor: accent2,
                          transform: 'translateY(-2px)'
                        },
                        '&:disabled': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.5)'
                        }
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
                      sx={{ 
                        color: accent, 
                        textTransform: 'none',
                        '&:hover': {
                          color: accent2,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login; 