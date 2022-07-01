import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Page from '../../components/Page/Page';
import Link from '../../components/Link/Link';
import MHidden from '../../components/@MUI-Extended/MHidden';
import useNotifier from '../../hooks/useNotifier';

const RootStyle = styled(Page)(({ theme }) => ({
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

interface AuthLayoutProps {
  children?: any;
}

const AuthLayout: FC<AuthLayoutProps> = function AuthLayout({ children }) {
  useNotifier();

  return (
    <RootStyle title={`Login | ${process.env.APP_NAME}`}>
      <HeaderStyle>
        <MHidden width="mdDown">
          <Link href="/">
            <Box width={100} component="img" src="/static/logo.png" />
          </Link>
        </MHidden>
      </HeaderStyle>
      {children}
    </RootStyle>
  );
};

export default AuthLayout;
