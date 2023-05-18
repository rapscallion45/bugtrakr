import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signIn, useSession } from 'next-auth/react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '../components/Link/Link';
import { alertActions } from '../redux/actions';

const Index = function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);
  const { data: session } = useSession();

  const handleDemoLogin = () => {
    setLoggingIn(true);
    signIn('credentials', {
      redirect: false,
      username: process.env.DEMO_LOGIN_USERNAME,
      password: process.env.DEMO_LOGIN_PASSWORD,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push('/dashboard');
      } else {
        setLoggingIn(false);
        dispatch(
          alertActions.enqueueSnackbar({
            message: error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    });
  };

  return (
    <main>
      <Container>
        <Grid pt={5} container spacing={4} sx={{ overflow: 'hidden' }}>
          <Grid item xs={12}>
            <Box pt={8} px={3}>
              <Box mb={4} display="flex" justifyContent="center">
                <Box width={150} component="img" src="/static/logo.png" />
              </Box>

              <Typography variant="h2" align="center" paragraph>
                BugTrakR - Simple Issue and Bug Tracking!
              </Typography>
              <Typography variant="h5" align="center" paragraph color="text.secondary">
                A FREE and easy to use bug and issue tracking system built by a developer for
                developers!
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                {session && (
                  <Button
                    disabled={loggingIn}
                    variant="contained"
                    component={Link}
                    href="/dashboard"
                  >
                    Go To Dashboard
                  </Button>
                )}
                {!session && (
                  <>
                    <Button
                      disabled={loggingIn}
                      variant="contained"
                      component={Link}
                      href="/register"
                    >
                      Get Started
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleDemoLogin}
                      disabled={loggingIn}
                      sx={{ minWidth: '120px' }}
                    >
                      {!loggingIn && 'Access Demo'}
                      {loggingIn && <CircularProgress size={25} color="inherit" />}
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Index;
