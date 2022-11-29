import { Routes as RouterRoutes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import { RequireAuth } from 'react-auth-kit';
import NavBar from './components/NavBar/NavBar';
import Logout from './views/Logout/Logout';
import PackView from './views/Pack/PackView';

const Routes = () => {
  return (
    <>
      <ToastContainer position="top-right" closeOnClick theme="dark" />
      <NavBar />
      <RouterRoutes>
        <Route path="/">
          <Route
            index
            element={
              <RequireAuth loginPath={'/login'}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="pack"
            element={
              <RequireAuth loginPath={'/login'}>
                <PackView />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
        </Route>
      </RouterRoutes>
    </>
  );
};

export default Routes;
