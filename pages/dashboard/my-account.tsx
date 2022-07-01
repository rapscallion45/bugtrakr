import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Page from '../../components/Page/Page';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import UserProfileForm from '../../components/UserProfileForm/UserProfileForm';
import UserMembershipForm from '../../components/UserMembershipForm/UserMembershipForm';
import UserBillingForm from '../../components/UserBillingForm/UserBillingForm';
import ChangePasswordRequestForm from '../../components/ChangePasswordRequestForm/ChangePasswordRequestForm';
import Loader from '../../components/Loader/Loader';
import { AppState } from '../../redux/reducers';

const TabStyle = styled(Tab)({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '60px',
});

interface MyAccountTabPanelProps {
  children?: any;
  value?: number;
  index?: number;
}

const MyAccountTabPanel: FC<MyAccountTabPanelProps> = function MyAccountTabPanel({
  children,
  value,
  index,
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box sx={{ paddingBottom: '30px' }}>{children}</Box>}
    </div>
  );
};

const MyAccount = function MyAccount() {
  const account = useSelector((state: AppState) => state.account);
  const [tabValue, setTabValue] = useState(0);
  const dataLoading = account.loading;
  const dataLoaded = account.loaded;
  const dataError = !account.user && !account.loading;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const a11yProps = (index) => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  });

  const getAccountTabs = () => (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="my account tabs"
        sx={{ padding: 0 }}
      >
        <TabStyle
          label="My Profile"
          icon={<AccountCircle sx={{ margin: '0px 10px 3px 10px !important' }} />}
          {...a11yProps(0)}
        />
        <TabStyle
          label="Membership"
          icon={<CardMembershipIcon sx={{ margin: '0px 10px 3px 10px !important' }} />}
          {...a11yProps(1)}
        />
        <TabStyle
          label="Billing"
          icon={<MonetizationOnIcon sx={{ margin: '0px 10px 3px 10px !important' }} />}
          {...a11yProps(2)}
        />
        <TabStyle
          label="Change Password"
          icon={<KeyIcon sx={{ margin: '0px 10px 3px 10px !important' }} />}
          {...a11yProps(2)}
        />
      </Tabs>

      <MyAccountTabPanel value={tabValue} index={0}>
        <UserProfileForm />
      </MyAccountTabPanel>
      <MyAccountTabPanel value={tabValue} index={1}>
        <UserMembershipForm />
      </MyAccountTabPanel>
      <MyAccountTabPanel value={tabValue} index={2}>
        <UserBillingForm />
      </MyAccountTabPanel>
      <MyAccountTabPanel value={tabValue} index={3}>
        <ChangePasswordRequestForm />
      </MyAccountTabPanel>
    </>
  );

  return (
    <Page title="Dashboard | My Account">
      <Container maxWidth="xl">
        <Typography variant="h4" component="h4" mb={2}>
          My Account
        </Typography>
        <Loader
          dataLoading={dataLoading}
          dataError={dataError}
          dataLoaded={dataLoaded}
          loadingText="Loading Data..."
          errorText="Failed to load account data"
        >
          {getAccountTabs()}
        </Loader>
      </Container>
    </Page>
  );
};

MyAccount.Layout = DashboardLayout;

export default MyAccount;
