import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Page from '../../../components/Page/Page';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../../components/Loader/Loader';
import BugsTable from '../../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../../components/BugsTable/BugsTableMobile';
import MHidden from '../../../components/@MUI-Extended/MHidden';
import FormDialog from '../../../components/FormDialog/FormDialog';
import { bugActions } from '../../../redux/actions';

const ProjectDetails = function ProjectDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    loading: projectsLoading,
    loaded: projectsLoaded,
    error: projectsError,
    data: projects,
  } = useSelector((state) => state.projects);
  const {
    loading: bugsLoading,
    loaded: bugsLoaded,
    error: bugsError,
    data: bugs,
  } = useSelector((state) => state.bugs);
  const projectData = projects?.find((project) => project.id === id);

  useEffect(() => {
    dispatch(bugActions.getBugs(projectData.id));
  }, [projectData]);

  return (
    <Page title={`Dashboard | ${projectData?.name} Data`}>
      <Container maxWidth="xl">
        <Box display="flex" sx={{ pb: 5 }}>
          <Typography variant="h4">{projectData?.name}</Typography>
          <MHidden width="smDown">
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <FormDialog
                triggerBtn={{
                  type: 'normal',
                  icon: AddIcon,
                  text: 'Create New Bug',
                }}
                title="Create New Bug"
              >
                {/* <ProjectForm editMode={null} /> */}
              </FormDialog>
            </Box>
          </MHidden>
        </Box>
        <Loader
          dataLoading={projectsLoading || bugsLoading}
          dataError={Boolean(projectsError) || Boolean(bugsError)}
          dataLoaded={projectsLoaded && bugsLoaded}
          loadingText="Fetching bug data..."
          errorText="Failed to load project details."
        >
          {!isMobile && <BugsTable bugs={bugs} />}
          {isMobile && <BugsTableMobile bugs={bugs} />}
        </Loader>
      </Container>
    </Page>
  );
};

ProjectDetails.Layout = DashboardLayout;

export default ProjectDetails;
