import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Fade,
  Chip,
  Tooltip
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import CelebrationIcon from '@mui/icons-material/Celebration';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  if (!user.balance) user.balance = 0;
  if (!user.history) user.history = [];
  if (!user.achievements) user.achievements = [];
  if (!user.lastBonus) user.lastBonus = null;
  return user;
};

const saveUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const Profile = () => {
  const [user, setUser] = useState(getUserData());
  const [bonusTimer, setBonusTimer] = useState(0);
  const [bonusAvailable, setBonusAvailable] = useState(false);
  const [animateBalance, setAnimateBalance] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!user.lastBonus) {
      setBonusAvailable(true);
      setBonusTimer(0);
      return;
    }
    const last = new Date(user.lastBonus);
    const now = new Date();
    const diff = 24 * 60 * 60 * 1000 - (now - last);
    if (diff <= 0) {
      setBonusAvailable(true);
      setBonusTimer(0);
    } else {
      setBonusAvailable(false);
      setBonusTimer(diff);
      const interval = setInterval(() => {
        setBonusTimer((t) => {
          if (t <= 1000) {
            clearInterval(interval);
            setBonusAvailable(true);
            return 0;
          }
          return t - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const formatTimer = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBonus = () => {
    if (!user) return;
    const newUser = { ...user };
    newUser.balance = (newUser.balance || 0) + 1;
    newUser.lastBonus = new Date().toISOString();
    newUser.history = [
      {
        type: 'bonus',
        amount: 1,
        date: new Date().toISOString(),
        desc: 'Ежедневный бонус'
      },
      ...(newUser.history || [])
    ];
    if (!newUser.achievements.includes('first-bonus')) {
      newUser.achievements.push('first-bonus');
    }
    saveUserData(newUser);
    setUser(newUser);
    setAnimateBalance(true);
    setTimeout(() => setAnimateBalance(false), 1000);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ bgcolor: cardBg, color: textLight, p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: accent, mb: 2 }}>
            Войдите, чтобы увидеть личный кабинет
          </Typography>
          <Button href="/login" variant="contained" color="primary">
            Войти
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', mb: 4, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={user.avatarUrl}
                alt={user.username}
                sx={{ width: 64, height: 64, border: `2px solid ${accent}` }}
              />
              <Box>
                <Typography variant="h5" sx={{ color: accent, fontWeight: 'bold' }}>{user.username}</Typography>
                <Chip
                  icon={<MonetizationOnIcon />}
                  label={<span style={{ fontWeight: 700 }}>{user.balance} R$</span>}
                  sx={{
                    bgcolor: animateBalance ? accent2 : accent,
                    color: textLight,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    ml: 1,
                    transition: 'all 0.5s',
                  }}
                />
              </Box>
            </Box>
            <Divider sx={{ my: 2, bgcolor: accent }} />
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Tooltip title={bonusAvailable ? 'Получить ежедневный бонус' : 'Бонус можно получить раз в 24 часа'}>
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleBonus}
                    disabled={!bonusAvailable}
                    sx={{
                      bgcolor: bonusAvailable ? accent : cardBg,
                      color: textLight,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      boxShadow: bonusAvailable ? '0 4px 24px 0 rgba(0,191,255,0.15)' : 'none',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: accent2
                      },
                    }}
                  >
                    {bonusAvailable ? 'Получить ежедневный бонус (+1 R$)' : `Бонус через ${formatTimer(bonusTimer)}`}
                  </Button>
                </span>
              </Tooltip>
            </Box>
            <Divider sx={{ my: 2, bgcolor: accent }} />
            <Typography variant="h6" sx={{ color: accent, mb: 1, fontWeight: 'bold' }}>
              История операций
            </Typography>
            <List>
              {user.history && user.history.length > 0 ? (
                user.history.slice(0, 10).map((item, idx) => (
                  <Fade in timeout={600 + idx * 100} key={idx}>
                    <ListItem>
                      <ListItemAvatar>
                        {item.type === 'bonus' ? (
                          <CelebrationIcon sx={{ color: accent2 }} />
                        ) : (
                          <HistoryIcon sx={{ color: accent }} />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.desc || 'Операция'}
                        secondary={
                          <>
                            <span style={{ color: accent, fontWeight: 700 }}>+{item.amount} R$</span> &nbsp;
                            <span style={{ color: '#b0b8d1' }}>{new Date(item.date).toLocaleString('ru-RU')}</span>
                          </>
                        }
                      />
                    </ListItem>
                  </Fade>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Нет операций" />
                </ListItem>
              )}
            </List>
            <Divider sx={{ my: 2, bgcolor: accent }} />
            <Typography variant="h6" sx={{ color: accent, mb: 1, fontWeight: 'bold' }}>
              Достижения
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {user.achievements && user.achievements.length > 0 ? (
                user.achievements.map((ach, idx) => (
                  <Chip
                    key={ach}
                    icon={<EmojiEventsIcon />}
                    label={ach === 'first-bonus' ? 'Первый бонус!' : ach}
                    sx={{ bgcolor: accent2, color: textLight, fontWeight: 'bold', fontSize: '1rem' }}
                  />
                ))
              ) : (
                <Chip label="Нет достижений" />
              )}
            </Box>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Profile;
 