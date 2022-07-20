import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, SelectChangeEvent, SortDirection, Collapse } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
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
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [searchVal, setSearchVal] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);
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

  const handleTHeadSortChange = (value: string) => {
    setSortBy(value as ProjectSortValues);
    setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchVal(searchValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Page title="Dashboard | All Projects">
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" sx={{ pb: isMobile ? 3 : 5 }}>
          <Box>
            <Typography variant="h3">All Projects</Typography>
            <Typography variant="body1">List of all accessible projects</Typography>
          </Box>
          <MHidden width="smDown">
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <FormDialog
                triggerBtn={{
                  type: 'normal',
                  icon: AddIcon,
                  text: 'New Project',
                }}
                title="Create New Project"
              >
                <ProjectForm editMode={null} />
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
          </MHidden>
        </Box>
        <Loader
          dataLoading={loading}
          dataError={Boolean(error)}
          dataLoaded={loaded}
          loadingText="Fetching project data..."
          errorText="Failed to load project data."
        >
          {!isMobile && (
            <>
              <Collapse in={expanded} unmountOnExit>
                <MHidden width="mdUp">
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
                        label="Projects"
                        size="small"
                      />
                    </Box>
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
                </MHidden>
              </Collapse>
              <ProjectsTable
                projects={sortedProjects}
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
                      label="Projects"
                      size="small"
                    />
                  </Box>
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
              </Collapse>
              <ProjectsTableMobile projects={sortedProjects} />
            </>
          )}
        </Loader>
      </Container>
    </Page>
  );
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
