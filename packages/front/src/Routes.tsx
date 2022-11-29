import { Routes as RouterRoutes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Logout from './views/Logout/Logout';
import PackView from './views/Pack/PackView';
import PrivateRoute from './components/PrivateRoute';
import Filler from './components/Filler';

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
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="pack"
            element={
              <PrivateRoute>
                <PackView />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
        </Route>
      </RouterRoutes>
      <Filler />
    </>
  );
};

export default Routes;
