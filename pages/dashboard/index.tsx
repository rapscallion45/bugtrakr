import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Page from '../../components/Page/Page';
import MHidden from '../../components/@MUI-Extended/MHidden';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import ProjectsTableMobile from '../../components/ProjectsTable/ProjectsTableMobile';
import FormDialog from '../../components/FormDialog/FormDialog';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
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
        <Box display="flex" sx={{ pb: 5 }}>
          <Box>
            <Typography variant="h4">All Projects</Typography>
            <Typography variant="body1">List of all projects created and joined by you</Typography>
          </Box>
          <MHidden width="smDown">
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <FormDialog
                triggerBtn={{
                  type: 'normal',
                  icon: AddIcon,
                  text: 'Create New Project',
                }}
                title="Create New Project"
              >
                <ProjectForm />
              </FormDialog>
            </Box>
          </MHidden>
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
