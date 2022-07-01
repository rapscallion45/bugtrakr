import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useLoginFormController = () => {
  const dispatch = useDispatch();
  const { loggingIn, demo } = useSelector((state: AppState) => state.authentication);

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
      dispatch(accountActions.login(username, password));
    },
  });

  const handleDemoLogin = () => {
    dispatch(accountActions.demoLogin());
  };

  return { loggingIn, demo, formik, handleDemoLogin };
};
export default useLoginFormController;
