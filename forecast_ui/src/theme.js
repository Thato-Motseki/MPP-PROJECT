import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1f1f',
      paper: '#2a2a2a',
    },
    primary: {
      main: '#ff4081', // pink accent
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d1d1',
    },
  },
});

export default theme;
