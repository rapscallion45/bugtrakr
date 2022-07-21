import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useVerifyEmailController = () => {
  const router = useRouter();
  const emailStatus = useSelector((state: AppState) => state.verifyEmail.emailVerified);
  const dispatch = useDispatch();

  const goToLogin = () => {
    router.push('/login');
  };

  useEffect(() => {
    const token = '';

    dispatch(accountActions.verifyEmail({ token }, goToLogin));
  }, []);

  return { emailStatus };
};
export default useVerifyEmailController;
