import { styled } from '@mui/material/styles';
import { Card, Link as MuiLink, Container, Typography } from '@mui/material';
import Link from '../components/Link/Link';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MHidden from '../components/@MUI-Extended/MHidden';
import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm';

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

const ResetPassword = function ResetPassword() {
  return (
    <>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 10, mb: 5 }}>
            Hi! Let&apos;s reset your password!
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <ResetPasswordForm />

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

ResetPassword.Layout = AuthLayout;

export default ResetPassword;
