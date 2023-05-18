import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useChangePasswordRequestFormController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { requestingPassword } = useSelector((state: AppState) => state.changePassword);
  const { data: session } = useSession();
  const { user } = session;
  const { user: account } = useSelector((state: AppState) => state.account);
  const { email } = account;

  const gotToResetPasswordPage = () => {
    router.push('/reset-password');
  };

  const changePasswordRequest = () => {
    dispatch(accountActions.changePassword({ email }, gotToResetPasswordPage));
  };

  return {
    requestingPassword,
    demo: user.demo,
    changePasswordRequest,
  };
};
export default useChangePasswordRequestFormController;
