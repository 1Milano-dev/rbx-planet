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
} from '@mui/material';

const tasks = [
  {
    id: 1,
    title: 'Подписка на YouTube',
    description: 'Подпишитесь на наш YouTube канал',
    reward: 50,
    type: 'youtube',
  },
  {
    id: 2,
    title: 'Вступление в Discord',
    description: 'Присоединитесь к нашему Discord серверу',
    reward: 100,
    type: 'discord',
  },
  {
    id: 3,
    title: 'Лайк на видео',
    description: 'Поставьте лайк на наше последнее видео',
    reward: 25,
    type: 'youtube',
  },
  {
    id: 4,
    title: 'Приглашение друга',
    description: 'Пригласите друга на сайт',
    reward: 200,
    type: 'referral',
  },
];

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowDialog(true);
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      setCompletedTasks([...completedTasks, selectedTask.id]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    setShowDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Задания для получения робуксов
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Задание выполнено! Робуксы будут начислены в течение 24 часов.
        </Alert>
      )}

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {task.description}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <Typography variant="h6" color="primary">
                    Награда: {task.reward} R$
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleTaskClick(task)}
                  disabled={completedTasks.includes(task.id)}
                >
                  {completedTasks.includes(task.id) ? 'Выполнено' : 'Выполнить'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Выполнение задания</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <>
              <Typography variant="body1" gutterBottom>
                {selectedTask.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Награда: {selectedTask.reward} R$
              </Typography>
              {selectedTask.type === 'youtube' && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href="https://youtube.com"
                    target="_blank"
                  >
                    Перейти на YouTube
                  </Button>
                </Box>
              )}
              {selectedTask.type === 'discord' && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href="https://discord.com"
                    target="_blank"
                  >
                    Присоединиться к Discord
                  </Button>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Отмена</Button>
          <Button onClick={handleCompleteTask} variant="contained">
            Подтвердить выполнение
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tasks; 