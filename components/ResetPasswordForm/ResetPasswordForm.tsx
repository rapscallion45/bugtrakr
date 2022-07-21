import { FC } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Link from '../Link/Link';
import useResetPasswordFormController from './ResetPasswordFormController';

const ResetPasswordForm: FC = function ResetPasswordForm() {
  const router = useRouter();
  const { resettingPassword, tokenStatus, formik, formikResetCode } =
    useResetPasswordFormController();

  const getForm = () => (
    <Container>
      <Typography variant="body1" component="p" sx={{ paddingBottom: '15px', textAlign: 'center' }}>
        Please now enter your new password below
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          margin="normal"
          id="password"
          name="password"
          label="Enter new password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={resettingPassword}
          sx={{ margin: '10px 0' }}
        >
          {!resettingPassword && 'Submit'}
          {resettingPassword && <CircularProgress size={25} color="inherit" />}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
          disabled={resettingPassword}
        >
          Go Back
        </Button>
      </form>
    </Container>
  );

  const getBody = () => {
    switch (tokenStatus) {
      case 'Valid':
        return (
          <>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              Password Reset Code Verified Successfully!
            </Typography>
            {getForm()}
          </>
        );
      case 'Invalid':
        return (
          <>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              We couldn&apos;t reset your password! 😢
            </Typography>
            <Container>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                {
                  'This is most likely because your verification code has expired. You can get a new code at the '
                }
                <Link href="/forgot-password">
                  <b>Forgot Password</b>
                </Link>
                {' page.'}
              </div>
              <Button fullWidth variant="contained" color="secondary" onClick={() => router.back()}>
                Go Back
              </Button>
            </Container>
          </>
        );
      case 'Validating':
        return (
          <Container>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              Please wait a moment, we&apos;re just verifiy your code...
            </Typography>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CircularProgress disableShrink />
              <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
                Verifying reset code...
              </Typography>
            </div>
          </Container>
        );
      case 'Waiting':
      default:
        return (
          <Container>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
              Please enter your password reset verification code
            </Typography>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {
                'Your password reset verification code should have been emailed to you, at your registered email address. You can get a new code at the '
              }
              <Link href="/forgot-password">
                <b>Forgot Password</b>
              </Link>
              {' page.'}
            </div>
            <form onSubmit={formikResetCode.handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                margin="normal"
                id="token"
                name="token"
                label="Enter code"
                type="token"
                value={formikResetCode.values.token}
                onChange={formikResetCode.handleChange}
                error={formikResetCode.touched.token && Boolean(formikResetCode.errors.token)}
                helperText={formikResetCode.touched.token && formikResetCode.errors.token}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={resettingPassword}
                sx={{ margin: '10px 0' }}
              >
                {!resettingPassword && 'Submit Code'}
                {resettingPassword && <CircularProgress size={25} color="inherit" />}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => router.back()}
                disabled={resettingPassword}
              >
                Cancel
              </Button>
            </form>
          </Container>
        );
    }
  };

  return <Container maxWidth="xs">{getBody()}</Container>;
};
export default ResetPasswordForm;
