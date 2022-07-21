import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useLoginFormController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggingIn, demo } = useSelector((state: AppState) => state.authentication);

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username or email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: ({ username, password }) => {
      dispatch(accountActions.login({ username, password }, goToDashboard));
    },
  });

  const handleDemoLogin = () => {
    dispatch(accountActions.demoLogin(goToDashboard));
  };

  return { loggingIn, demo, formik, handleDemoLogin };
};
export default useLoginFormController;
