import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useVerifyEmailController = () => {
  const router = useRouter();
  const { verifyingEmail } = useSelector((state: AppState) => state.verifyEmail);
  const emailStatus = useSelector((state: AppState) => state.verifyEmail.emailVerified);
  const dispatch = useDispatch();

  const goToLogin = () => {
    router.push('/login');
  };

  const validationSchemaVerifyCode = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d+$/, 'Verification code is a 6 digit number')
      .length(6, 'Password verification is 6 characters long'),
  });

  const formikVerifyCode = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: validationSchemaVerifyCode,
    onSubmit: ({ token }) => {
      dispatch(accountActions.verifyEmail({ token }, goToLogin));
    },
  });

  return { emailStatus, verifyingEmail, formikVerifyCode };
};
export default useVerifyEmailController;
