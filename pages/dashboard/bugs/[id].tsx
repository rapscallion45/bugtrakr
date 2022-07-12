import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Chip, Divider, Grid, useMediaQuery, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import AppsIcon from '@mui/icons-material/Apps';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Page from '../../../components/Page/Page';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../../components/Loader/Loader';
import NotesTable from '../../../components/NotesTable/NotesTable';
import SortBar from '../../../components/SortBar/SortBar';
import MHidden from '../../../components/@MUI-Extended/MHidden';
import FormDialog from '../../../components/FormDialog/FormDialog';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import NoteForm from '../../../components/NoteForm/NoteForm';
import Link from '../../../components/Link/Link';
import BugMenu from '../../../components/BugMenu/BugMenu';
import BugForm from '../../../components/BugForm/BugForm';
import { bugActions } from '../../../redux/actions';
import { AppState } from '../../../redux/reducers';
import { formatDateTime, getBugPriorityColor, sortNotes } from '../../../utils';
import { NoteSortValues } from '../../../utils/sortNotes';

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'updated', label: 'Recently Updated' },
];

const BugDetails = function BugDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector((state: AppState) => state.authentication);
  const {
    loading: projectsLoading,
    loaded: projectsLoaded,
    error: projectsError,
    data: projects,
  } = useSelector((state: AppState) => state.projects);
  const {
    deleting,
    loading: bugsLoading,
    loaded: bugsLoaded,
    error: bugsError,
    data: bugs,
  } = useSelector((state: AppState) => state.bugs);
  const [sortBy, setSortBy] = useState<NoteSortValues>('newest');
  const bugData = bugs?.find((b) => b.id === id);
  const projectData = projects?.find((p) => p.id === bugData?.projectId);
  const sortedNotes = sortNotes(bugData?.notes || [], sortBy);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as NoteSortValues);
  };

  const handleDeleteBug = (closeDialog: () => void) => {
    dispatch(bugActions.deleteBug(bugData.projectId, id.toString(), closeDialog));
  };

  return (
    <Page title={`Dashboard | ${bugData?.title} Data`}>
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
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}
            color="inherit"
            href={`/dashboard/projects/${projectData?.id}`}
          >
            {projectData?.name}
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}
            color="text.primary"
          >
            {bugData?.title}
          </Typography>
        </Breadcrumbs>
        <Box display="flex" flexDirection="column" sx={{ pt: 2, pb: 5 }}>
          <Box display="flex" pb={1}>
            <Typography variant="h3">{bugData?.title}</Typography>
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ConfirmDialog
                  title="Confirm Delete Bug"
                  contentText={`Are you sure you want to permanently delete bug "${bugData?.title}"?`}
                  actionBtnText="Delete"
                  triggerBtn={{
                    type: 'icon',
                    icon: DeleteIcon,
                    color: 'inherit',
                  }}
                  processing={deleting}
                  actionFunc={(closeDialog) => handleDeleteBug(closeDialog)}
                />
                <BugMenu
                  bugId={bugData?.id}
                  projectId={projectData?.id}
                  currentData={{
                    title: bugData?.title,
                    description: bugData?.description,
                    priority: bugData?.priority,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={4} pt={2}>
            <Grid item xs={12} md={6} sx={{ overflow: 'hidden' }}>
              <Box display="flex" alignItems="center">
                <Typography mr={1} variant="body1">
                  Description:
                </Typography>
                <FormDialog
                  triggerBtn={{
                    type: 'icon',
                    icon: EditOutlinedIcon,
                    color: 'inherit',
                  }}
                  title="Edit Bug Info"
                >
                  <BugForm
                    isEditMode
                    projectId={bugData?.projectId}
                    currentData={{
                      title: bugData?.title,
                      description: bugData?.description,
                      priority: bugData?.priority,
                    }}
                    bugId={bugData?.id}
                  />
                </FormDialog>
              </Box>
              <br />
              <strong>{bugData?.description}</strong>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={3} md={12}>
                  <Box display="flex" alignItems="center" py={1}>
                    <Typography mr={1} variant="body1">
                      Priority:
                    </Typography>
                    <Chip
                      label={bugData?.priority.toUpperCase()}
                      color={getBugPriorityColor(bugData?.priority)}
                      sx={{ fontWeight: 'bold' }}
                      size={isMobile ? 'small' : 'medium'}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={12}>
                  <Box display="flex" alignItems="center" py={1}>
                    <Typography mr={1} variant="body1">
                      Status:
                    </Typography>
                    <Chip
                      label={bugData?.isResolved ? 'Closed' : 'Open'}
                      color={bugData?.isResolved ? 'secondary' : 'info'}
                      size={isMobile ? 'small' : 'medium'}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Typography pt={1} variant="body1">
                Opened by: <span style={{ fontWeight: 'bold' }}>{bugData?.createdBy.username}</span>
              </Typography>
              <Typography variant="body1">
                Opened on:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {formatDateTime(bugData?.createdAt || 0)}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Loader
          dataLoading={projectsLoading || bugsLoading}
          dataError={Boolean(projectsError) || Boolean(bugsError)}
          dataLoaded={projectsLoaded && bugsLoaded}
          loadingText="Fetching bug data..."
          errorText="Failed to load bug details."
        >
          <Box display="flex" sx={{ pt: 2, pb: 5 }}>
            <ForumOutlinedIcon fontSize="large" style={{ marginRight: '0.2em' }} />
            <Typography variant="h4">Notes</Typography>
            <MHidden width="smDown">
              <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                <FormDialog
                  triggerBtn={{
                    type: 'normal',
                    icon: NoteAddIcon,
                    text: 'Add Note',
                  }}
                  title="Add Note"
                >
                  <NoteForm isEditMode={false} projectId={projectData?.id} bugId={bugData?.id} />
                </FormDialog>
              </Box>
            </MHidden>
            <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
              <Box sx={{ minWidth: '190px' }}>
                <SortBar
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                  menuItems={menuItems}
                  label="Notes"
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <NotesTable
            notes={sortedNotes}
            bugId={bugData?.id}
            projectId={projectData?.id}
            isAdmin={user?.id === projectData?.createdBy?.id}
            isMobile={isMobile}
          />
        </Loader>
      </Container>
    </Page>
  );
};

BugDetails.Layout = DashboardLayout;

export default BugDetails;
