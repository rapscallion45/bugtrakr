import { accountConstants } from '../constants';

function forgotPassword(state: ForgotPasswordState = {}, action: ForgotPasswordAction) {
  switch (action.type) {
    case accountConstants.FORGOT_PASSWORD_REQUEST:
      return {
        requestingPassword: true,
      };
    case accountConstants.FORGOT_PASSWORD_SUCCESS:
      return {};
    case accountConstants.FORGOT_PASSWORD_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default forgotPassword;
