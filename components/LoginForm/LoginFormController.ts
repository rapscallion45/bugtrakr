import { useFormik } from "formik"
import * as Yup from "yup"
import useCredentialsLogin from "../../hooks/useCredentialsLogin"

const useLoginFormController = () => {
  const { login, handleDemoLogin, loggingIn, demoLoggingIn } = useCredentialsLogin()
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username or email is required"),
    password: Yup.string().required("Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema,
    onSubmit: ({ username, password }) => login(username, password),
  })

  return { loggingIn, demoLoggingIn, formik, handleDemoLogin }
}
export default useLoginFormController
