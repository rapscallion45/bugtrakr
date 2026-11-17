import type { SnackbarKey } from "notistack"
import { FC, forwardRef, ReactNode } from "react"
import { useSelector } from "react-redux"
import { SnackbarProvider } from "notistack"
import MuiAlert from "@mui/material/Alert"
import useAppDispatch from "../../hooks/useAppDispatch"
import { alertActions } from "../../redux/actions"
import { AppState } from "../../redux/reducers"

interface AlertProps {
  children?: ReactNode
  id?: SnackbarKey
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const dispatch = useAppDispatch()
  const { id, children, ...other } = props

  /* close alert callback */
  const handleClose = () => {
    dispatch(alertActions.closeSnackbar(id))
  }

  /* find this alert in state and get variant */
  const { notifications } = useSelector((state: AppState) => state.alert)
  const variant = notifications.find((notification) => notification.key === id)?.options?.variant

  return (
    <MuiAlert ref={ref} elevation={6} variant={"filled"} severity={variant} onClose={handleClose} {...other}>
      {children}
    </MuiAlert>
  )
})

export interface AlertProviderProps {
  children?: React.ReactNode
}

const AlertProvider: FC<AlertProviderProps> = function AlertProvider({ children = null }) {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      content={(key, message) => <Alert id={key}>{message}</Alert>}>
      {children}
    </SnackbarProvider>
  )
}

export default AlertProvider
