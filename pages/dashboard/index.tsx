import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, SelectChangeEvent } from '@mui/material';
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
import SortBar from '../../components/SortBar/SortBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { sortProjects } from '../../utils';
import { projectActions } from '../../redux/actions';
import { ProjectSortValues } from '../../redux/types/types';
import { AppState } from '../../redux/reducers';

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name (A - Z)' },
  { value: 'z-a', label: 'Name (Z - A)' },
  { value: 'most-bugs', label: 'Most Bugs' },
  { value: 'least-bugs', label: 'Least Bugs' },
  { value: 'most-members', label: 'Most Members' },
  { value: 'least-members', label: 'Least Members' },
];

const Dashboard = function Dashboard() {
  const dispatch = useDispatch();
  const {
    loaded,
    loading,
    error,
    data: projects,
  } = useSelector((state: AppState) => state.projects);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortBy, setSortBy] = useState<ProjectSortValues>('newest');
  const [searchVal, setSearchVal] = useState<string>('');
  const sortedProjects = sortProjects(
    projects?.filter((p) => p.name.toLowerCase().includes(searchVal.toLowerCase())) || [],
    sortBy
  );

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, []);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as ProjectSortValues);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchVal(searchValue);
  };

  return (
    <Page title="Dashboard | All Projects">
      <Container maxWidth="xl">
        <Box display="flex" sx={{ pb: 5 }}>
          <Box>
            <Typography variant="h3">All Projects</Typography>
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
                <ProjectForm editMode={null} />
              </FormDialog>
            </Box>
          </MHidden>
          <Box pl={2} display="flex" justifyContent="end" sx={{ flexGrow: isMobile ? 1 : 0 }}>
            <Box sx={{ minWidth: '190px' }}>
              <SearchBar
                searchValue={searchVal}
                setSearchValue={handleSearchChange}
                label="Projects"
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
                label="Projects"
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Loader
          dataLoading={loading}
          dataError={Boolean(error)}
          dataLoaded={loaded}
          loadingText="Fetching project data..."
          errorText="Failed to load project data."
        >
          {!isMobile && <ProjectsTable projects={sortedProjects} />}
          {isMobile && <ProjectsTableMobile projects={sortedProjects} />}
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
