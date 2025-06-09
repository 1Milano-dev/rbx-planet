import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

const steps = ['Вход', 'Верификация', 'Подтверждение'];

const Login = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateVerificationCode = () => {
    return `RobuxPlanet-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!username) {
        setError('Пожалуйста, введите имя пользователя Roblox');
        return;
      }
      const code = generateVerificationCode();
      setVerificationCode(code);
      setError('');
      setSuccess(`Пожалуйста, добавьте следующий код в поле "About" вашего профиля Roblox: ${code}`);
    } else if (activeStep === 1) {
      // Здесь будет проверка кода через Roblox API
      setSuccess('Верификация успешна! Перенаправление...');
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вход в RobuxPlanet
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <TextField
                fullWidth
                label="Имя пользователя Roblox"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />
            )}

            {activeStep === 1 && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom>
                  Шаг 1: Скопируйте этот код:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    bgcolor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  {verificationCode}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Шаг 2: Перейдите в свой профиль Roblox
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Шаг 3: Вставьте код в поле "About"
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Шаг 4: Нажмите "Проверить"
                </Typography>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Верификация успешна!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Теперь вы можете получать бесплатные робуксы за выполнение заданий.
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Назад
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login; 