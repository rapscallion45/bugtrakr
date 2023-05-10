import { useEffect } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useDispatch } from 'react-redux';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography, Box } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import LoginForm from '../components/LoginForm/LoginForm';
import { accountActions } from '../redux/actions';
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
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

function Login({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();

  /* reset login status and clear squad data if we get routed here */
  useEffect(() => {
    dispatch(accountActions.logout());
  }, []);

  return (
    <>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 10, mb: 5 }}>
            Hi! Welcome back to {process.env.APP_NAME}!
          </Typography>
        </SectionStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <LoginForm providers={providers} />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <MuiLink variant="subtitle2" component={Link} href="/register">
                Get started
              </MuiLink>
            </Typography>
          </ContentStyle>
        </Container>
      </MHidden>

      <MHidden width="mdUp">
        <Container maxWidth="md">
          <Box sx={{ pt: 10, pb: 5 }}>
            <LoginForm providers={providers} />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <MuiLink variant="subtitle2" component={Link} href="/register">
                Get started
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </MHidden>
    </>
  );
}

Login.Layout = AuthLayout;

export default Login;

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
