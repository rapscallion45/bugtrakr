import { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import MHidden from '../@MUI-Extended/MHidden';
import AccountPopover from './AccountPopover/AccountPopover';
import NotificationsPopover from './NotificationsPopover/NotificationsPopover';
import Logo from '../Logo/Logo';
import Link from '../Link/Link';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface NavBarProps {
  onOpenSidebar: () => void;
  showLogo?: boolean;
  fullWidth?: boolean;
}

const NavBar: FC<NavBarProps> = function NavBar({
  onOpenSidebar,
  showLogo = false,
  fullWidth = true,
}) {
  const loggedIn = useSelector((state) => state.authentication?.loggedIn);

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      width: fullWidth ? `100%` : `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    },
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));

  return (
    <RootStyle>
      <ToolbarStyle>
        {!showLogo && (
          <MHidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
              <MenuIcon color="primary" />
            </IconButton>
            <Link href="/">
              <Logo />
            </Link>
          </MHidden>
        )}
        {showLogo && (
          <Link href="/">
            <Logo />
          </Link>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <MHidden width="smDown">
            <Box>{loggedIn && <NotificationsPopover />}</Box>
          </MHidden>
          {loggedIn && <AccountPopover />}
          {!loggedIn && (
            <Button variant="contained" component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavBar;
