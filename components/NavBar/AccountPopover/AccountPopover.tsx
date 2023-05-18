import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import AppsIcon from '@mui/icons-material/Apps';
import BugReportIcon from '@mui/icons-material/BugReport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../MenuPopover/MenuPopover';
import Link from '../../Link/Link';
import { AppState } from '../../../redux/reducers';

const MENU_OPTIONS_LOGGED_IN = [
  {
    label: 'All Projects',
    icon: AppsIcon,
    linkTo: '/dashboard',
  },
  {
    label: 'My Bugs',
    icon: BugReportIcon,
    linkTo: '/dashboard/my-bugs',
  },
  {
    label: 'My Account',
    icon: AccountCircleIcon,
    linkTo: '/dashboard/my-account',
  },
];

const MENU_OPTIONS_LOGGED_OUT = [
  {
    label: 'Login',
    icon: LoginIcon,
    linkTo: '/login',
  },
  {
    label: 'Create Account',
    icon: PersonAddIcon,
    linkTo: '/register',
  },
];

const AccountPopover: FC = function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { data: session } = useSession();
  const { user } = session;
  const { user: account } = useSelector((state: AppState) => state.account);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    signOut();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account?.avatar?.url} alt={account?.firstName} />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {!user?.demo && (
            <Typography variant="subtitle1" noWrap>
              {session ? `${account?.username}` : 'Sign In'}
            </Typography>
          )}
          {user?.demo && (
            <Typography variant="subtitle1" noWrap>
              Demo Mode
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        {session &&
          MENU_OPTIONS_LOGGED_IN.map((option) => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={Link}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <option.icon sx={{ marginRight: '10px' }} />
              {option.label}
            </MenuItem>
          ))}
        {!session &&
          MENU_OPTIONS_LOGGED_OUT.map((option) => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={Link}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <option.icon sx={{ marginRight: '10px' }} />
              {option.label}
            </MenuItem>
          ))}
        {session && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {!loggingOut && 'Logout'}
              {loggingOut && <CircularProgress size={25} color="inherit" />}
            </Button>
          </Box>
        )}
        {!session && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button fullWidth color="inherit" variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        )}
      </MenuPopover>
    </>
  );
};
export default AccountPopover;
