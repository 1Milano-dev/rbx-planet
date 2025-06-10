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
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DiscordIcon from '@mui/icons-material/Discord';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const tasks = [
  {
    id: 1,
    title: 'Подписка на YouTube',
    description: 'Подпишитесь на наш YouTube канал, чтобы получать последние новости и бонусы.',
    reward: 50,
    type: 'youtube',
    link: 'https://www.youtube.com/',
  },
  {
    id: 2,
    title: 'Вступление в Discord',
    description: 'Присоединитесь к нашему Discord серверу для общения с другими игроками.',
    reward: 100,
    type: 'discord',
    link: 'https://discord.com/',
  },
  {
    id: 3,
    title: 'Лайк на видео',
    description: 'Поставьте лайк на наше последнее видео, чтобы поддержать нас.',
    reward: 25,
    type: 'youtube',
    link: 'https://www.youtube.com/watch?v=EXAMPLE',
  },
  {
    id: 4,
    title: 'Приглашение друга',
    description: 'Пригласите друга на сайт, и получите бонус, когда он выполнит первое задание.',
    reward: 200,
    type: 'referral',
  },
  {
    id: 5,
    title: 'Оставить отзыв',
    description: 'Оставьте честный отзыв о нашем сайте и помогите другим пользователям.',
    reward: 75,
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
    <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 5 }}>
        Задания для получения Robux
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '15px',
                  boxShadow: theme.shadows[3],
                  transition: 'all 0.3s ease-in-out',
                  opacity: isCompleted ? 0.7 : 1,
                  border: isCompleted ? `2px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': {
                    transform: isCompleted ? 'none' : 'translateY(-5px)',
                    boxShadow: isCompleted ? theme.shadows[3] : theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {task.type === 'youtube' && <YouTubeIcon sx={{ fontSize: 50, color: theme.palette.error.main }} />}
                    {task.type === 'discord' && <DiscordIcon sx={{ fontSize: 50, color: theme.palette.info.main }} />}
                    {task.type === 'referral' && <PersonAddIcon sx={{ fontSize: 50, color: theme.palette.warning.main }} />}
                    {task.type === 'text' && <EmojiEventsIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                    {task.description}
                  </Typography>
                  <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                    <Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
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
                    bgcolor: isCompleted ? theme.palette.success.light : theme.palette.primary.main,
                    color: theme.palette.common.white,
                    '&:hover': {
                      bgcolor: isCompleted ? theme.palette.success.light : theme.palette.primary.dark,
                    },
                  }}
                >
                  {isCompleted ? 'Задание Выполнено' : 'Выполнить Задание'}
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="task-dialog-title"
        sx={{ '& .MuiPaper-root': { borderRadius: '15px', boxShadow: theme.shadows[10], bgcolor: theme.palette.background.paper } }}
      >
        {selectedTask && (
          <>
            <DialogTitle id="task-dialog-title" sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.common.white, fontWeight: 'bold' }}>
              {selectedTask.title}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Typography variant="body1" gutterBottom sx={{ mb: 2, color: theme.palette.text.primary }}>
                {selectedTask.description}
              </Typography>
              <Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
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
                      boxShadow: theme.shadows[3],
                      '&:hover': { boxShadow: theme.shadows[6] },
                    }}
                  >
                    {selectedTask.type === 'youtube' && 'Перейти на YouTube'}
                    {selectedTask.type === 'discord' && 'Присоединиться к Discord'}
                  </Button>
                </Box>
              )}
              {selectedTask.type === 'referral' && (
                <Alert severity="info" sx={{ mt: 2 }}>
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
                  sx={{ mt: 2 }}
                />
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: theme.palette.background.default }}>
              <Button onClick={() => setOpenDialog(false)} sx={{ color: theme.palette.text.secondary }}>
                Отмена
              </Button>
              <Button onClick={handleCompleteTask} variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Tasks; 