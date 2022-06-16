import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '../components/Link/Link';
import MHidden from '../components/@MUI-Extended/MHidden';

const Index = function Index() {
  return (
    <main>
      <Container>
        <Grid pt={5} container spacing={4} sx={{ overflow: 'hidden' }}>
          <Grid item xs={12} md={6}>
            <Box pt={8} px={3}>
              <Box mb={4} display="flex" justifyContent="center">
                <Box width={150} component="img" src="/static/logo.png" />
              </Box>

              <Typography variant="h2" align="center" paragraph>
                The Let&apos;s Talk FPL App is here!
              </Typography>
              <Typography variant="h5" align="center" paragraph color="text.secondary">
                Sync your FPL squad with FPL analysis tools and gain access to exclusive content!
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" component={Link} href="/register">
                  Get Started
                </Button>
              </Stack>
            </Box>
          </Grid>
          <MHidden width="mdDown">
            <Grid item md={6}>
              <Box
                width={800}
                component="img"
                src="/static/header-img.jpg"
                sx={{ position: 'absolute', top: '210px' }}
              />
            </Grid>
          </MHidden>
        </Grid>
      </Container>
    </main>
  );
};

export default Index;
