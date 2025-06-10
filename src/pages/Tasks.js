import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  useTheme,
  Fade,
  Zoom,
  TextField
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem('completedTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const theme = useTheme();

  React.useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      if (!completedTasks.includes(selectedTask.id)) {
        setCompletedTasks([...completedTasks, selectedTask.id]);
        setSnackbarMessage(`Задание "${selectedTask.title}" выполнено! Робуксы ${selectedTask.reward} R$ будут начислены.`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Это задание уже выполнено!');
        setSnackbarSeverity('info');
        setOpenSnackbar(true);
      }
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 6 }}>
      <Container maxWidth="lg">
        <Fade in timeout={900}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: accent, fontWeight: 'bold', mb: 5 }}>
            Задания для получения Robux
          </Typography>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          {tasks.map((task, i) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Zoom in style={{ transitionDelay: `${300 + i * 120}ms` }}>
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
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: `0 8px 32px 0 ${accent}55`,
                        transform: isCompleted ? 'none' : 'translateY(-7px) scale(1.03)',
                        border: `2px solid ${accent}`,
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
                          color: '#fff',
                          boxShadow: '0 8px 32px 0 rgba(255,64,129,0.18)',
                          transform: 'scale(1.04)',
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
                        '&:hover': { boxShadow: '0 8px 32px 0 rgba(255,64,129,0.18)', bgcolor: accent, color: '#fff' },
                      }}
                    >
                      {selectedTask.type === 'youtube' && 'Перейти на YouTube'}
                    </Button>
                  </Box>
                )}
                {selectedTask.type === 'referral' && (
                  <Alert severity="info" sx={{ mt: 2, bgcolor: cardBg, color: textLight, border: `1px solid ${accent}` }}>
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
                    sx={{ mt: 2, bgcolor: darkBg, color: textLight, '& .MuiInputBase-input': { color: textLight } }}
                  />
                )}
              </DialogContent>
              <DialogActions sx={{ p: 2, bgcolor: darkBg }}>
                <Button onClick={() => setOpenDialog(false)} sx={{ color: '#b0b8d1' }}>
                  Отмена
                </Button>
                <Button onClick={handleCompleteTask} variant="contained" sx={{ fontWeight: 'bold', bgcolor: accent, color: textLight, '&:hover': { bgcolor: accent2, color: '#fff' } }}>
                  Подтвердить Выполнение
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', bgcolor: accent, color: textLight }}>
            <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Tasks; 