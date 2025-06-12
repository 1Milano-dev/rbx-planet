import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Event as EventIcon,
  Timer as TimerIcon,
  LocalOffer as TagIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Events = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Здесь будет загрузка событий
    // Это заглушка для демонстрации
    setEvents([
      {
        id: 1,
        name: 'Черная пятница',
        description: 'Скидки до 50% на все товары!',
        type: 'discount',
        discount: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        participants: 150,
        maxParticipants: 1000
      },
      {
        id: 2,
        name: 'Новогодний марафон',
        description: 'Получайте бонусы за каждую покупку',
        type: 'bonus',
        bonusMultiplier: 2,
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        participants: 75,
        maxParticipants: 500
      },
      {
        id: 3,
        name: 'VIP Неделя',
        description: 'Особые привилегии для VIP игроков',
        type: 'special',
        specialRewards: [
          { name: 'Двойной опыт', description: 'Получайте в 2 раза больше опыта' },
          { name: 'Эксклюзивные предметы', description: 'Доступ к особому магазину' }
        ],
        startDate: new Date(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        participants: 30,
        maxParticipants: 100
      }
    ]);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'discount':
        return <TagIcon />;
      case 'bonus':
        return <StarIcon />;
      case 'special':
        return <EventIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'discount':
        return '#FF4081';
      case 'bonus':
        return '#FFD700';
      case 'special':
        return '#9C27B0';
      default:
        return '#2196F3';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Активные события
      </Typography>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: getEventColor(event.type),
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                      color: 'white'
                    }}
                  >
                    {getEventIcon(event.type)}
                  </Box>
                  <Typography variant="h6" component="h2">
                    {event.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>

                {event.type === 'discount' && (
                  <Chip
                    label={`Скидка ${event.discount}%`}
                    color="error"
                    sx={{ mb: 2 }}
                  />
                )}

                {event.type === 'bonus' && (
                  <Chip
                    label={`x${event.bonusMultiplier} бонус`}
                    color="warning"
                    sx={{ mb: 2 }}
                  />
                )}

                {event.specialRewards && (
                  <Box sx={{ mb: 2 }}>
                    {event.specialRewards.map((reward, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <StarIcon sx={{ color: '#FFD700', mr: 1, fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {reward.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {reward.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      До конца: {Math.ceil((event.endDate - new Date()) / (24 * 60 * 60 * 1000))} дней
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Участников: {event.participants}/{event.maxParticipants}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(event.participants / event.maxParticipants) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Events; 