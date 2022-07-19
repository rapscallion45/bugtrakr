import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import SortBar from '../../components/SortBar/SortBar';
import BugsTable from '../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../components/BugsTable/BugsTableMobile';
import { bugActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { sortBugs, filterBugs } from '../../utils';
import { BugSortValues } from '../../redux/types/types';
import SearchBar from '../../components/SearchBar/SearchBar';

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
  const [searchVal, setSearchVal] = useState<string>('');
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

  const handleSearchChange = (searchValue: string) => {
    setSearchVal(searchValue);
  };

  return (
    <Page title="Dashboard | My Bugs">
      <Container maxWidth="xl">
        <Box display="flex" sx={{ pb: 5 }}>
          <Box pb={1}>
            <Typography variant="h3">My Bugs</Typography>
            <Typography variant="body1">List of all bugs created and updated by you</Typography>
          </Box>
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
        </Box>
        <Loader
          dataLoading={bugsLoading}
          dataError={Boolean(bugsError)}
          dataLoaded={bugsLoaded}
          loadingText="Fetching your bug data..."
          errorText="Failed to load your bug data."
        >
          {!isMobile && <BugsTable bugs={sortedBugs} isMyBugs />}
          {isMobile && <BugsTableMobile bugs={sortedBugs} isMyBugs />}
        </Loader>
      </Container>
    </Page>
  );
};

MyBugs.Layout = DashboardLayout;

export default MyBugs;
