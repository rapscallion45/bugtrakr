import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useLoginFormController = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { data: session } = useSession();

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
        redirect: true,
        username,
        password,
        callbackUrl: '/dashboard',
      });
    },
  });

  const handleDemoLogin = () => {
    setLoggingIn(true);
    signIn('credentials', {
      redirect: true,
      username: process.env.DEMO_USERNAME,
      password: process.env.DEMO_PASSWORD,
      callbackUrl: '/dashboard',
    });
  };

  return { loggingIn, demo: session?.user.demo, formik, handleDemoLogin };
};
export default useLoginFormController;
