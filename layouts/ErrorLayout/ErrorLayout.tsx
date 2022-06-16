import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page/Page';
import Link from '../../components/Link/Link';
import Logo from '../../components/Logo/Logo';
import useNotifier from '../../hooks/useNotifier';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
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

interface ErrorLayoutProps {
  children?: any;
}

const ErrorLayout: FC<ErrorLayoutProps> = function ErrorLayout({ children }) {
  useNotifier();

  return (
    <RootStyle title={`404 Page Not Found | ${process.env.APP_NAME}`}>
      <HeaderStyle>
        <Link href="/">
          <Logo />
        </Link>
      </HeaderStyle>
      {children}
    </RootStyle>
  );
};

export default ErrorLayout;
