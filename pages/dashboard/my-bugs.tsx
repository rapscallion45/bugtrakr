// import { useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
// import Loader from '../../components/Loader/Loader';
// import BugsTable from '../../components/BugsTable/BugsTable';
// import BugsTableMobile from '../../components/BugsTable/BugsTableMobile';

// const bugData = [
//   {
//     id: '1',
//     projectId: '1',
//     title: 'Bug 1',
//     description: 'Bug test 1',
//     priority: 'low',
//     isResolved: false,
//     createdAt: Date.now(),
//     createdBy: { username: 'testuser1' },
//     updatedAt: null,
//     updatedBy: { username: 'testuser1' },
//     notes: [],
//   },
//   {
//     id: '2',
//     projectId: '2',
//     title: 'Bug 2',
//     description: 'Bug test 2',
//     priority: 'low',
//     isResolved: true,
//     createdAt: Date.now(),
//     createdBy: { username: 'testuser2' },
//     updatedAt: null,
//     updatedBy: { username: 'testuser1' },
//     notes: 6,
//   },
//   {
//     id: '3',
//     projectId: '3',
//     title: 'Bug 3',
//     description: 'Bug test 3',
//     priority: 'low',
//     isResolved: false,
//     createdAt: Date.now(),
//     createdBy: { username: 'testuser3' },
//     updatedAt: null,
//     updatedBy: { username: 'testuser1' },
//     notes: 2,
//   },
//   {
//     id: '4',
//     projectId: '4',
//     title: 'Bug 4',
//     description: 'Bug test 4',
//     priority: 'low',
//     isResolved: true,
//     createdAt: Date.now(),
//     createdBy: { username: 'testuser4' },
//     updatedAt: null,
//     updatedBy: { username: 'testuser1' },
//     notes: 10,
//   },
// ];

const MyBugs = function MyBugs() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page title="Dashboard | My Bugs">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">My Bugs</Typography>
        </Box>
        {/* <Loader
          dataLoading={false}
          dataError={false}
          dataLoaded
          loadingText="Fetching bug data..."
          errorText="Failed to load bug data."
        >
          {!isMobile && <BugsTable bugs={bugData} />}
          {isMobile && <BugsTableMobile bugs={bugData} />}
        </Loader> */}
      </Container>
    </Page>
  );
};

MyBugs.Layout = DashboardLayout;

export default MyBugs;
