import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppState } from '../../redux/reducers';

const useUserProfileFormController = () => {
  const { updating } = useSelector((state: AppState) => state.account);

  const paymentValidationSchema = Yup.object().shape({
    nameOnCard: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('Cardholder name is required'),
    cardNumber: Yup.number().required('Cardnumber is required'),
    expireDate: Yup.string().required('Expiry date is required'),
    cvc: Yup.string().required('CVC is required'),
  });

  const formikPayment = useFormik({
    initialValues: {
      nameOnCard: '',
      cardNumber: '',
      expireDate: '',
      cvc: '',
    },
    validationSchema: paymentValidationSchema,
    onSubmit: () => {},
  });

  const addressValidationSchema = Yup.object().shape({
    address: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('Address name is required'),
    town: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('Town is required'),
    county: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('County is required'),
    country: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('Country is required'),
    postcode: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Only string characters are allowed in this field')
      .required('Postcode is required'),
  });

  const formikAddress = useFormik({
    initialValues: {
      address: '',
      town: '',
      county: '',
      country: '',
      postcode: '',
    },
    validationSchema: addressValidationSchema,
    onSubmit: () => {},
  });

  return {
    formikPayment,
    formikAddress,
    updating,
  };
};
export default useUserProfileFormController;
