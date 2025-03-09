// src/App.js
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TodoApp from './components/TodoApp/TodoApp';
import { selectThemeMode, toggleTheme } from './store/themeSlice';

function App() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
            // Light mode
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
          }
          : {
            // Dark mode
            primary: { main: '#90caf9' },
            secondary: { main: '#f48fb1' },
            background: { default: '#121212', paper: '#1e1e1e' },
          }
        ),
      },
    }),
    [mode]
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 2,
        pb: 4
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          maxWidth: 'sm',
          mx: 'auto',
          px: 2
        }}>
          <IconButton
            onClick={handleToggleTheme}
            color="inherit"
            aria-label="toggle dark/light mode"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <TodoApp />
      </Box>
    </ThemeProvider>
  );
}

export default App;