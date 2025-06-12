import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  Fade,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

const Leaderboard = () => {
  const theme = useTheme();
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeFrame, setTimeFrame] = useState('weekly');

  useEffect(() => {
    // Здесь будет загрузка данных таблицы лидеров
    // Это заглушка для демонстрации
    setLeaderboard([
      {
        id: 1,
        username: 'ProGamer123',
        avatar: '/avatars/1.png',
        level: 50,
        experience: 15000,
        purchases: 25,
        totalSpent: 5000,
        rank: 1,
        rankChange: 0
      },
      {
        id: 2,
        username: 'RobloxMaster',
        avatar: '/avatars/2.png',
        level: 45,
        experience: 12000,
        purchases: 20,
        totalSpent: 4000,
        rank: 2,
        rankChange: 1
      },
      {
        id: 3,
        username: 'GameChanger',
        avatar: '/avatars/3.png',
        level: 40,
        experience: 10000,
        purchases: 15,
        totalSpent: 3000,
        rank: 3,
        rankChange: -1
      }
    ]);
  }, [timeFrame]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Золото
      case 2:
        return '#C0C0C0'; // Серебро
      case 3:
        return '#CD7F32'; // Бронза
      default:
        return theme.palette.text.primary;
    }
  };

  const getRankChangeIcon = (change) => {
    if (change > 0) {
      return <TrendingUpIcon sx={{ color: 'success.main' }} />;
    } else if (change < 0) {
      return <TrendingDownIcon sx={{ color: 'error.main' }} />;
    }
    return null;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Таблица лидеров
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['daily', 'weekly', 'monthly', 'allTime'].map((frame) => (
            <Chip
              key={frame}
              label={frame.charAt(0).toUpperCase() + frame.slice(1)}
              onClick={() => setTimeFrame(frame)}
              color={timeFrame === frame ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ранг</TableCell>
                  <TableCell>Игрок</TableCell>
                  <TableCell align="right">Уровень</TableCell>
                  <TableCell align="right">Опыт</TableCell>
                  <TableCell align="right">Покупки</TableCell>
                  <TableCell align="right">Потрачено</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((player) => (
                  <Fade in={true} key={player.id}>
                    <TableRow
                      sx={{
                        '&:hover': {
                          bgcolor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: getRankColor(player.rank),
                              fontWeight: 'bold',
                              mr: 1
                            }}
                          >
                            #{player.rank}
                          </Typography>
                          {getRankChangeIcon(player.rankChange)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={player.avatar}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="body1">
                            {player.username}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <StarIcon sx={{ color: '#FFD700', mr: 1 }} />
                          <Typography>
                            {player.level}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>
                          {player.experience.toLocaleString()} XP
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>
                          {player.purchases}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                          {player.totalSpent.toLocaleString()} Robux
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Leaderboard; 