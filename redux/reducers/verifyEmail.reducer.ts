import { accountConstants } from "../constants"

interface State {
  error?: string
  emailVerified?: "Verifying" | "Verified" | "Failed"
}

function verifyEmail(state: State = {}, action: { type: string; error?: string; email?: string }): State {
  switch (action.type) {
    case accountConstants.VERIFY_EMAIL_REQUEST:
      return {
        emailVerified: "Verifying",
      }
    case accountConstants.VERIFY_EMAIL_SUCCESS:
      return {
        emailVerified: "Verified",
      }
    case accountConstants.VERIFY_EMAIL_FAILURE:
      return {
        error: action.error,
        emailVerified: "Failed",
      }
    case accountConstants.VERIFY_EMAIL_RESET:
      return {}
    default:
      return state
  }
}
export default verifyEmail
