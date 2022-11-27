import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#314eac',
      light: '#d7e3f5',
      dark: '#1a417b',
      contrastText: '#bdd5df',
    },
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
  },
});

export default theme;
