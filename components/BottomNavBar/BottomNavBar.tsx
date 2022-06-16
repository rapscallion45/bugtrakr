import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from '../Link/Link';
import useBottomNavBarController from './BottomNavBarController';
import HideOnTrigger from '../HideOnTrigger/HideOnTrigger';

const BottomNavBar: FC = function BottomNavBar() {
  const { showBottomBar, hideBottomBarTrigger, value, routes, onChange } =
    useBottomNavBarController();

  return showBottomBar ? (
    <HideOnTrigger trigger={!hideBottomBarTrigger} direction="up">
      <BottomNavigation value={value} onChange={onChange} showLabels>
        {routes.map((route) => (
          <BottomNavigationAction
            component={Link}
            key={route.value}
            label={route.label}
            value={route.value}
            icon={<route.icon />}
            href={route.path}
          />
        ))}
      </BottomNavigation>
    </HideOnTrigger>
  ) : null;
};
export default BottomNavBar;
