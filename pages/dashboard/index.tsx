import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';

const projectData = [
  {
    id: 1,
    name: 'Test1',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: 'testuser1',
  },
  {
    id: 2,
    name: 'Test2',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: 'testuser2',
  },
  {
    id: 3,
    name: 'Test3',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: 'testuser3',
  },
  {
    id: 4,
    name: 'Test4',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: 'testuser4',
  },
];

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
            <ProjectsTable projects={projectData} />
          </Grid>
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
