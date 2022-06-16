import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppsIcon from '@mui/icons-material/Apps';
import BugReportIcon from '@mui/icons-material/BugReport';

const sidebarConfig = [
  {
    title: 'general',
  },
  {
    title: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    title: 'all projects',
    path: '/dashboard',
    icon: AppsIcon,
  },
  {
    title: 'my bugs',
    path: '/dashboard/my-bugs',
    icon: BugReportIcon,
  },
  {
    title: 'my account',
    path: '/dashboard/my-account',
    icon: AccountCircleIcon,
  },
  {
    title: 'social',
  },
  {
    title: `Follow On Twitter`,
    path: `https://twitter.com/${process.env.TWITTER_HANDLE}`,
    icon: TwitterIcon,
    newTab: true,
  },
];

export default sidebarConfig;
