import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import ScrollBar from '../components/ScrollBar/ScrollBar';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'top',
  padding: theme.spacing(12, 0, 6, 0),
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 0, 6, 0),
  },
}));

const Register = function Register() {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  /* If we're logged in, ignore the request and re-route to dashboard */
  useEffect(() => {
    if (loggedIn) router.replace('/dashboard');
  }, [loggedIn]);

  return (
    <>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 10, mb: 5 }}>
            Sign up to gain access to FREE bug tracking tools!
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="md">
        <ContentStyle>
          <ScrollBar
            sx={{
              height: '100%',
              overflowY: 'auto',
              '& .simplebar-content': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '20px !important',
              },
            }}
          >
            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?&nbsp;
              <MuiLink variant="subtitle2" component={Link} href="/login">
                Login
              </MuiLink>
            </Typography>
          </ScrollBar>
        </ContentStyle>
      </Container>
    </>
  );
};

Register.Layout = AuthLayout;

export default Register;
