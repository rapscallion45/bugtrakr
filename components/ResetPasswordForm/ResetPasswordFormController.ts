import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useResetPasswordController = () => {
  const resettingPassword = useSelector((state: AppState) => state.resetPassword.resettingPassword);
  const tokenStatus = useSelector((state: AppState) => state.validateResetToken.tokenValid);
  const [tokenString, setTokenString] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    /* remove token from url to prevent http referer leakage */
    // history.replace(window.location.pathname);

    dispatch(accountActions.validateResetToken(token));
    setTokenString(token);
  }, []);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: ({ password }) => {
      dispatch(accountActions.resetPassword(tokenString, password));
    },
  });

  return { resettingPassword, tokenStatus, formik };
};
export default useResetPasswordController;
