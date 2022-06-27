import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import ProjectsTableMobile from '../../components/ProjectsTable/ProjectsTableMobile';

const projectData = [
  {
    id: 1,
    name: 'Dribble Project',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: { username: 'testuser1' },
  },
  {
    id: 2,
    name: 'My New Project',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: { username: 'testuser2' },
  },
  {
    id: 3,
    name: 'FPL Analysis Tools',
    bugs: ['bug1'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: { username: 'testuser3' },
  },
  {
    id: 4,
    name: 'This is a really long title Test Project',
    bugs: ['bug1', 'bug2'],
    members: [{ name: 'testuser1', id: 1 }],
    admin: 'test',
    createdAt: Date.now(),
    createdBy: { username: 'testuser4' },
  },
];

const Dashboard = function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page title="Dashboard | All Projects">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">All Projects</Typography>
        </Box>
        <Loader
          dataLoading={false}
          dataError={false}
          dataLoaded
          loadingText="Fetching project data..."
          errorText="Failed to load project data."
        >
          {!isMobile && <ProjectsTable projects={projectData} />}
          {isMobile && <ProjectsTableMobile projects={projectData} />}
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
