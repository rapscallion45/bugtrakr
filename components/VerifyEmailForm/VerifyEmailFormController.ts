import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useVerifyEmailController = () => {
  const { verifyingEmail } = useSelector((state: AppState) => state.verifyEmail);
  const emailStatus = useSelector((state: AppState) => state.verifyEmail.emailVerified);
  const { email: registeredEmail } = useSelector((state: AppState) => state.registration);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountActions.resetEmailVerification());
  }, []);

  const validationSchema = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d+$/, 'Verification code is a 6 digit number')
      .length(6, 'Password verification is 6 characters long'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      token: '',
      email: registeredEmail || '',
    },
    validationSchema,
    onSubmit: ({ token, email }) => {
      dispatch(accountActions.verifyEmail({ token, email }));
    },
  });

  return { emailStatus, verifyingEmail, formik };
};
export default useVerifyEmailController;
