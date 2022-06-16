import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import routes from './routes';

const useBottomNavBarController = () => {
  const isDesktop = useMediaQuery('(min-width:992px)');
  const router = useRouter();
  const [value, setValue] = useState(router.pathname);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  useEffect(() => {
    setValue(router.pathname);
  }, [router.pathname]);

  const onChange = (event, newValue) => {
    setValue(newValue);
  };

  const showBottomBar = !isDesktop && loggedIn;
  const hideBottomBarTrigger = useMediaQuery('(min-height:500px)');

  return {
    showBottomBar,
    hideBottomBarTrigger,
    value,
    routes,
    onChange,
  };
};
export default useBottomNavBarController;
