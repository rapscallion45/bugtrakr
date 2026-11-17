import { accountConstants } from "../constants"

interface State {
  error?: string
  resettingPassword?: boolean
  passwordReset?: boolean
}

function resetPassword(state: State = {}, action: { type: string; error?: string; email?: string }): State {
  switch (action.type) {
    case accountConstants.RESET_PASSWORD_REQUEST:
      return {
        resettingPassword: true,
      }
    case accountConstants.RESET_PASSWORD_SUCCESS:
      return {
        passwordReset: true,
      }
    case accountConstants.RESET_PASSWORD_FAILURE:
      return {
        error: action.error,
      }
    case accountConstants.RESET_PASSWORD_RESET:
      return {}
    default:
      return state
  }
}
export default resetPassword
