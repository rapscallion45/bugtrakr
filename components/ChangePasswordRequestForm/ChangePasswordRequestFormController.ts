import { useSelector, useDispatch } from 'react-redux';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useChangePasswordRequestFormController = () => {
  const dispatch = useDispatch();
  const { requestingPassword } = useSelector((state: AppState) => state.changePassword);
  const { user, demo } = useSelector((state: AppState) => state.authentication);
  const { email } = user;

  const changePasswordRequest = () => {
    dispatch(accountActions.changePassword(email));
  };

  return {
    requestingPassword,
    demo,
    changePasswordRequest,
  };
};
export default useChangePasswordRequestFormController;
