import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useResetPasswordController = () => {
  const router = useRouter();
  const resettingPassword = useSelector((state: AppState) => state.resetPassword.resettingPassword);
  const tokenStatus = useSelector((state: AppState) => state.validateResetToken.tokenValid);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    /* each time page loads, reset the validation process */
    dispatch(accountActions.resetTokenValidation());
  }, []);

  const goToLoginPage = () => {
    router.push('/login');
  };

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
      dispatch(accountActions.resetPassword({ resetToken, password }, goToLoginPage));
    },
  });

  const validationSchemaResetCode = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d+$/, 'Verification code is a 6 digit number')
      .length(6, 'Password verification is 6 characters long'),
  });

  const formikResetCode = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: validationSchemaResetCode,
    onSubmit: ({ token }) => {
      dispatch(accountActions.validateResetToken({ resetToken: token }));
      setResetToken(token);
    },
  });

  return { resettingPassword, tokenStatus, formik, formikResetCode };
};
export default useResetPasswordController;
