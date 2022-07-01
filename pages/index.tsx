import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '../components/Link/Link';

const Index = function Index() {
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
                <Button variant="contained" component={Link} href="/register">
                  Get Started
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Index;
