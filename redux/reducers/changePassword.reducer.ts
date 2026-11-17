import { accountConstants } from "../constants"

interface State {
  error?: string
  requestingPassword?: boolean
  requestSuccess?: boolean
  email?: string
}

function changePassword(state: State = {}, action: { type: string; error?: string; email?: string }): State {
  switch (action.type) {
    case accountConstants.CHANGE_PASSWORD_REQUEST:
      return {
        requestingPassword: true,
      }
    case accountConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        requestSuccess: true,
        email: action.email,
      }
    case accountConstants.CHANGE_PASSWORD_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}
export default changePassword
