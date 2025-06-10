import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const prizes = [
  { type: 'robux', amount: 1, label: '+1 R$', color: accent },
  { type: 'robux', amount: 3, label: '+3 R$', color: accent2 },
  { type: 'robux', amount: 5, label: '+5 R$', color: accent },
  { type: 'robux', amount: 10, label: '+10 R$', color: accent2 },
  { type: 'empty', label: 'Пусто', color: '#888' },
  { type: 'ach', label: 'Ачивка!', color: '#ffd700' },
  { type: 'robux', amount: 2, label: '+2 R$', color: accent },
  { type: 'empty', label: 'Пусто', color: '#888' },
];

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  if (!user.lastWheel) user.lastWheel = null;
  if (!user.balance) user.balance = 0;
  if (!user.history) user.history = [];
  if (!user.achievements) user.achievements = [];
  return user;
};

const saveUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const Wheel = () => {
  const [user, setUser] = useState(getUserData());
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const wheelRef = useRef();

  // Проверка доступности прокрута
  const canSpin = () => {
    if (!user) return false;
    if (!user.lastWheel) return true;
    const last = new Date(user.lastWheel);
    const now = new Date();
    return now - last > 24 * 60 * 60 * 1000;
  };

  const handleSpin = () => {
    if (!canSpin() || spinning) return;
    setSpinning(true);
    // Выбираем случайный сектор
    const idx = Math.floor(Math.random() * prizes.length);
    const angle = 360 * 5 + (360 / prizes.length) * idx + (360 / prizes.length) / 2;
    setWheelAngle(angle);
    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[idx]);
      setOpenDialog(true);
      // Обновляем пользователя
      const newUser = { ...user };
      newUser.lastWheel = new Date().toISOString();
      if (prizes[idx].type === 'robux') {
        newUser.balance = (newUser.balance || 0) + prizes[idx].amount;
        newUser.history = [
          {
            type: 'wheel',
            amount: prizes[idx].amount,
            date: new Date().toISOString(),
            desc: `Колесо фортуны: +${prizes[idx].amount} R$`
          },
          ...(newUser.history || [])
        ];
      }
      if (prizes[idx].type === 'ach' && !newUser.achievements.includes('wheel-ach')) {
        newUser.achievements.push('wheel-ach');
      }
      saveUserData(newUser);
      setUser(newUser);
    }, 3500);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ bgcolor: cardBg, color: textLight, p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: accent, mb: 2 }}>
            Войдите, чтобы крутить колесо фортуны
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
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', mb: 4, p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: accent, fontWeight: 'bold', mb: 3 }}>
              Колесо фортуны
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                ref={wheelRef}
                sx={{
                  width: 260,
                  height: 260,
                  borderRadius: '50%',
                  border: `8px solid ${accent}`,
                  bgcolor: cardBg,
                  position: 'relative',
                  boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                  transition: 'transform 3.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: `rotate(${wheelAngle}deg)`
                }}
              >
                {prizes.map((prize, idx) => {
                  const angle = (360 / prizes.length) * idx;
                  return (
                    <Box
                      key={idx}
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '50%',
                        height: '50%',
                        transform: `rotate(${angle}deg) translateY(-100%)`,
                        transformOrigin: '0% 100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        pr: 2
                      }}
                    >
                      <Box sx={{
                        bgcolor: prize.color,
                        color: '#fff',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        fontWeight: 'bold',
                        fontSize: 16,
                        minWidth: 60,
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        {prize.type === 'robux' && <MonetizationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />}
                        {prize.type === 'ach' && <EmojiEventsIcon sx={{ fontSize: 18, mr: 0.5 }} />}
                        {prize.label}
                      </Box>
                    </Box>
                  );
                })}
                {/* Стрелка */}
                <Box sx={{
                  position: 'absolute',
                  left: '50%',
                  top: -24,
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '16px solid transparent',
                  borderRight: '16px solid transparent',
                  borderBottom: `24px solid ${accent2}`
                }} />
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSpin}
              disabled={!canSpin() || spinning}
              sx={{
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 'bold',
                bgcolor: accent,
                color: textLight,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: accent2 },
                mb: 2
              }}
            >
              {canSpin() ? (spinning ? 'Крутим...' : 'Крутить колесо') : 'Доступно через 24 часа'}
            </Button>
          </Card>
        </Fade>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ bgcolor: cardBg, color: accent, fontWeight: 'bold' }}>Результат</DialogTitle>
          <DialogContent sx={{ bgcolor: darkBg, color: textLight, textAlign: 'center' }}>
            {result && result.type === 'robux' && (
              <>
                <MonetizationOnIcon sx={{ fontSize: 48, color: accent2, mb: 1 }} />
                <Typography variant="h5" sx={{ color: accent2, fontWeight: 'bold' }}>+{result.amount} R$</Typography>
                <Typography variant="body1">Поздравляем! Robux зачислены на ваш баланс.</Typography>
              </>
            )}
            {result && result.type === 'ach' && (
              <>
                <EmojiEventsIcon sx={{ fontSize: 48, color: '#ffd700', mb: 1 }} />
                <Typography variant="h5" sx={{ color: '#ffd700', fontWeight: 'bold' }}>Ачивка!</Typography>
                <Typography variant="body1">Вы получили уникальную ачивку за колесо фортуны!</Typography>
              </>
            )}
            {result && result.type === 'empty' && (
              <>
                <Typography variant="h5" sx={{ color: '#888', fontWeight: 'bold', mb: 1 }}>Пусто</Typography>
                <Typography variant="body1">В следующий раз обязательно повезёт!</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ bgcolor: cardBg }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: accent }}>Понятно</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Wheel; 