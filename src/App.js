import { useState,useMemo,createContext } from 'react';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigator from './Components/Navigator';
import { grey,deepPurple,teal } from '@mui/material/colors';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App =() =>{
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          border:{
            primary:grey[500],
            secondary:grey[300]
          },
          ...(mode === 'dark'
            ? {
                primary: grey,
                secondary:deepPurple,
                header:{
                  primary:grey[600]
                },
                background: {
                  default: grey[900],
                  paper: grey[700],
                },
                
                text: {
                  primary: '#fff',
                  secondary: grey[500],
                },
              }
            : {
                primary: grey,
                secondary:teal,
                header:{
                  primary:teal[200]
                },
                background: {
                  default: grey[100],
                  paper: grey[300],
                },
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }),
        },
      }),
    [mode],
  );
 
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigator ColorModeContext={ColorModeContext} />
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
