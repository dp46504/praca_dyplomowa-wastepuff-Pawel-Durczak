import classes from './NavBar.module.css';
import { useIsAuthenticated } from 'react-auth-kit';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from 'react-router-dom';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import { toast } from 'react-toastify';

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();

  const guestLinks = [
    <NavLink
      to="/login"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <LoginIcon />
    </NavLink>,
    <NavLink
      to="/register"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <PersonAddRoundedIcon />
    </NavLink>,
  ];

  const userLinks = [
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <HomeRoundedIcon />
    </NavLink>,

    <NavLink
      to="/add"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <SmokingRoomsRoundedIcon />
    </NavLink>,

    <NavLink
      to="/statistics"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <EqualizerRoundedIcon />
    </NavLink>,

    <NavLink
      to="/logout"
      onClick={() => toast.info('Logged out')}
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <LogoutRoundedIcon />
    </NavLink>,
  ];

  return (
    <div className={classes.navContainer}>
      {isAuthenticated() ? userLinks : guestLinks}
    </div>
  );
};

export default NavBar;
