import { accountConstants } from '../constants';

function resetPassword(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.RESET_PASSWORD_REQUEST:
      return {
        resettingPassword: true,
      };
    case accountConstants.RESET_PASSWORD_SUCCESS:
      return {
        passwordReset: true,
      };
    case accountConstants.RESET_PASSWORD_FAILURE:
      return {
        error: action.error,
      };
    case accountConstants.RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
}
export default resetPassword;
