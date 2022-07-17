import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../components/Loader/Loader';
import BugsTable from '../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../components/BugsTable/BugsTableMobile';
import { bugActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

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

  useEffect(() => {
    dispatch(bugActions.getBugsByUser(user?.id));
  }, []);

  return (
    <Page title="Dashboard | My Bugs">
      <Container maxWidth="xl">
        <Box display="flex" sx={{ pb: 5 }}>
          <Box pb={1}>
            <Typography variant="h3">My Bugs</Typography>
            <Typography variant="body1">List of all bugs created and updated by you</Typography>
          </Box>
        </Box>
        <Loader
          dataLoading={bugsLoading}
          dataError={Boolean(bugsError)}
          dataLoaded={bugsLoaded}
          loadingText="Fetching your bug data..."
          errorText="Failed to load your bug data."
        >
          {!isMobile && <BugsTable bugs={bugs} isMyBugs />}
          {isMobile && <BugsTableMobile bugs={bugs} isMyBugs />}
        </Loader>
      </Container>
    </Page>
  );
};

MyBugs.Layout = DashboardLayout;

export default MyBugs;
