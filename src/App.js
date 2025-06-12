import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import BuyRobux from './pages/BuyRobux';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Wheel from './pages/Wheel';
import AdminPanel from './pages/AdminPanel';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00C9FF', // Яркий голубой
      light: '#88EEFF',
      dark: '#0099CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF1493', // Яркий розовый
      light: '#FF69B4',
      dark: '#CC0077',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0A0A', // Почти черный
      paper: '#1C1C1C', // Темно-серый для карточек/бумаги
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00C9FF 30%, #92FE9D 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 24px rgba(0, 201, 255, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #00C9FF 30%, #92FE9D 90%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0, 201, 255, 0.1)',
          '&:hover': {
            background: 'linear-gradient(45deg, #92FE9D 30%, #00C9FF 90%)',
            boxShadow: '0 8px 24px rgba(0, 201, 255, 0.3)',
          },
        },
        outlinedPrimary: {
          color: '#00C9FF',
          borderColor: '#00C9FF',
          '&:hover': {
            backgroundColor: 'rgba(0, 201, 255, 0.1)',
            borderColor: '#92FE9D',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1C1C1C 0%, #0A0A0A 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          borderBottom: '1px solid rgba(0, 201, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
          background: '#1C1C1C',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 201, 255, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#1C1C1C',
          borderRadius: 16,
          boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#00C9FF',
          '&:hover': {
            backgroundColor: 'rgba(0, 201, 255, 0.1)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#B0B0B0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(0, 201, 255, 0.3)',
          },
          '&:hover fieldset': {
            borderColor: '#00C9FF',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00C9FF',
          },
        },
        input: {
          color: '#E0E0E0',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#333333',
          color: '#E0E0E0',
          fontSize: '0.8rem',
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/buy-robux" 
            element={
              <ProtectedRoute>
                <BuyRobux />
              </ProtectedRoute>
            } 
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 