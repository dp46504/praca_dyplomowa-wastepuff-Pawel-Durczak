import classes from './NavBar.module.css';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from 'react-router-dom';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const NavBar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);

  const guestLinks = [
    <NavLink
      key="1"
      to="/login"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <LoginIcon color="primary" className={classes.iconStyle} />
    </NavLink>,
    <NavLink
      key="2"
      to="/register"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <PersonAddRoundedIcon color="primary" className={classes.iconStyle} />
    </NavLink>,
  ];

  const userLinks = [
    <NavLink
      key="1"
      to="/"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <SmokingRoomsRoundedIcon color="primary" className={classes.iconStyle} />
    </NavLink>,

    <NavLink
      key="2"
      to="/pack"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <BackpackOutlinedIcon color="primary" className={classes.iconStyle} />
    </NavLink>,

    <NavLink
      key="3"
      to="/statistics"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <EqualizerRoundedIcon color="primary" className={classes.iconStyle} />
    </NavLink>,

    <NavLink
      key="4"
      to="/logout"
      onClick={() => toast.info('Logged out')}
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <LogoutRoundedIcon color="primary" className={classes.iconStyle} />
    </NavLink>,
  ];

  return (
    <div className={classes.navContainer}>
      {isAuthenticated ? userLinks : guestLinks}
    </div>
  );
};

export default NavBar;
