import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import { styled } from '@mui/material/styles';
import NavBar from '../../components/NavBar/NavBar';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
import Preloader from '../../components/Preloader/Preloader';
import useNotifier from '../../hooks/useNotifier';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

interface DashboardLayoutProps {
  children?: any;
}

const DashboardLayout: FC<DashboardLayoutProps> = function DashboardLayout({ children }) {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const authenticating = useSelector((state) => state.authentication.authenticating);
  const [open, setOpen] = useState(false);
  useNotifier();

  useEffect(() => {
    if (!loggedIn && !authenticating) router.replace('/login');
  }, [loggedIn, authenticating]);

  const getLayout = () => (
    <RootStyle>
      <NavBar onOpenSidebar={() => setOpen(true)} />
      <NavSideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );

  return !loggedIn && !authenticating ? <Preloader /> : getLayout();
};

export default DashboardLayout;
