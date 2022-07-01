import { accountConstants } from '../constants';

function account(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.GETDETAILS_REQUEST:
      return {
        loading: true,
      };
    case accountConstants.GETDETAILS_SUCCESS:
      return {
        user: action.userData,
        loaded: true,
      };
    case accountConstants.GETDETAILS_FAILURE:
      return {
        loaded: false,
        error: action.error,
      };
    case accountConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
        user: {
          ...state.user,
          username: action.userData.username,
          email: action.userData.email,
          first_name: action.userData.first_name,
          last_name: action.userData.last_name,
          address: action.userData.address,
          city: action.userData.city,
          country: action.userData.country,
          postcode: action.userData.postcode,
          description: action.userData.description,
        },
        error: undefined,
      };
    case accountConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        user: action.userData,
        error: undefined,
      };
    case accountConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default account;
