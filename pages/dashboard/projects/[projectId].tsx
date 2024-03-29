import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Divider,
  Collapse,
  Skeleton,
  useMediaQuery,
  SelectChangeEvent,
  SortDirection,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppsIcon from '@mui/icons-material/Apps';
import BugReportIcon from '@mui/icons-material/BugReport';
import Page from '../../../components/Page/Page';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../../components/Loader/Loader';
import BugsTable from '../../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../../components/BugsTable/BugsTableMobile';
import SortBar from '../../../components/SortBar/SortBar';
import MHidden from '../../../components/@MUI-Extended/MHidden';
import FormDialog from '../../../components/FormDialog/FormDialog';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import MembersTable from '../../../components/MembersTable/MembersTable';
import MembersTableMobile from '../../../components/MembersTable/MembersTableMobile';
import ProjectForm from '../../../components/ProjectForm/ProjectForm';
import BugForm from '../../../components/BugForm/BugForm';
import Link from '../../../components/Link/Link';
import ProjectMenu from '../../../components/ProjectMenu/ProjectMenu';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { bugActions, projectActions } from '../../../redux/actions';
import { AppState } from '../../../redux/reducers';
import { formatDateTime, sortBugs, filterBugs, sortProjectMembers } from '../../../utils';
import { BugSortValues, ProjectMemberSortValues } from '../../../redux/types/types';

const TabStyle = styled(Tab)({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '60px',
});

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name (A - Z)' },
  { value: 'z-a', label: 'Name (Z - A)' },
  { value: 'h-l', label: 'Priority (High - Low)' },
  { value: 'l-h', label: 'Priority (Low - High)' },
  { value: 'closed', label: 'Recently Closed' },
  { value: 'reopened', label: 'Recently Reopened' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'most-notes', label: 'Most Notes' },
  { value: 'least-notes', label: 'Least Notes' },
];

const userMenuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Username (A - Z)' },
  { value: 'z-a', label: 'Username (Z - A)' },
];

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(360deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ProjectTabPanelProps {
  children: any;
  index: number;
  value: number;
}

const ProjectTabPanel: FC<ProjectTabPanelProps> = function AssetStatisticsTabPanel({
  children,
  value,
  index,
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tab-panel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box sx={{ paddingBottom: '30px' }}>{children}</Box>}
    </div>
  );
};

const ProjectDetails = function ProjectDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState<number>(0);
  const { user } = useSelector((state: AppState) => state.authentication);
  const {
    leaving,
    deleting,
    loading: projectsLoading,
    loaded: projectsLoaded,
    error: projectsError,
    data: projects,
  } = useSelector((state: AppState) => state.projects);
  const {
    loading: bugsLoading,
    loaded: bugsLoaded,
    error: bugsError,
    data: bugs,
  } = useSelector((state: AppState) => state.bugs);
  const projectData = projects?.find((project) => project.id === projectId);
  const [sortBy, setSortBy] = useState<BugSortValues>('newest');
  const [sortMembersBy, setSortMembersBy] = useState<ProjectMemberSortValues>('newest');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [searchVal, setSearchVal] = useState<string>('');
  const [searchMembersVal, setSearchMembersVal] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [usersFiltExpanded, setUsersFiltExpanded] = useState<boolean>(false);
  const sortedBugs = sortBugs(
    bugs?.filter(
      (b) => b.title.toLowerCase().includes(searchVal.toLowerCase()) && filterBugs('all', b)
    ) || [],
    sortBy
  );
  const sortedMembers = sortProjectMembers(
    projectData?.members?.filter((u) =>
      u.member.username.toLowerCase().includes(searchMembersVal.toLowerCase())
    ) || [],
    sortMembersBy
  );
  const isAdmin = user.id === projectData?.createdBy.id;

  useEffect(() => {
    if (!projectsLoaded) dispatch(projectActions.getProjects());
  }, []);

  useEffect(() => {
    /* if user navigates direct to this page, ensure bug data laoded */
    if (projectsLoaded) {
      dispatch(bugActions.getBugs(projectId));
    }
  }, [projects]);

  const handleTabChange = (e: any, newValue: number) => {
    setTab(newValue);
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const handleLeaveProject = (closeDialog: () => void) => {
    dispatch(projectActions.leaveProject(projectId.toString(), closeDialog, goToDashboard));
  };

  const handleDeleteProject = (closeDialog: () => void) => {
    dispatch(projectActions.deleteProject(projectId.toString(), closeDialog, goToDashboard));
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as BugSortValues);
  };

  const handleMembersSortChange = (e: SelectChangeEvent) => {
    setSortMembersBy(e.target.value as ProjectMemberSortValues);
  };

  const handleTHeadSortChange = (value: string) => {
    setSortBy(value as BugSortValues);
    setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchVal(searchValue);
  };

  const handleMembersSearchChange = (searchValue: string) => {
    setSearchMembersVal(searchValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUsersFiltExpandClick = () => {
    setUsersFiltExpanded(!usersFiltExpanded);
  };

  const a11yProps = (index: string) => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  });

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
            {projectsLoaded ? projectData?.name : <Skeleton width={100} />}
          </Typography>
        </Breadcrumbs>
        <Box display="flex" flexDirection="column" sx={{ pt: 2, pb: 5 }}>
          <Box display="flex" pb={1}>
            <Typography variant="h3">
              {projectsLoaded ? projectData?.name : <Skeleton width={200} />}
            </Typography>
            {projectsLoaded ? (
              <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                {!isAdmin ? (
                  <ConfirmDialog
                    title="Confirm Leave Project"
                    contentText={`Are you sure you want to leave project "${projectData?.name}"?`}
                    actionBtnText="Leave"
                    triggerBtn={{
                      type: isMobile ? 'fab' : 'normal',
                      text: 'Leave Project',
                      icon: ExitToAppIcon,
                    }}
                    processing={leaving}
                    actionFunc={(closeDialog) => handleLeaveProject(closeDialog)}
                  />
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <ConfirmDialog
                      title="Confirm Delete Project"
                      contentText={`Are you sure you want to permanently delete project "${projectData?.name}"?`}
                      actionBtnText="Delete"
                      triggerBtn={{
                        type: 'icon',
                        icon: DeleteIcon,
                        color: 'inherit',
                      }}
                      processing={deleting}
                      actionFunc={(closeDialog) => handleDeleteProject(closeDialog)}
                    />
                    <ProjectMenu
                      projectId={projectData?.id}
                      currentName={projectData?.name}
                      currentMembers={projectData?.members.map((m) => m.member.id)}
                      isAdmin={isAdmin}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={35}
                  sx={{ borderRadius: '8px' }}
                />
              </Box>
            )}
          </Box>
          <Divider />
          {projectsLoaded ? (
            <>
              <Typography pt={1} variant="body1">
                Admin: <span style={{ fontWeight: 'bold' }}>{projectData?.createdBy.username}</span>
              </Typography>
              <Typography variant="body1">
                Created on:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {formatDateTime(projectData?.createdAt || 0)}
                </span>
              </Typography>
            </>
          ) : (
            <>
              <Skeleton width={230} />
              <Skeleton width={230} />
            </>
          )}
        </Box>
        <Loader
          dataLoading={projectsLoading || bugsLoading || !projectsLoaded || !bugsLoaded}
          dataError={Boolean(projectsError) || Boolean(bugsError)}
          dataLoaded={projectsLoaded && bugsLoaded}
          loadingText="Fetching project data..."
          errorText="Failed to load project details."
        >
          <Box pb={3}>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="project tabs"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <TabStyle
                icon={<QueryStatsIcon sx={{ margin: '0px 10px 3px 10px !important' }} />}
                label="Project Overview"
                {...a11yProps('0')}
              />
              <TabStyle
                icon={<GroupIcon sx={{ margin: '0px 10px 3px 10px !important' }} />}
                label="Assigned Users"
                {...a11yProps('1')}
              />
            </Tabs>
          </Box>
          <ProjectTabPanel value={tab} index={0}>
            <Box display="flex" sx={{ pt: 2, pb: isMobile ? 2 : 5 }}>
              <BugReportIcon fontSize="large" style={{ marginRight: '0.2em' }} />
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
                    <BugForm isEditMode={false} projectId={projectData?.id} />
                  </FormDialog>
                </Box>
              </MHidden>
              <MHidden width="mdUp">
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show filters"
                >
                  {expanded ? <FilterListOffIcon /> : <FilterListIcon />}
                </ExpandMore>
              </MHidden>
              <MHidden width="mdDown">
                <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
                  <Box sx={{ minWidth: '190px' }}>
                    <SearchBar
                      searchValue={searchVal}
                      setSearchValue={handleSearchChange}
                      label="Bugs"
                      size="small"
                    />
                  </Box>
                </Box>
                <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
                  <Box sx={{ minWidth: '190px' }}>
                    <SortBar
                      sortBy={sortBy}
                      handleSortChange={handleSortChange}
                      menuItems={menuItems}
                      label="Bugs"
                      size="small"
                    />
                  </Box>
                </Box>
              </MHidden>
            </Box>
            {!isMobile && (
              <>
                <MHidden width="mdUp">
                  <Collapse in={expanded} unmountOnExit>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                      pb={4}
                    >
                      <Box pt={1} pb={2} sx={{ minWidth: '190px' }}>
                        <SearchBar
                          searchValue={searchVal}
                          setSearchValue={handleSearchChange}
                          label="Bugs"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ minWidth: '190px' }}>
                        <SortBar
                          sortBy={sortBy}
                          handleSortChange={handleSortChange}
                          menuItems={menuItems}
                          label="Bugs"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Collapse>
                </MHidden>
                <BugsTable
                  bugs={sortedBugs}
                  projectId={projectId}
                  sortBy={sortBy}
                  sortDir={sortDir}
                  sortChange={handleTHeadSortChange}
                />
              </>
            )}
            {isMobile && (
              <>
                <Collapse in={expanded} unmountOnExit>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    sx={{ width: '100%' }}
                    pb={4}
                  >
                    <Box pt={1} pb={2} sx={{ minWidth: '190px' }}>
                      <SearchBar
                        searchValue={searchVal}
                        setSearchValue={handleSearchChange}
                        label="Bugs"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ minWidth: '190px' }}>
                      <SortBar
                        sortBy={sortBy}
                        handleSortChange={handleSortChange}
                        menuItems={menuItems}
                        label="Bugs"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Collapse>
                <BugsTableMobile bugs={sortedBugs} projectId={projectId} />
              </>
            )}
          </ProjectTabPanel>
          <ProjectTabPanel value={tab} index={1}>
            <Box display="flex" sx={{ pt: 2, pb: isMobile ? 2 : 5 }}>
              <GroupIcon fontSize="large" style={{ marginRight: '0.2em' }} />
              <Typography variant="h4">Users List</Typography>
              {isAdmin && (
                <MHidden width="smDown">
                  <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
                    <FormDialog
                      triggerBtn={{
                        type: 'normal',
                        icon: PersonAddIcon,
                        text: 'Add User',
                      }}
                      title="Add User"
                    >
                      <ProjectForm
                        editMode="members"
                        projectId={projectData?.id}
                        currentMembers={projectData?.members.map((m) => m.member.id)}
                        currentName={projectData?.name}
                      />
                    </FormDialog>
                  </Box>
                </MHidden>
              )}
              <MHidden width="mdUp">
                <ExpandMore
                  expand={usersFiltExpanded}
                  onClick={handleUsersFiltExpandClick}
                  aria-expanded={usersFiltExpanded}
                  aria-label="show user filters"
                >
                  {usersFiltExpanded ? <FilterListOffIcon /> : <FilterListIcon />}
                </ExpandMore>
              </MHidden>
              <MHidden width="mdDown">
                <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
                  <Box sx={{ minWidth: '190px' }}>
                    <SearchBar
                      searchValue={searchMembersVal}
                      setSearchValue={handleMembersSearchChange}
                      label="Users"
                      size="small"
                    />
                  </Box>
                </Box>
                <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
                  <Box sx={{ minWidth: '190px' }}>
                    <SortBar
                      sortBy={sortMembersBy}
                      handleSortChange={handleMembersSortChange}
                      menuItems={userMenuItems}
                      label="Users"
                      size="small"
                    />
                  </Box>
                </Box>
              </MHidden>
            </Box>
            {!isMobile ? (
              <>
                <MHidden width="mdUp">
                  <Collapse in={usersFiltExpanded} unmountOnExit>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ width: '100%' }}
                      pb={4}
                    >
                      <Box pt={1} pb={2} sx={{ minWidth: '190px' }}>
                        <SearchBar
                          searchValue={searchMembersVal}
                          setSearchValue={handleMembersSearchChange}
                          label="Users"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ minWidth: '190px' }}>
                        <SortBar
                          sortBy={sortMembersBy}
                          handleSortChange={handleMembersSortChange}
                          menuItems={userMenuItems}
                          label="Users"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Collapse>
                </MHidden>
                <MembersTable
                  members={sortedMembers}
                  projectId={projectData?.id}
                  adminId={projectData?.createdBy?.id}
                />
              </>
            ) : (
              <>
                <Collapse in={usersFiltExpanded} unmountOnExit>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    sx={{ width: '100%' }}
                    pb={4}
                  >
                    <Box pt={1} pb={2} sx={{ minWidth: '190px' }}>
                      <SearchBar
                        searchValue={searchMembersVal}
                        setSearchValue={handleMembersSearchChange}
                        label="Users"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ minWidth: '190px' }}>
                      <SortBar
                        sortBy={sortMembersBy}
                        handleSortChange={handleMembersSortChange}
                        menuItems={userMenuItems}
                        label="Users"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Collapse>
                <MembersTableMobile
                  members={sortedMembers}
                  projectId={projectData?.id}
                  projectName={projectData?.name}
                  adminId={projectData?.createdBy?.id}
                />
              </>
            )}
          </ProjectTabPanel>
        </Loader>
      </Container>
    </Page>
  );
};

ProjectDetails.Layout = DashboardLayout;

export default ProjectDetails;
