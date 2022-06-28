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
        deleting: true,
      };
    case projectConstants.DELETE_SUCCESS:
      return {
        data: state.projects.map((p: ProjectState) => (p.id === action.id ? null : p)),
      };
    case projectConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default projects;
