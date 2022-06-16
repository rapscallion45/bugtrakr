import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Link from '../Link/Link';
import useResetPasswordFormController from './ResetPasswordFormController';

const ResetPasswordForm: FC = function ResetPasswordForm() {
  const { resettingPassword, tokenStatus, formik } = useResetPasswordFormController();

  const getForm = () => (
    <Container>
      <Typography variant="body" component="p" sx={{ paddingBottom: '15px', textAlign: 'center' }}>
        Please enter your new password below
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
          component={Link}
          href="/login"
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
        return getForm();
      case 'Invalid':
        return (
          <Container>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {'There was a problem resetting your password. You can get a new link at the '}
              <Link href="/forgot-password">
                <b>Forgot Password</b>
              </Link>
              {' page.'}
            </div>
            <Button fullWidth variant="contained" color="secondary" component={Link} href="/login">
              Go Back
            </Button>
          </Container>
        );
      case 'Validating':
        return (
          <Container>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CircularProgress disableShrink />
              <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
                Verifying...
              </Typography>
            </div>
          </Container>
        );
      default:
        return (
          <Container>
            <div className="text-center mb-5">Ooops! Something went wrong!</div>
            <Button fullWidth variant="contained" color="secondary" component={Link} href="/login">
              Go Back
            </Button>
          </Container>
        );
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        Reset Your Password
      </Typography>
      {getBody()}
    </Container>
  );
};
export default ResetPasswordForm;
