import { ThemeProvider } from "@emotion/react"
import { Box, CssBaseline, IconButton } from '@mui/material'
import TodoApp from './components/TodoApp/TodoApp'
import { darkTheme, lightTheme } from "./theme"
import { useMemo, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {

  const [mode, setMode] = useState('light');

  const theme = useMemo(() =>
    mode === 'light' ? lightTheme : darkTheme,
    [mode]
  );

  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        pt: 2
      }}>
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <TodoApp />
      </Box>
    </ThemeProvider>
  )
}

export default App
