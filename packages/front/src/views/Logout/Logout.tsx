import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router';

const Logout = () => {
  const signOut = useSignOut();
  const nav = useNavigate();

  signOut();
  nav('/login');

  return <div>Logout</div>;
};

export default Logout;
