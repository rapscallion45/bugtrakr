import type { GetServerSidePropsContext } from 'next';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm';
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

const ForgotPassword = function ForgotPassword() {
  return (
    <>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 10, mb: 5 }}>
            Hi! Let&apos;s get you logged back in!
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <ForgotPasswordForm />

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

ForgotPassword.Layout = AuthLayout;

export default ForgotPassword;

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
