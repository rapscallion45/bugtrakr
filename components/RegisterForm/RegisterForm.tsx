import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from '../Link/Link';
import ValidatedCheckbox from '../ValidatedCheckbox/ValidatedCheckbox';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import useRegisterFormController from './RegisterFormController';

const RegisterForm: FC = function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { registering, formik } = useRegisterFormController();

  return (
    <Container maxWidth="md">
      <Box mb={2} display="flex" justifyContent="center">
        <Link href="/">
          <Box width={50} component="img" src="/static/logo.png" />
        </Link>
      </Box>
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        Get started free with {process.env.APP_NAME}
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', marginBottom: '20px' }}
      >
        Sign up to our free plan. No credit card needed.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <GoogleLoginButton text="Continue with Google" disabled={registering} />
        <Divider sx={{ color: 'lightgray' }}>Or</Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="first_name"
              name="first_name"
              label="First Name"
              type="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
              autoComplete="on"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="last_name"
              name="last_name"
              label="Last Name"
              type="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
              autoComplete="on"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="username"
              name="username"
              label="Username"
              type="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
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
              autoComplete="on"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="on"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedCheckbox
              checkboxName="acceptTerms"
              checkboxId="acceptTerms"
              value={formik.values.acceptTerms}
              onChange={formik.handleChange}
              error={formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms)}
              helperText={formik.touched.acceptTerms && formik.errors.acceptTerms}
              /* eslint-disable react/jsx-wrap-multilines */
              label={
                <Link href="/policy/terms" target="_blank" rel="noopener noreferrer">
                  {`I accept the `}
                  <b>Terms & Conditions</b>
                </Link>
              }
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={registering}>
          {!registering && 'Submit'}
          {registering && <CircularProgress size={25} color="inherit" />}
        </Button>
      </form>
    </Container>
  );
};
export default RegisterForm;
