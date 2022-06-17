import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AppsIcon from '@mui/icons-material/Apps';
import BugReportIcon from '@mui/icons-material/BugReport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../MenuPopover/MenuPopover';
import Link from '../../Link/Link';

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
  const userAuth = useSelector((state) => state.authentication?.user);
  const loggedIn = useSelector((state) => state.authentication?.loggedIn);
  const user = useSelector((state) => state.account?.user);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Avatar src={user?.avatar?.url} alt={userAuth?.firstName} />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {loggedIn ? `${userAuth?.firstName} ${userAuth?.lastName}` : 'Sign In'}
          </Typography>
          {loggedIn && (
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }} noWrap>
              {userAuth?.email}
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        {loggedIn &&
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
        {!loggedIn &&
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
        {loggedIn && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button fullWidth color="inherit" variant="outlined" component={Link} href="/login">
              Logout
            </Button>
          </Box>
        )}
        {!loggedIn && (
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
