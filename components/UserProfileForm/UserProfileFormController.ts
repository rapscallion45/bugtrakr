import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountActions } from '../../redux/actions';

const useUserProfileFormController = () => {
  const { updating, user } = useSelector((state) => state.account);
  const userFirstName = user?.firstName;
  const userAvatarSrc = user?.avatar?.url;
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
    validationSchema,
    onSubmit: (fields) => {
      dispatch(accountActions.update(user?.id, fields));
    },
  });

  return {
    userFirstName,
    userAvatarSrc,
    formik,
    updating,
  };
};
export default useUserProfileFormController;
