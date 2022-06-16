import { accountConstants } from '../constants';

function validateResetToken(state: ValidateResetTokenState = {}, action: ValidateResetTokenAction) {
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
    default:
      return state;
  }
}
export default validateResetToken;
