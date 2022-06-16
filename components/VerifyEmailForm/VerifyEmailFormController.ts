import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { accountActions } from '../../redux/actions';

const useVerifyEmailController = () => {
  const emailStatus = useSelector((state) => state.verifyEmail.emailVerified);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    /* remove token from url to prevent http referer leakage */
    // history.replace(window.location.pathname);

    dispatch(accountActions.verifyEmail({ token }));
  }, []);

  return { emailStatus };
};
export default useVerifyEmailController;