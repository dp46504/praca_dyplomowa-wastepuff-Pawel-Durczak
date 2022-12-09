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
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
      <Tooltip placement="top" title="Login">
        <IconButton>
          <LoginIcon color="primary" className={classes.iconStyle} />
        </IconButton>
      </Tooltip>
    </NavLink>,

    <NavLink
      key="2"
      to="/register"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <Tooltip placement="top" title="Register">
        <IconButton>
          <PersonAddRoundedIcon color="primary" className={classes.iconStyle} />
        </IconButton>
      </Tooltip>
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
      <Tooltip placement="top" title="Home">
        <IconButton>
          <SmokingRoomsRoundedIcon
            color="primary"
            className={classes.iconStyle}
          />
        </IconButton>
      </Tooltip>
    </NavLink>,

    <NavLink
      key="2"
      to="/pack"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <Tooltip placement="top" title="Your packs">
        <IconButton>
          <BackpackOutlinedIcon color="primary" className={classes.iconStyle} />
        </IconButton>
      </Tooltip>
    </NavLink>,

    <NavLink
      key="3"
      to="/statistics"
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <Tooltip placement="top" title="Statistics">
        <IconButton>
          <EqualizerRoundedIcon color="primary" className={classes.iconStyle} />
        </IconButton>
      </Tooltip>
    </NavLink>,

    <NavLink
      key="4"
      to="/logout"
      onClick={() => toast.info('Logged out')}
      className={({ isActive }) =>
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <Tooltip placement="top" title="Logout">
        <IconButton>
          <LogoutRoundedIcon color="primary" className={classes.iconStyle} />
        </IconButton>
      </Tooltip>
    </NavLink>,
  ];

  return (
    <div className={classes.navContainer}>
      {isAuthenticated ? userLinks : guestLinks}
    </div>
  );
};

export default NavBar;
