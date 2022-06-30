import { bugConstants } from '../constants';

function bugs(state: BugState = {}, action: BugAction) {
  switch (action.type) {
    case bugConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case bugConstants.GET_SUCCESS:
      return {
        loaded: true,
        data: action.bugsData,
      };
    case bugConstants.GET_FAILURE:
      return {
        error: action.error,
      };
    case bugConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case bugConstants.DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: state.data.filter((p: BugState) => p.id !== action.bugId),
      };
    case bugConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    case bugConstants.CREATE_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case bugConstants.CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        data: state.data.concat(action.data),
      };
    case bugConstants.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error,
      };
    case bugConstants.UPDATE_REQUEST:
    case bugConstants.UPDATENOTES_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case bugConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((p) => {
          if (p.id === action.data.id) {
            return {
              ...p,
              name: action.data.name ? action.data.name : p.name,
              members: action.data.members ? action.data.members : p.members,
              updatedAt: action.data.updatedAt,
            };
          }
          return p;
        }),
      };
    case bugConstants.UPDATENOTES_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((p) => {
          if (p.id === action.bugId) {
            return {
              ...p,
              members: action.data,
            };
          }
          return p;
        }),
      };
    case bugConstants.UPDATE_FAILURE:
    case bugConstants.UPDATENOTES_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default bugs;
