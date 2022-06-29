import { projectConstants } from '../constants';

function projects(state: ProjectState = {}, action: ProjectAction) {
  switch (action.type) {
    case projectConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case projectConstants.GET_SUCCESS:
      return {
        loaded: true,
        data: action.projectsData,
      };
    case projectConstants.GET_FAILURE:
      return {
        error: action.error,
      };
    case projectConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case projectConstants.DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: state.data.filter((p: ProjectState) => p.id !== action.projectId),
      };
    case projectConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    case projectConstants.CREATE_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case projectConstants.CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        data: state.data.concat(action.data),
      };
    case projectConstants.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default projects;
