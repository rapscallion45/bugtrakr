import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, SelectChangeEvent, SortDirection, Collapse } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Page from '../../components/Page/Page';
import MHidden from '../../components/@MUI-Extended/MHidden';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import SortBar from '../../components/SortBar/SortBar';
import BugsTable from '../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../components/BugsTable/BugsTableMobile';
import SearchBar from '../../components/SearchBar/SearchBar';
import { bugActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { sortBugs, filterBugs } from '../../utils';
import { BugSortValues } from '../../redux/types/types';

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

const MyBugs = function MyBugs() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector((state: AppState) => state.authentication);
  const {
    loading: bugsLoading,
    loaded: bugsLoaded,
    error: bugsError,
    data: bugs,
  } = useSelector((state: AppState) => state.bugs);
  const [sortBy, setSortBy] = useState<BugSortValues>('newest');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [searchVal, setSearchVal] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);
  const sortedBugs = sortBugs(
    bugs?.filter(
      (b) => b.title.toLowerCase().includes(searchVal.toLowerCase()) && filterBugs('all', b)
    ) || [],
    sortBy
  );

  useEffect(() => {
    dispatch(bugActions.getBugsByUser(user?.id));
  }, []);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as BugSortValues);
  };

  const handleTHeadSortChange = (value: string) => {
    setSortBy(value as BugSortValues);
    setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchVal(searchValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Page title="Dashboard | My Bugs">
      <Container maxWidth="xl">
        <Box display="flex" sx={{ pb: isMobile ? 3 : 5 }}>
          <Box pb={1}>
            <Typography variant="h3">My Bugs</Typography>
            <Typography variant="body1">List of all bugs created and updated by you</Typography>
          </Box>
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
            <Box
              pl={2}
              display="flex"
              justifyContent="end"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Box sx={{ minWidth: '190px' }}>
                <SearchBar
                  searchValue={searchVal}
                  setSearchValue={handleSearchChange}
                  label="My Bugs"
                  size="small"
                />
              </Box>
            </Box>
            <Box pl={2} display="flex" justifyContent="end" alignItems="center">
              <Box sx={{ minWidth: '190px' }}>
                <SortBar
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                  menuItems={menuItems}
                  label="My Bugs"
                  size="small"
                />
              </Box>
            </Box>
          </MHidden>
        </Box>
        <Loader
          dataLoading={bugsLoading}
          dataError={Boolean(bugsError)}
          dataLoaded={bugsLoaded}
          loadingText="Fetching your bug data..."
          errorText="Failed to load your bug data."
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
                        label="My Bugs"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ minWidth: '190px' }}>
                      <SortBar
                        sortBy={sortBy}
                        handleSortChange={handleSortChange}
                        menuItems={menuItems}
                        label="My Bugs"
                        size="small"
                      />
                    </Box>
                  </Box>
                </MHidden>
              </Collapse>
              <BugsTable
                bugs={sortedBugs}
                isMyBugs
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
                      label="My Bugs"
                      size="small"
                    />
                  </Box>
                  <Box sx={{ minWidth: '190px' }}>
                    <SortBar
                      sortBy={sortBy}
                      handleSortChange={handleSortChange}
                      menuItems={menuItems}
                      label="My Bugs"
                      size="small"
                    />
                  </Box>
                </Box>
              </Collapse>
              <BugsTableMobile bugs={sortedBugs} isMyBugs />
            </>
          )}
        </Loader>
      </Container>
    </Page>
  );
};

MyBugs.Layout = DashboardLayout;

export default MyBugs;
