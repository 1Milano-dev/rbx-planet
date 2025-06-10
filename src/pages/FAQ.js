import React from 'react';
import { Container, Typography, Card, CardContent, Box, List, ListItem, ListItemText, Fade, Link } from '@mui/material';

const darkBg = '#181A20';
const cardBg = '#23263a';
const accent = '#00bfff';
const accent2 = '#ff4081';
const textLight = '#f5f6fa';

const faqs = [
  {
    q: 'Как получить Robux через группу?',
    a: <>
      Вступите в нашу группу Roblox: <Link href="https://www.roblox.com/groups/" target="_blank" rel="noopener" sx={{ color: accent2, fontWeight: 'bold' }}>[ссылка на группу]</Link>.<br/>
      После вступления сообщите свой ник и ожидайте выплату (Roblox может задерживать выплаты новым участникам до 14 дней).
    </>
  },
  {
    q: 'Как создать геймпасс для выплаты?',
    a: <>
      Посмотрите видео-инструкцию: <Link href="https://youtu.be/7RzVnF8b5yA" target="_blank" rel="noopener" sx={{ color: accent2 }}>Как создать геймпасс</Link>.<br/>
      После создания отправьте ссылку администратору.
    </>
  },
  {
    q: 'Как создать предмет (T-shirt) для выплаты?',
    a: <>
      Видео-инструкция: <Link href="https://youtu.be/7RzVnF8b5yA?t=120" target="_blank" rel="noopener" sx={{ color: accent2 }}>Как создать T-shirt</Link>.<br/>
      После загрузки отправьте ссылку администратору.
    </>
  },
  {
    q: 'Как получить ежедневный бонус?',
    a: 'В личном кабинете нажмите кнопку "Получить ежедневный бонус". Robux сразу поступят на ваш баланс.'
  },
  {
    q: 'Куда обращаться по вопросам?',
    a: <>
      Пишите в Telegram: <Link href="https://t.me/ThisGuyTom" target="_blank" rel="noopener" sx={{ color: accent2, fontWeight: 'bold' }}>@ThisGuyTom</Link>
    </>
  }
];

const FAQ = () => (
  <Box sx={{ bgcolor: darkBg, minHeight: '100vh', color: textLight, py: 4 }}>
    <Container maxWidth="md">
      <Fade in timeout={1000}>
        <Card sx={{ bgcolor: cardBg, borderRadius: '15px', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)', mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ color: accent, fontWeight: 'bold', mb: 3 }}>
            FAQ и Гайды
          </Typography>
          <List>
            {faqs.map((item, idx) => (
              <ListItem key={idx} alignItems="flex-start" sx={{ mb: 2 }}>
                <ListItemText
                  primary={<Typography variant="h6" sx={{ color: accent2, fontWeight: 'bold' }}>{item.q}</Typography>}
                  secondary={<Typography variant="body1" sx={{ color: textLight }}>{item.a}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Fade>
    </Container>
  </Box>
);

export default FAQ; 