import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../../store/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(logout());

  return <Navigate to="/login"></Navigate>;
};

export default Logout;
