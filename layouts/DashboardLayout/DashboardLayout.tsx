import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import NavBar from '../../components/NavBar/NavBar';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
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
  const [open, setOpen] = useState(false);
  useNotifier();

  return (
    <RootStyle>
      <NavBar onOpenSidebar={() => setOpen(true)} />
      <NavSideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
