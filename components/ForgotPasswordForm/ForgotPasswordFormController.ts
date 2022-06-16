import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';

const useForgotPasswordFormController = () => {
  const requestingPassword = useSelector((state) => state.forgotPassword.requestingPassword);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: ({ email }) => {
      dispatch(accountActions.forgotPassword(email));
    },
  });

  return { requestingPassword, formik };
};
export default useForgotPasswordFormController;
