import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Snackbar,
  useTheme,
  Fade,
  Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Link from '@mui/material/Link';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const BuyRobux = () => {
  const [robuxAmount, setRobuxAmount] = useState('');
  const [username, setUsername] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const handlePurchase = () => {
    if (!username || !robuxAmount || isNaN(robuxAmount) || robuxAmount < 1) return;
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // DonationAlerts ссылка (замените на свой ник)
  const donationAlertsNick = 'rbxplanet';
  const amount = parseInt(robuxAmount) || 0;
  const donationUrl = `https://www.donationalerts.com/r/${donationAlertsNick}?amount=${amount}&message=Roblox:${username}`;

  return (
    <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 5, color: accent }}>
            Купить Robux
          </Typography>
        </Fade>
        <Fade in timeout={1200}>
          <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: accent }}>
                Введите количество Robux
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Количество Robux"
                  variant="outlined"
                  type="number"
                  value={robuxAmount}
                  onChange={e => setRobuxAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  sx={{
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
                  InputProps={{
                    startAdornment: (
                      <MonetizationOnIcon sx={{ color: accent, mr: 1 }} />
                    ),
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Имя пользователя Roblox"
                  variant="outlined"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  sx={{
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
                  InputProps={{
                    startAdornment: (
                      <AccountCircleIcon sx={{ color: accent, mr: 1 }} />
                    ),
                  }}
                />
              </Box>
              {amount > 0 && username && (
                <Box sx={{ mb: 3, p: 2, bgcolor: darkBg, borderRadius: '8px' }}>
                  <Typography variant="body1" color="#b0b8d1" gutterBottom>
                    К оплате:
                  </Typography>
                  <Typography variant="h6" color={accent2} sx={{ fontWeight: 'bold' }}>
                    {amount} ₽
                  </Typography>
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                href={amount > 0 && username ? donationUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!username || !robuxAmount || isNaN(robuxAmount) || robuxAmount < 1}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 24px 0 rgba(0,191,255,0.15)',
                  transition: 'all 0.3s',
                  bgcolor: accent,
                  color: textLight,
                  '&:hover': {
                    boxShadow: '0 8px 32px 0 rgba(0,191,255,0.25)',
                    bgcolor: accent2
                  },
                  mb: 2
                }}
              >
                Оплатить через DonationAlerts
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handlePurchase}
                disabled={!username || !robuxAmount || isNaN(robuxAmount) || robuxAmount < 1}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  color: accent,
                  borderColor: accent,
                  '&:hover': {
                    borderColor: accent2,
                    color: accent2
                  },
                }}
              >
                Я оплатил, отправить заявку
              </Button>
            </CardContent>
          </Card>
        </Fade>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', bgcolor: accent, color: textLight }}>
            <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Заявка отправлена! Ожидайте начисления Robux.
          </Alert>
        </Snackbar>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ bgcolor: cardBg, color: accent, fontWeight: 'bold' }}>Что делать после оплаты?</DialogTitle>
          <DialogContent sx={{ bgcolor: darkBg, color: textLight }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <b>Спасибо за оплату!</b> Чтобы получить Robux:
            </Typography>
            <ol style={{ color: textLight, marginLeft: 16 }}>
              <li>Скопируйте ваш ник Roblox и сумму оплаты.</li>
              <li>Отправьте эти данные в наш Telegram:
                <br/>
                <Link href="https://t.me/ThisGuyTom" target="_blank" rel="noopener" sx={{ color: accent2, fontWeight: 'bold' }}>@ThisGuyTom</Link>
              </li>
              <li>В сообщении укажите:
                <ul>
                  <li>Ваш ник Roblox</li>
                  <li>Сумму оплаты</li>
                  <li>Комментарий к платежу (если был)</li>
                  <li>Скриншот или ID платежа (по возможности)</li>
                </ul>
              </li>
            </ol>
            <Typography variant="body2" sx={{ mt: 2, color: accent }}>
              Robux будут начислены в течение 24 часов после проверки!
            </Typography>
          </DialogContent>
          <DialogActions sx={{ bgcolor: cardBg }}>
            <Button onClick={handleCloseDialog} sx={{ color: accent }}>Понятно</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BuyRobux; 