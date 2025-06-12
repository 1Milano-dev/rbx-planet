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
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { motion } from 'framer-motion';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const tasks = [
  {
    id: 1,
    title: 'Подписка на YouTube',
    description: 'Подпишитесь на наш YouTube канал, чтобы получать последние новости и бонусы.',
    reward: 20,
    type: 'youtube',
    icon: <YouTubeIcon />,
    link: 'https://www.youtube.com/'
  },
  {
    id: 3,
    title: 'Лайк на видео',
    description: 'Поставьте лайк на наше последнее видео, чтобы поддержать нас.',
    reward: 25,
    type: 'youtube',
    icon: <YouTubeIcon />,
    link: 'https://www.youtube.com/watch?v=EXAMPLE'
  },
  {
    id: 4,
    title: 'Приглашение друга',
    description: 'Пригласите друга на сайт, и получите бонус, когда он выполнит первое задание.',
    reward: 50,
    type: 'referral',
    icon: <PersonAddIcon />,
  },
  {
    id: 5,
    title: 'Оставить отзыв',
    description: 'Оставьте честный отзыв о нашем сайте и помогите другим пользователям.',
    reward: 30,
    type: 'text',
    icon: <TextFieldsIcon />,
  },
  {
    id: 6,
    title: 'Ежедневный вход',
    description: 'Заходите на сайт каждый день и получайте бонус!',
    reward: 10,
    type: 'daily',
    icon: <AccessTimeIcon />,
  },
  {
    id: 7,
    title: 'Первая покупка',
    description: 'Совершите свою первую покупку Robux и получите большой бонус!',
    reward: 100,
    type: 'purchase',
    icon: <MonetizationOnIcon />,
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
    if (user) {
      localStorage.setItem('completedTasks', JSON.stringify(user.completedTasks));
    }
  }, [user]);

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
        <MotionCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            p: 4,
            textAlign: 'center',
            border: `1px solid ${theme.palette.primary.dark}`,
            boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
          }}
        >
          <Typography variant="h5" sx={{ color: theme.palette.primary.main, mb: 2 }}>
            Войдите, чтобы выполнять задания
          </Typography>
          <MotionButton
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            whileHover={theme.components.MuiButton.styleOverrides.root['&:hover']}
          >
            Войти
          </MotionButton>
        </MotionCard>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', color: theme.palette.text.primary, py: 4 }}>
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              mb: 5,
              background: 'linear-gradient(45deg, #00C9FF 30%, #92FE9D 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Задания для получения Robux
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {tasks.map((task, index) => {
            const isCompleted = user.completedTasks.includes(task.id);
            const cardVariants = {
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
            };
            return (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <MotionCard
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={isCompleted ? {} : theme.components.MuiCard.styleOverrides.root['&:hover']}
                  sx={{
                    height: '100%',
                    borderRadius: 16,
                    boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    transition: 'all 0.3s',
                    opacity: isCompleted ? 0.7 : 1,
                    border: isCompleted ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.background.paper}`,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: isCompleted ? 'not-allowed' : 'pointer',
                    '&:hover': {
                      transform: isCompleted ? 'none' : theme.components.MuiCard.styleOverrides.root['&:hover'].transform,
                      boxShadow: isCompleted ? theme.components.MuiCard.styleOverrides.root.boxShadow : theme.components.MuiCard.styleOverrides.root['&:hover'].boxShadow,
                    },
                  }}
                  onClick={isCompleted ? null : () => handleTaskClick(task)}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {task.icon && React.cloneElement(task.icon, { sx: { fontSize: 60, color: theme.palette.secondary.main } })}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 600, color: theme.palette.primary.light }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                      <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                        <MonetizationOnIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Награда: {task.reward} R$
                      </Typography>
                      {isCompleted && (
                        <Chip
                          icon={<DoneAllIcon />}
                          label="Выполнено"
                          color="success"
                          sx={{ mt: 1, fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                  <MotionButton
                    variant="contained"
                    fullWidth
                    onClick={isCompleted ? null : () => handleTaskClick(task)}
                    disabled={isCompleted}
                    whileHover={isCompleted ? {} : theme.components.MuiButton.styleOverrides.root['&:hover']}
                    sx={{
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      background: isCompleted ? theme.palette.grey[700] : theme.components.MuiButton.styleOverrides.containedPrimary.background,
                      color: isCompleted ? theme.palette.text.disabled : theme.components.MuiButton.styleOverrides.containedPrimary.color,
                      boxShadow: isCompleted ? 'none' : theme.components.MuiButton.styleOverrides.containedPrimary.boxShadow,
                      '&:hover': {
                        background: isCompleted ? theme.palette.grey[700] : theme.components.MuiButton.styleOverrides.containedPrimary['&:hover'].background,
                        boxShadow: isCompleted ? 'none' : theme.components.MuiButton.styleOverrides.containedPrimary['&:hover'].boxShadow,
                      },
                    }}
                  >
                    {isCompleted ? 'Выполнено' : 'Выполнить'}
                  </MotionButton>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          TransitionComponent={Zoom}
          PaperProps={{
            sx: {
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: 16,
              boxShadow: theme.components.MuiPaper.styleOverrides.root.boxShadow,
            },
          }}
        >
          <DialogTitle sx={{
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            textAlign: 'center',
            py: 2
          }}>
            {selectedTask?.title}
          </DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedTask?.description}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
              Награда: {selectedTask?.reward} R$
            </Typography>
            {selectedTask?.type === 'youtube' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Перейдите по ссылке и выполните задание:
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  href={selectedTask.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  startIcon={<YouTubeIcon />}
                  sx={{ py: 1.5 }}
                >
                  Перейти на YouTube
                </Button>
              </Box>
            )}
            {selectedTask?.type === 'referral' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Ваша реферальная ссылка:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={`https://robuxplanet.com/invite/${user?.username}`}
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigator.clipboard.writeText(`https://robuxplanet.com/invite/${user?.username}`)}
                  startIcon={<PersonAddIcon />}
                  sx={{ py: 1.5 }}
                >
                  Скопировать ссылку
                </Button>
              </Box>
            )}
            {selectedTask?.type === 'text' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Напишите ваш отзыв здесь:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Ваш отзыв..."
                  sx={{ mb: 2 }}
                />
                <MotionButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  whileHover={theme.components.MuiButton.styleOverrides.root['&:hover']}
                  onClick={handleCompleteTask}
                >
                  Отправить отзыв
                </MotionButton>
              </Box>
            )}
            {selectedTask?.type === 'daily' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Просто зайдите на сайт сегодня, и бонус будет автоматически начислен.
              </Alert>
            )}
            {selectedTask?.type === 'purchase' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Выполните любую покупку Robux на нашем сайте, чтобы получить этот бонус.
              </Alert>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'space-between', borderTop: `1px solid ${theme.palette.background.default}` }}>
            <MotionButton
              onClick={() => setOpenDialog(false)}
              color="secondary"
              variant="outlined"
              whileHover={theme.components.MuiButton.styleOverrides.root['&:hover']}
            >
              Закрыть
            </MotionButton>
            {selectedTask?.type !== 'text' && (
              <MotionButton
                onClick={handleCompleteTask}
                color="primary"
                variant="contained"
                disabled={user?.completedTasks.includes(selectedTask?.id)}
                whileHover={user?.completedTasks.includes(selectedTask?.id) ? {} : theme.components.MuiButton.styleOverrides.root['&:hover']}
              >
                {user?.completedTasks.includes(selectedTask?.id) ? 'Выполнено' : 'Подтвердить выполнение'}
              </MotionButton>
            )}
          </DialogActions>
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
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.type === 'success' ? 'success' : 'info'}
            sx={{
              width: '100%',
              bgcolor: snackbar.type === 'success' ? theme.palette.success.dark : theme.palette.info.dark,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Tasks; 