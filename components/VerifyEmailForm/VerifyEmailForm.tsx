import { FC } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../Link/Link';
import useVerifyEmailFormController from './VerifyEmailFormController';

const VerifyEmailForm: FC = function VerifyEmailForm() {
  const router = useRouter();
  const { emailStatus, verifyingEmail, formikVerifyCode } = useVerifyEmailFormController();

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
          <>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              We couldn&apos;t verify your account! 😢
            </Typography>
            <Container>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                {'Verification failed. To gain access to your account, please follow the '}
                <Link href="/forgot-password">
                  <b>Forgot Password</b>
                </Link>
                {' process.'}
              </div>
              <Button fullWidth variant="contained" color="primary" onClick={() => router.back()}>
                Go Back
              </Button>
            </Container>
          </>
        );
      case 'Waiting':
      default:
        return (
          <Container>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              Please enter your account verification code
            </Typography>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {
                'Your account verification code should now have been sent to the email address you used to registered with. If you need a new code, please follow the '
              }
              <Link href="/forgot-password">
                <b>Forgot Password</b>
              </Link>
              {' process to verify your account.'}
            </div>
            <form onSubmit={formikVerifyCode.handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                margin="normal"
                id="token"
                name="token"
                label="Enter code"
                type="token"
                value={formikVerifyCode.values.token}
                onChange={formikVerifyCode.handleChange}
                error={formikVerifyCode.touched.token && Boolean(formikVerifyCode.errors.token)}
                helperText={formikVerifyCode.touched.token && formikVerifyCode.errors.token}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={verifyingEmail}
                sx={{ margin: '10px 0' }}
              >
                {!verifyingEmail && 'Submit Code'}
                {verifyingEmail && <CircularProgress size={25} color="inherit" />}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => router.back()}
                disabled={verifyingEmail}
              >
                Cancel
              </Button>
            </form>
          </Container>
        );
    }
  }

  return <Container maxWidth="sm">{getBody()}</Container>;
};
export default VerifyEmailForm;
