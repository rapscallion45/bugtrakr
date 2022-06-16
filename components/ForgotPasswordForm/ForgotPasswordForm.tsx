import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Link from '../Link/Link';
import useForgotPasswordFormController from './ForgotPasswordFormController';

const ForgotPasswordForm: FC = function ForgotPasswordForm() {
  const { requestingPassword, formik } = useForgotPasswordFormController();

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        Forgot Your Password?
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', marginBottom: '20px' }}
      >
        Please enter the email address associated with your account and we will email you a link to
        reset your password.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          margin="normal"
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={requestingPassword}
          sx={{ margin: '10px 0' }}
        >
          {!requestingPassword && 'Submit'}
          {requestingPassword && <CircularProgress size={25} color="inherit" />}
        </Button>
        <Button
          fullWidth
          component={Link}
          href="/login"
          variant="contained"
          color="secondary"
          disabled={requestingPassword}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};
export default ForgotPasswordForm;
