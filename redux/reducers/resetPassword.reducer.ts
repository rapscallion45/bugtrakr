import { accountConstants } from '../constants';

function resetPassword(state: ResetPasswordState = {}, action: ResetPasswordAction) {
  switch (action.type) {
    case accountConstants.RESET_PASSWORD_REQUEST:
      return {
        resettingPassword: true,
      };
    case accountConstants.RESET_PASSWORD_SUCCESS:
      return {};
    case accountConstants.RESET_PASSWORD_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default resetPassword;
