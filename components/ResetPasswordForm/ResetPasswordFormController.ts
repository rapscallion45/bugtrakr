import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import useAppDispatch from "../../hooks/useAppDispatch"
import { accountActions } from "../../redux/actions"
import { AppState } from "../../redux/reducers"

const useResetPasswordController = () => {
  const { resettingPassword, passwordReset } = useSelector((state: AppState) => state.resetPassword)
  const tokenStatus = useSelector((state: AppState) => state.validateResetToken.tokenValid)
  const { email: requestedEmail } = useSelector((state: AppState) => state.changePassword)
  const [resetToken, setResetToken] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    /* each time page loads, reset the validation process */
    dispatch(accountActions.resetTokenValidation())
    dispatch(accountActions.resetPasswordReset())
  }, [dispatch])

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: ({ password }) => {
      dispatch(accountActions.resetPassword({ resetToken, password, email: userEmail }))
    },
  })

  const validationSchemaResetCode = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d+$/, "Verification code is a 6 digit number")
      .length(6, "Password verification is 6 characters long")
      .required("Verification code required."),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  })

  const formikResetCode = useFormik<{ token: string; email: string }>({
    initialValues: {
      token: "",
      email: requestedEmail || "",
    },
    validationSchema: validationSchemaResetCode,
    onSubmit: ({ token, email }) => {
      dispatch(accountActions.validateResetToken({ resetToken: token, email }))
      setResetToken(token)
      setUserEmail(email)
    },
  })

  return { resettingPassword, passwordReset, tokenStatus, formik, formikResetCode }
}
export default useResetPasswordController
