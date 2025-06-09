import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BuyRobux from './pages/BuyRobux';
import BuyLimiteds from './pages/BuyLimiteds';
import AddBalance from './pages/AddBalance';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A2FF',
    },
    secondary: {
      main: '#FF4D4D',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-robux" element={<BuyRobux />} />
          <Route path="/buy-limiteds" element={<BuyLimiteds />} />
          <Route path="/add-balance" element={<AddBalance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 