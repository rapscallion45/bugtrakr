import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import Loader from '../../components/Loader/Loader';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';

const MyBugsPage = function MyBugsPage() {
  return (
    <Page title="Dashboard | My Squad">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">My Bugs</Typography>
        </Box>
        <Loader
          dataLoading={false}
          dataError={false}
          dataLoaded
          loadingText="Fetching your FPL data..."
          errorText="Failed to load your FPL data. Try re-syncing your team from the My Account page."
        >
          <Typography variant="h4">My Bugs</Typography>
        </Loader>
      </Container>
    </Page>
  );
};

MyBugsPage.Layout = DashboardLayout;

export default MyBugsPage;
