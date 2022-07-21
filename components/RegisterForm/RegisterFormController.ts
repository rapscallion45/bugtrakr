import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const RegisterController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registering = useSelector((state: AppState) => state.registration.registering);

  const goToLogin = () => {
    router.push('login');
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: ({ firstName, lastName, email, username, password }) => {
      dispatch(
        accountActions.register({ firstName, lastName, email, username, password }, goToLogin)
      );
    },
  });

  return { registering, formik };
};
export default RegisterController;
