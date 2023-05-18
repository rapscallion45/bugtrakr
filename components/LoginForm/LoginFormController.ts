import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { alertActions } from '../../redux/actions';

const useLoginFormController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);
  const [demoLoggingIn, setDemoLoggingIn] = useState(false);

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
      setLoggingIn(true);
      signIn('credentials', {
        redirect: false,
        username,
        password,
      }).then(({ ok, error }) => {
        if (ok) {
          router.push('/dashboard');
        } else {
          setLoggingIn(false);
          dispatch(
            alertActions.enqueueSnackbar({
              message: error,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
              },
            })
          );
        }
      });
    },
  });

  const handleDemoLogin = () => {
    setDemoLoggingIn(true);
    signIn('credentials', {
      redirect: false,
      username: process.env.DEMO_LOGIN_USERNAME,
      password: process.env.DEMO_LOGIN_PASSWORD,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push('/dashboard');
      } else {
        setDemoLoggingIn(false);
        dispatch(
          alertActions.enqueueSnackbar({
            message: error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    });
  };

  return { loggingIn, demoLoggingIn, formik, handleDemoLogin };
};
export default useLoginFormController;
