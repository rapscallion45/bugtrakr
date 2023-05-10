import React, { useEffect } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useSelector } from 'react-redux';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import router from 'next/router';
import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography, Box } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import ScrollBar from '../components/ScrollBar/ScrollBar';
import { AppState } from '../redux/reducers';
import { authOptions } from './api/auth/[...nextauth]';

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

const Register = function Register({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const loggedIn = useSelector((state: AppState) => state.authentication.loggedIn);

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
              <RegisterForm providers={providers} />

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?&nbsp;
                <MuiLink variant="subtitle2" component={Link} href="/login">
                  Login
                </MuiLink>
              </Typography>
            </ScrollBar>
          </ContentStyle>
        </Container>
      </MHidden>

      <MHidden width="mdUp">
        <Container maxWidth="md">
          <Box sx={{ py: 5 }}>
            <RegisterForm providers={providers} />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?&nbsp;
              <MuiLink variant="subtitle2" component={Link} href="/login">
                Login
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </MHidden>
    </>
  );
};

Register.Layout = AuthLayout;

export default Register;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  /**
   * If the user is already logged in, redirect.
   * Note: Make sure not to redirect to the same page
   * To avoid an infinite loop!
   */
  if (session) {
    return { redirect: { destination: '/dashboard' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
