import { accountConstants } from '../constants';

const ISSERVER = typeof window === 'undefined';

function authentication(state: any = { authenticating: true }, action: any) {
  switch (action.type) {
    case accountConstants.AUTHENTICATE_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case accountConstants.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticating: false,
        loggedIn: true,
        user: action.userData,
        demo: !ISSERVER && Boolean(localStorage.getItem('demoMode')),
      };
    case accountConstants.LOGIN_REQUEST:
    case accountConstants.LOGIN_GOOGLE_REQUEST:
    case accountConstants.LOGIN_FACEBOOK_REQUEST:
      return {
        loggingIn: true,
        user: action.userData,
      };
    case accountConstants.DEMO_LOGIN_REQUEST:
      return {
        loggingIn: true,
        demo: true,
        user: action.userData,
      };
    case accountConstants.LOGIN_SUCCESS:
    case accountConstants.LOGIN_GOOGLE_SUCCESS:
    case accountConstants.LOGIN_FACEBOOK_SUCCESS:
      return {
        loggedIn: true,
        user: action.userData,
      };
    case accountConstants.DEMO_LOGIN_SUCCESS:
      if (!ISSERVER) localStorage.setItem('demoMode', 'yes');
      return {
        loggedIn: true,
        demo: true,
        user: action.userData,
      };
    case accountConstants.AUTHENTICATE_FAILURE:
    case accountConstants.LOGIN_FAILURE:
    case accountConstants.DEMO_LOGIN_FAILURE:
    case accountConstants.LOGIN_GOOGLE_FAILURE:
    case accountConstants.LOGIN_FACEBOOK_FAILURE:
    case accountConstants.LOGOUT:
      if (!ISSERVER) localStorage.removeItem('demoMode');
      return {};
    default:
      return state;
  }
}
export default authentication;
