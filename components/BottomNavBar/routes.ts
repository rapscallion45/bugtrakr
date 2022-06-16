import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BugReportIcon from '@mui/icons-material/BugReport';

const routes = [
  {
    path: '/dashboard/my-bugs',
    label: 'My Bugs',
    value: '/dashboard/my-bugs',
    icon: BugReportIcon,
  },
  {
    path: '/dashboard',
    label: 'All Projects',
    value: '/dashboard',
    icon: AppsIcon,
  },
  {
    path: '/dashboard/my-account',
    label: 'My Account',
    value: '/dashboard/my-account',
    icon: AccountCircleIcon,
  },
];
export default routes;
