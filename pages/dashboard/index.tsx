import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';

// const projectData = [
//   {
//     id: 1,
//     name: 'Test1',
//     bugs: 5,
//     members: 3,
//     admin: 'test',
//     added: new Date(),
//   },
//   {
//     id: 2,
//     name: 'Test2',
//     bugs: 5,
//     members: 3,
//     admin: 'test',
//     added: new Date(),
//   },
//   {
//     id: 3,
//     name: 'Test3',
//     bugs: 5,
//     members: 3,
//     admin: 'test',
//     added: new Date(),
//   },
//   {
//     id: 4,
//     name: 'Test4',
//     bugs: 5,
//     members: 3,
//     admin: 'test',
//     added: new Date(),
//   },
// ];

const Dashboard = function Dashboard() {
  return (
    <Page title="Dashboard | Overview">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">All Projects</Typography>
        </Box>
        <Loader
          dataLoading={false}
          dataError={false}
          dataLoaded
          loadingText="Fetching your FPL data..."
          errorText="Failed to load your FPL data. Try re-syncing your team from the My Account page."
        >
          <Grid container spacing={3}>
            <Typography>Index</Typography>
          </Grid>
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
