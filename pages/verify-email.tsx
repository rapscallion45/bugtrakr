import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import VerifyEmailForm from '../components/VerifyEmailForm/VerifyEmailForm';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const VerifyEmail = function VerifyEmail() {
  const loggedIn = useSelector((state) => state.authentication?.loggedIn);

  /* If we're logged in, ignore the request and re-route to dashboard */
  useEffect(() => {
    if (loggedIn) router.replace('/dashboard');
  }, [loggedIn]);

  return (
    <>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 10, mb: 5 }}>
            Hi! Let&apos;s verify your account and get you started!
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <VerifyEmailForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?&nbsp;
            <MuiLink variant="subtitle2" component={Link} href="/register">
              Get started
            </MuiLink>
          </Typography>
        </ContentStyle>
      </Container>
    </>
  );
};

VerifyEmail.Layout = AuthLayout;

export default VerifyEmail;
