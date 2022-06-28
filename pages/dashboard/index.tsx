import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import ProjectsTableMobile from '../../components/ProjectsTable/ProjectsTableMobile';
import { projectActions } from '../../redux/actions';

const Dashboard = function Dashboard() {
  const dispatch = useDispatch();
  const { loaded, loading, error, data } = useSelector((state) => state.projects);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, []);

  return (
    <Page title="Dashboard | All Projects">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">All Projects</Typography>
        </Box>
        <Loader
          dataLoading={loading}
          dataError={Boolean(error)}
          dataLoaded={loaded}
          loadingText="Fetching project data..."
          errorText="Failed to load project data."
        >
          {!isMobile && <ProjectsTable projects={data} />}
          {isMobile && <ProjectsTableMobile projects={data} />}
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
