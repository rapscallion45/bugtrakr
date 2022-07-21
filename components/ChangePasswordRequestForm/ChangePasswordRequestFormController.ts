import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useChangePasswordRequestFormController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { requestingPassword } = useSelector((state: AppState) => state.changePassword);
  const { demo } = useSelector((state: AppState) => state.authentication);
  const { user } = useSelector((state: AppState) => state.account);
  const { email } = user;

  const gotToResetPasswordPage = () => {
    router.push('/reset-password');
  };

  const changePasswordRequest = () => {
    dispatch(accountActions.changePassword({ email }, gotToResetPasswordPage));
  };

  return {
    requestingPassword,
    demo,
    changePasswordRequest,
  };
};
export default useChangePasswordRequestFormController;
