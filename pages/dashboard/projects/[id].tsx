import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from '../../../components/Page/Page';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import Loader from '../../../components/Loader/Loader';
import BugsTable from '../../../components/BugsTable/BugsTable';
import BugsTableMobile from '../../../components/BugsTable/BugsTableMobile';

const bugData = [
  {
    id: 1,
    title: 'Bug 1',
    priority: 'low',
    isResolved: false,
    createdAt: Date.now(),
    createdBy: { username: 'testuser1' },
    updatedAt: null,
    updatedBy: { username: 'testuser1' },
    notes: [{ note: 'Test' }, { note: 'Test' }, { note: 'Test' }],
  },
  {
    id: 2,
    title: 'Bug 2',
    priority: 'low',
    isResolved: true,
    createdAt: Date.now(),
    createdBy: { username: 'testuser2' },
    updatedAt: null,
    updatedBy: { username: 'testuser1' },
    notes: 6,
  },
  {
    id: 3,
    title: 'Bug 3',
    priority: 'low',
    isResolved: false,
    createdAt: Date.now(),
    createdBy: { username: 'testuser3' },
    updatedAt: null,
    updatedBy: { username: 'testuser1' },
    notes: 2,
  },
  {
    id: 4,
    title: 'Bug 4',
    priority: 'low',
    isResolved: true,
    createdAt: Date.now(),
    createdBy: { username: 'testuser4' },
    updatedAt: null,
    updatedBy: { username: 'testuser1' },
    notes: 10,
  },
];

const ProjectDetails = function ProjectDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = { name: 'Test Project' };

  return (
    <Page title={`Dashboard | ${data?.name} Data`}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">{data.name}</Typography>
        </Box>
        <Loader
          dataLoading={false}
          dataError={false}
          dataLoaded
          loadingText="Fetching bug data..."
          errorText="Failed to load bug data."
        >
          {!isMobile && <BugsTable bugs={bugData} />}
          {isMobile && <BugsTableMobile bugs={bugData} />}
        </Loader>
      </Container>
    </Page>
  );
};

ProjectDetails.Layout = DashboardLayout;

export default ProjectDetails;