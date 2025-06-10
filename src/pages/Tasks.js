import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  useTheme,
  Fade,
  Zoom,
  TextField,
  Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const tasks = [
  {
    id: 1,
    title: 'Подписка на YouTube',
    description: 'Подпишитесь на наш YouTube канал, чтобы получать последние новости и бонусы.',
    reward: 20,
    type: 'youtube',
    link: 'https://www.youtube.com/'
  },
  {
    id: 3,
    title: 'Лайк на видео',
    description: 'Поставьте лайк на наше последнее видео, чтобы поддержать нас.',
    reward: 25,
    type: 'youtube',
    link: 'https://www.youtube.com/watch?v=EXAMPLE'
  },
  {
    id: 4,
    title: 'Приглашение друга',
    description: 'Пригласите друга на сайт, и получите бонус, когда он выполнит первое задание.',
    reward: 50,
    type: 'referral',
  },
  {
    id: 5,
    title: 'Оставить отзыв',
    description: 'Оставьте честный отзыв о нашем сайте и помогите другим пользователям.',
    reward: 30,
    type: 'text',
  },
];

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  if (!user.completedTasks) user.completedTasks = [];
  if (!user.balance) user.balance = 0;
  if (!user.history) user.history = [];
  if (!user.achievements) user.achievements = [];
  return user;
};

const saveUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(getUserData());
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const theme = useTheme();

  React.useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(user.completedTasks));
  }, [user.completedTasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      if (!user.completedTasks.includes(selectedTask.id)) {
        const newUser = { ...user };
        newUser.completedTasks = [...newUser.completedTasks, selectedTask.id];
        newUser.balance = (newUser.balance || 0) + selectedTask.reward;
        newUser.history = [
          {
            type: 'task',
            amount: selectedTask.reward,
            date: new Date().toISOString(),
            desc: `Выполнено задание: ${selectedTask.title}`
          },
          ...(newUser.history || [])
        ];
        // Ачивка за первое задание
        if (!newUser.achievements.includes('first-task')) {
          newUser.achievements.push('first-task');
        }
        saveUserData(newUser);
        setUser(newUser);
        setSnackbar({ open: true, message: `Задание "${selectedTask.title}" выполнено! +${selectedTask.reward} R$`, type: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Это задание уже выполнено!', type: 'info' });
      }
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ bgcolor: cardBg, color: textLight, p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: accent, mb: 2 }}>
            Войдите, чтобы выполнять задания
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
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: accent }}>
            Задания для получения Robux
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {tasks.map((task, index) => {
            const isCompleted = user.completedTasks.includes(task.id);
            return (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Zoom in timeout={300} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '15px',
                      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)',
                      bgcolor: cardBg,
                      color: textLight,
                      transition: 'all 0.3s',
                      opacity: isCompleted ? 0.7 : 1,
                      border: isCompleted ? `2px solid ${accent}` : `1px solid ${cardBg}`,
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: isCompleted ? 'none' : 'translateY(-4px)',
                        boxShadow: '0 8px 32px 0 rgba(0,191,255,0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        {task.type === 'youtube' && <YouTubeIcon sx={{ fontSize: 50, color: accent2 }} />}
                        {task.type === 'referral' && <PersonAddIcon sx={{ fontSize: 50, color: accent2 }} />}
                        {task.type === 'text' && <EmojiEventsIcon sx={{ fontSize: 50, color: accent }} />}
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: accent }}>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="#b0b8d1" align="center" sx={{ mb: 2 }}>
                        {task.description}
                      </Typography>
                      <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                        <Typography variant="h6" sx={{ color: accent2, fontWeight: 'bold' }}>
                          <EmojiEventsIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Награда: {task.reward} R$
                        </Typography>
                      </Box>
                    </CardContent>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleTaskClick(task)}
                      disabled={isCompleted}
                      sx={{
                        py: 1.5,
                        borderRadius: '0 0 15px 15px',
                        fontWeight: 'bold',
                        bgcolor: accent,
                        color: textLight,
                        boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: accent2,
                          boxShadow: '0 8px 32px 0 rgba(255,64,129,0.18)',
                        },
                      }}
                    >
                      {isCompleted ? 'Задание Выполнено' : 'Выполнить Задание'}
                    </Button>
                  </Card>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="task-dialog-title"
          sx={{ '& .MuiPaper-root': { borderRadius: '15px', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)', bgcolor: cardBg, color: textLight } }}
        >
          {selectedTask && (
            <>
              <DialogTitle id="task-dialog-title" sx={{ bgcolor: accent, color: textLight, fontWeight: 'bold' }}>
                {selectedTask.title}
              </DialogTitle>
              <DialogContent dividers sx={{ p: 3 }}>
                <Typography variant="body1" gutterBottom sx={{ mb: 2, color: textLight }}>
                  {selectedTask.description}
                </Typography>
                <Typography variant="h6" sx={{ color: accent2, fontWeight: 'bold' }}>
                  Награда: {selectedTask.reward} R$
                </Typography>
                {selectedTask.link && (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      href={selectedTask.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        py: 1.2,
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                        transition: 'all 0.3s',
                        bgcolor: accent2,
                        color: textLight,
                        '&:hover': { 
                          boxShadow: '0 8px 32px 0 rgba(255,64,129,0.18)', 
                          bgcolor: accent 
                        },
                      }}
                    >
                      {selectedTask.type === 'youtube' && 'Перейти на YouTube'}
                    </Button>
                  </Box>
                )}
                {selectedTask.type === 'referral' && (
                  <Alert severity="info" sx={{ mt: 2, bgcolor: darkBg, color: textLight, border: `1px solid ${accent}` }}>
                    Для этого задания вам нужно пригласить друга по вашей реферальной ссылке.
                    (Эта функция пока не реализована, это пример.)
                  </Alert>
                )}
                {selectedTask.type === 'text' && (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Ваш отзыв"
                    variant="outlined"
                    sx={{ 
                      mt: 2,
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
                )}
              </DialogContent>
              <DialogActions sx={{ p: 2, bgcolor: cardBg }}>
                <Button 
                  onClick={() => setOpenDialog(false)}
                  sx={{ 
                    color: textLight,
                    '&:hover': { color: accent }
                  }}
                >
                  Отмена
                </Button>
                <Button 
                  onClick={handleCompleteTask}
                  variant="contained"
                  sx={{
                    bgcolor: accent,
                    color: textLight,
                    '&:hover': { bgcolor: accent2 },
                  }}
                >
                  Выполнить
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: accent, mb: 2, fontWeight: 'bold' }}>
            Ваши достижения
          </Typography>
          {user.achievements && user.achievements.length > 0 ? (
            user.achievements.map((ach, idx) => (
              <Chip
                key={ach}
                icon={<EmojiEventsIcon />}
                label={ach === 'first-task' ? 'Первое задание!' : ach}
                sx={{ bgcolor: accent2, color: textLight, fontWeight: 'bold', fontSize: '1rem', m: 1 }}
              />
            ))
          ) : (
            <Chip label="Нет достижений" />
          )}
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.type} 
            sx={{ 
              width: '100%', 
              bgcolor: snackbar.type === 'success' ? accent : accent2,
              color: textLight,
              '& .MuiAlert-icon': { color: textLight }
            }}
          >
            <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Tasks; 