import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useUserProfileFormController = () => {
  const { updating } = useSelector((state) => state.account);

  const validationSchema = Yup.object().shape({
    nameOnCard: Yup.string().required('Cardholder name is required'),
    cardNumber: Yup.number().required('Cardnumber is required'),
    expireDate: Yup.string(),
    cvc: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      nameOnCard: '',
      cardNumber: '',
      expireDate: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  return {
    formik,
    updating,
  };
};
export default useUserProfileFormController;
