import { FC } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../Link/Link';
import useVerifyEmailFormController from './VerifyEmailFormController';

const VerifyEmailForm: FC = function VerifyEmailForm() {
  const { emailStatus } = useVerifyEmailFormController();

  function getBody() {
    switch (emailStatus) {
      case 'Verifying':
        return (
          <Container>
            <Box sx={{ textAlign: 'center', padding: '20px 0' }}>
              <CircularProgress disableShrink sx={{ textAlign: 'center' }} />
            </Box>
            <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
              Verifying...
            </Typography>
          </Container>
        );
      case 'Failed':
        return (
          <Container>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {'Verification failed. To gain access to your account, please go to the '}
              <Link href="/forgot-password">
                <b>Forgot Password</b>
              </Link>
              {' page.'}
            </div>
            <Link href="/login">
              <Button fullWidth variant="contained" color="primary">
                Back To Login
              </Button>
            </Link>
          </Container>
        );
      default:
        return (
          <Container>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              Ooops! Something went wrong!
            </div>
            <Link href="/login">
              <Button fullWidth variant="contained" color="primary">
                Back To Login
              </Button>
            </Link>
          </Container>
        );
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        Verify your account
      </Typography>
      {getBody()}
    </Container>
  );
};
export default VerifyEmailForm;
