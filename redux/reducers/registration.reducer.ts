import { accountConstants } from "../constants"

interface State {
  error?: string
  registering?: boolean
  registered?: boolean
  email?: string
}

function registration(state: State = {}, action: { type: string; error?: string; email?: string }): State {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return {
        registering: true,
      }
    case accountConstants.REGISTER_SUCCESS:
      return {
        registered: true,
        email: action.email,
      }
    case accountConstants.REGISTER_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}
export default registration
