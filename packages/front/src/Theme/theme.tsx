import { createTheme } from '@mui/material/styles';
// 0 - dark
// 1 - light
const themeOption: boolean = false;

// palette: {
//   primary: {
//     main: '#314eac',
//     light: '#d7e3f5',
//     dark: '#1a417b',
//     contrastText: '#bdd5df',
//   },
//   secondary: {
//     main: '#eff1f9',
//   },
// },

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6FA600',
      light: '#9fe414',
      dark: '#5E8C00',
      contrastText: '#272B34',
    },
    secondary: {
      main: '#272B34',
      light: '#323743',
      dark: '#1D2126',
      contrastText: '#6FA600',
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
          backgroundColor: theme.palette.secondary.light,
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
          backgroundColor: theme.palette.secondary.light,
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
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: '.5rem',
          marginTop: '1rem',
        },
      },
    },
  },
});

export default theme;
