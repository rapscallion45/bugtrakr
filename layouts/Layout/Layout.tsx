import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../../components/NavBar/NavBar';
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

interface LayoutProps {
  children?: any;
}

const Layout: FC<LayoutProps> = function Layout({ children }) {
  useNotifier();

  return (
    <RootStyle>
      <NavBar onOpenSidebar={() => null} showLogo fullWidth />
      <MainStyle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </MainStyle>
    </RootStyle>
  );
};
export default Layout;
