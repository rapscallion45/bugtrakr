import { useSelector, useDispatch } from 'react-redux';
import { accountActions } from '../../redux/actions';

const useChangePasswordRequestFormController = () => {
  const dispatch = useDispatch();
  const { requestingPassword } = useSelector((state) => state.changePassword);
  const { user, demo } = useSelector((state) => state.authentication);
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
