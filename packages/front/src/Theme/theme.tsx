import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#314eac',
      light: '#d7e3f5',
      dark: '#1a417b',
      contrastText: '#bdd5df',
    },
    secondary: {
      main: '#eff1f9',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme = createTheme(theme, {
  components: {
    MuiTabs: {
      styleOverrides: {
        scroller: {
          backgroundColor: theme.palette.primary.light,
        },
        indicator: {
          height: '10%',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '1rem',
          fontFamily: theme.typography.fontFamily,
          borderRadius: '.8rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '.5rem',
          fontFamily: theme.typography.fontFamily,
          borderRadius: '.5rem',
          marginTop: '1rem',
        },
      },
    },
  },
});

export default theme;
