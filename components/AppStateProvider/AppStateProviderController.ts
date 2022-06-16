import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../redux/actions';

const AppStateProviderController = function AppStateProviderController() {
  const dispatch = useDispatch();
  const { authenticating, user, loggedIn } = useSelector((state) => state.authentication);
  const loading = Boolean(authenticating);

  useEffect(() => {
    /* On first load run user validation */
    dispatch(accountActions.authenticate());
  }, []);

  useEffect(() => {
    /* whenever authentication state changes, grab account info */
    dispatch(accountActions.get(user?.id));
  }, [user, loggedIn]);

  return { loading };
};
export default AppStateProviderController;
