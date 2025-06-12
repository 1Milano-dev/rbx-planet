import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Button,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Share as ShareIcon,
  CardGiftcard as GiftIcon,
} from '@mui/icons-material';

const UserProfile = ({ user }) => {
  const [dailyBonus, setDailyBonus] = useState(null);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Здесь будет загрузка достижений и проверка ежедневного бонуса
    // Это заглушка для демонстрации
    setDailyBonus({
      canClaim: true,
      amount: 10,
      streak: 3
    });
    setAchievements([
      { name: 'Первая покупка', description: 'Совершите первую покупку', icon: '🎮', progress: 100 },
      { name: 'Верный клиент', description: 'Совершите 5 покупок', icon: '👑', progress: 60 },
      { name: 'Реферал', description: 'Пригласите друга', icon: '👥', progress: 0 }
    ]);
  }, [user]);

  const handleClaimBonus = () => {
    // Здесь будет логика получения бонуса
    console.log('Claiming daily bonus...');
  };

  const handleShareReferral = () => {
    // Здесь будет логика шаринга реферальной ссылки
    const referralLink = `https://rbxplanet.com/ref/${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    // Показать уведомление о копировании
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Профиль пользователя */}
      <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
        <CardContent sx={{ color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: '#2196F3' }}>
                {user.username[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {user.username}
              </Typography>
              <Typography variant="body1">
                Уровень {user.level} • {user.experience} XP
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(user.experience / user.getNextLevelExp()) * 100}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {user.balance} Robux
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Ежедневный бонус */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <GiftIcon sx={{ fontSize: 40, color: '#FFD700' }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Ежедневный бонус
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Серия: {dailyBonus?.streak} дней
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={!dailyBonus?.canClaim}
                onClick={handleClaimBonus}
              >
                Получить {dailyBonus?.amount} Robux
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Достижения */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        <TrophyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Достижения
      </Typography>
      <Grid container spacing={2}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    {achievement.icon}
                  </Typography>
                  <Typography variant="h6">{achievement.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {achievement.description}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={achievement.progress}
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Реферальная система */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ShareIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Пригласите друга
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Получите 50 Robux за каждого приглашенного друга
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Скопировать реферальную ссылку">
                <IconButton onClick={handleShareReferral} color="primary">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile; 