import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Badge,
  useTheme,
  Fade,
  Zoom,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Star as StarIcon,
  LocalOffer as TagIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

const rarityColors = {
  common: '#9E9E9E',
  rare: '#2196F3',
  epic: '#9C27B0',
  legendary: '#FFD700'
};

const Shop = () => {
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Здесь будет загрузка предметов и активного события
    // Это заглушка для демонстрации
    setItems([
      {
        id: 1,
        name: 'VIP Статус',
        description: 'Особые привилегии и бонусы',
        type: 'premium',
        price: { robux: 500, discount: 20 },
        image: '/vip-badge.png',
        rarity: 'epic',
        features: [
          { name: 'Бонус к покупкам', description: '+10% к каждой покупке', icon: '🎁' },
          { name: 'Особый значок', description: 'Эксклюзивный значок VIP', icon: '⭐' }
        ]
      },
      {
        id: 2,
        name: 'Лимитированный набор',
        description: 'Эксклюзивный набор предметов',
        type: 'limited',
        price: { robux: 1000 },
        image: '/limited-set.png',
        rarity: 'legendary',
        stock: 10,
        features: [
          { name: 'Уникальный дизайн', description: 'Только для избранных', icon: '🎨' },
          { name: 'Особые эффекты', description: 'Анимированные эффекты', icon: '✨' }
        ]
      }
    ]);

    setActiveEvent({
      name: 'Черная пятница',
      description: 'Скидки до 50% на все товары!',
      type: 'discount',
      discount: 50,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
  }, []);

  const handlePurchase = (item) => {
    // Здесь будет логика покупки
    console.log('Purchasing item:', item);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Активное событие */}
      {activeEvent && (
        <Fade in={true}>
          <Card sx={{ mb: 4, background: 'linear-gradient(45deg, #FF4081 30%, #FF9100 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {activeEvent.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {activeEvent.description}
              </Typography>
              {activeEvent.type === 'discount' && (
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Скидка {activeEvent.discount}%
                </Typography>
              )}
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TimerIcon sx={{ mr: 1 }} />
                <Typography>
                  До конца акции: {Math.ceil((activeEvent.endDate - new Date()) / (24 * 60 * 60 * 1000))} дней
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Категории */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {['all', 'limited', 'premium', 'special', 'regular'].map((category) => (
          <Chip
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      {/* Сетка предметов */}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Zoom in={true}>
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
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {item.name}
                    </Typography>
                    <Chip
                      label={item.rarity}
                      sx={{
                        bgcolor: rarityColors[item.rarity],
                        color: 'white'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  {item.features && (
                    <Box sx={{ mb: 2 }}>
                      {item.features.map((feature, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ mr: 1 }}>
                            {feature.icon}
                          </Typography>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {feature.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <Typography variant="h6" color="primary">
                        {item.price.robux} Robux
                      </Typography>
                      {item.price.discount > 0 && (
                        <Typography variant="caption" color="error" sx={{ textDecoration: 'line-through' }}>
                          {Math.round(item.price.robux * (1 + item.price.discount / 100))} Robux
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CartIcon />}
                      onClick={() => handlePurchase(item)}
                    >
                      Купить
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop; 