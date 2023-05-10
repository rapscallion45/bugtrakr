import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link as MuiLink } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from '../Link/Link';
import ValidatedCheckbox from '../ValidatedCheckbox/ValidatedCheckbox';
import NextAuthBtns from '../NextAuthBtns/NextAuthBtns';
import useLoginFormController from './LoginFormController';

interface LoginFormProps {
  providers: any;
}

const LoginForm: FC<LoginFormProps> = function LoginForm(props) {
  const { providers } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { loggingIn, demo, formik, handleDemoLogin } = useLoginFormController();

  return (
    <Container maxWidth="xs">
      <Box mb={2} display="flex" justifyContent="center">
        <Link href="/">
          <Box width={50} component="img" src="/static/logo.png" />
        </Link>
      </Box>
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        Login to {process.env.APP_NAME}
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', marginBottom: '20px' }}
      >
        Enter your details below
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <NextAuthBtns providers={providers} />
        <Divider sx={{ color: 'lightgray' }}>Or</Divider>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="username"
          name="username"
          label="Username or Email"
          type="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          autoComplete="on"
        />
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
        <Grid container sx={{ marginTop: '10px' }}>
          <Grid item xs>
            <ValidatedCheckbox
              checkboxName="remember"
              checkboxId="remember"
              value={formik.values.remember}
              onChange={formik.handleChange}
              error={formik.touched.remember && Boolean(formik.errors.remember)}
              helperText={formik.touched.remember && formik.errors.remember}
              label="Remember me"
            />
          </Grid>
          <Grid item xs sx={{ textAlign: 'right', padding: '10px 0' }}>
            <MuiLink component={Link} href="/forgot-password" variant="body2">
              Forgot password?
            </MuiLink>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loggingIn}
          sx={{ padding: '10px 0' }}
        >
          {(!loggingIn || demo) && 'Submit'}
          {loggingIn && !demo && <CircularProgress size={25} color="inherit" />}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={loggingIn}
          sx={{ marginTop: '8px', padding: '10px 0' }}
          onClick={handleDemoLogin}
        >
          {(!loggingIn || !demo) && 'Demo Login'}
          {loggingIn && demo && <CircularProgress size={25} color="inherit" />}
        </Button>
      </form>
    </Container>
  );
};
export default LoginForm;
