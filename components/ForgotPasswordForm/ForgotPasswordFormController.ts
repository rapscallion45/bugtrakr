import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useForgotPasswordFormController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const requestingPassword = useSelector(
    (state: AppState) => state.changePassword.requestingPassword
  );

  const gotToResetPasswordPage = () => {
    router.push('/reset-password');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: ({ email }) => {
      dispatch(accountActions.changePassword({ email }, gotToResetPasswordPage));
    },
  });

  return { requestingPassword, formik };
};
export default useForgotPasswordFormController;
