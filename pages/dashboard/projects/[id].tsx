import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppsIcon from '@mui/icons-material/Apps';
import Page from '../../../components/Page/Page';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../../components/Loader/Loader';
import BugsTable from '../../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../../components/BugsTable/BugsTableMobile';
import MHidden from '../../../components/@MUI-Extended/MHidden';
import FormDialog from '../../../components/FormDialog/FormDialog';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Link from '../../../components/Link/Link';
import { bugActions, projectActions } from '../../../redux/actions';
import { formatDateTime } from '../../../utils';

const ProjectDetails = function ProjectDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    leaving,
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

  const handleLeaveProject = (closeDialog: () => void) => {
    dispatch(projectActions.leaveProject(id.toString(), closeDialog));
  };

  return (
    <Page title={`Dashboard | ${projectData?.name} Data`}>
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}
            color="inherit"
            href="/dashboard"
          >
            <AppsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            All Projects
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}
            color="text.primary"
          >
            {projectData?.name}
          </Typography>
        </Breadcrumbs>
        <Box display="flex" flexDirection="column" sx={{ pt: 2, pb: 5 }}>
          <Box display="flex" pb={1}>
            <Typography variant="h3">{projectData?.name}</Typography>
            <MHidden width="smDown">
              <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                <ConfirmDialog
                  title="Confirm Leave Project"
                  contentText={`Are you sure you want to leave project "${projectData?.name}"?`}
                  actionBtnText="Leave"
                  triggerBtn={{
                    type: 'normal',
                    text: 'Leave Project',
                    icon: ExitToAppIcon,
                  }}
                  processing={leaving}
                  actionFunc={(closeDialog) => handleLeaveProject(closeDialog)}
                />
              </Box>
            </MHidden>
            <MHidden width="smUp">
              <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                <ConfirmDialog
                  title="Confirm Leave Project"
                  contentText={`Are you sure you want to leave project "${projectData?.name}"?`}
                  actionBtnText="Leave"
                  triggerBtn={{
                    type: 'fab',
                    icon: ExitToAppIcon,
                  }}
                  processing={leaving}
                  actionFunc={handleLeaveProject}
                />
              </Box>
            </MHidden>
          </Box>
          <Divider />
          <Typography pt={1} variant="body">
            Admin: <span style={{ fontWeight: 'bold' }}>{projectData?.createdBy.username}</span>
          </Typography>
          <Typography variant="body">
            Created on:{' '}
            <span style={{ fontWeight: 'bold' }}>{formatDateTime(projectData?.createdAt)}</span>
          </Typography>
        </Box>
        <Loader
          dataLoading={projectsLoading || bugsLoading}
          dataError={Boolean(projectsError) || Boolean(bugsError)}
          dataLoaded={projectsLoaded && bugsLoaded}
          loadingText="Fetching bug data..."
          errorText="Failed to load project details."
        >
          <Box display="flex" sx={{ pt: 2, pb: 5 }}>
            <Typography variant="h4">Bug List</Typography>
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
          {!isMobile && <BugsTable bugs={bugs} />}
          {isMobile && <BugsTableMobile bugs={bugs} />}
        </Loader>
      </Container>
    </Page>
  );
};

ProjectDetails.Layout = DashboardLayout;

export default ProjectDetails;
