import { accountConstants } from "../constants"

interface State {
  error?: string
  tokenValid?: "" | "Validating" | "Valid" | "Invalid"
}

function validateResetToken(state: State = {}, action: { type: string; error?: string; email?: string }): State {
  switch (action.type) {
    case accountConstants.VALIDATE_RESET_TOKEN_REQUEST:
      return {
        tokenValid: "Validating",
      }
    case accountConstants.VALIDATE_RESET_TOKEN_SUCCESS:
      return {
        tokenValid: "Valid",
      }
    case accountConstants.VALIDATE_RESET_TOKEN_FAILURE:
      return {
        error: action.error,
        tokenValid: "Invalid",
      }
    case accountConstants.VALIDATE_RESET_TOKEN_RESET:
      return {
        tokenValid: "",
      }
    default:
      return state
  }
}
export default validateResetToken
