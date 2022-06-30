import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions, usersActions } from '../../redux/actions';

const AppStateProviderController = function AppStateProviderController() {
  const dispatch = useDispatch();
  const { authenticating, user, loggedIn } = useSelector((state) => state.authentication);
  const loading = Boolean(authenticating);

  useEffect(() => {
    /* On first load run user validation */
    dispatch(accountActions.authenticate());
  }, []);

  useEffect(() => {
    /* whenever authentication state changes, grab auth protected data */
    if (loggedIn && user) {
      dispatch(accountActions.get(user?.id));
      dispatch(usersActions.getUsers());
    }
  }, [user, loggedIn]);

  return { loading };
};
export default AppStateProviderController;
