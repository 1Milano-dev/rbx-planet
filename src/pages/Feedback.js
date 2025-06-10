import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, TextField, Button, Snackbar, Alert, Fade } from '@mui/material';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку в Telegram
    localStorage.setItem('feedback', message);
    setSnackbar(true);
    setMessage('');
  };

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', mb: 4, p: 3 }}>
            <Typography variant="h4" sx={{ color: accent, fontWeight: 'bold', mb: 3 }}>
              Обратная связь
            </Typography>
            <Typography variant="body1" sx={{ color: textLight, mb: 2 }}>
              Напишите свой вопрос, отзыв или предложение. Мы обязательно ответим!
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Ваше сообщение"
                variant="outlined"
                multiline
                minRows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                sx={{
                  mb: 3,
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!message.trim()}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  bgcolor: accent,
                  color: textLight,
                  '&:hover': { bgcolor: accent2 },
                }}
              >
                Отправить
              </Button>
            </form>
          </Card>
        </Fade>
        <Snackbar
          open={snackbar}
          autoHideDuration={4000}
          onClose={() => setSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%', bgcolor: accent, color: textLight }}>
            Спасибо за ваше сообщение!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Feedback; 