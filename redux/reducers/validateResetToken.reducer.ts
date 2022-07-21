import { accountConstants } from '../constants';

function validateResetToken(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.VALIDATE_RESET_TOKEN_REQUEST:
      return {
        tokenValid: 'Validating',
      };
    case accountConstants.VALIDATE_RESET_TOKEN_SUCCESS:
      return {
        tokenValid: 'Valid',
      };
    case accountConstants.VALIDATE_RESET_TOKEN_FAILURE:
      return {
        error: action.error,
        tokenValid: 'Invalid',
      };
    case accountConstants.VALIDATE_RESET_TOKEN_RESET:
      return {
        tokenValid: '',
      };
    default:
      return state;
  }
}
export default validateResetToken;
