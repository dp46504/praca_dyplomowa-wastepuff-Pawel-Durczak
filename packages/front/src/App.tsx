import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import theme from './Theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import './globalStyle.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
