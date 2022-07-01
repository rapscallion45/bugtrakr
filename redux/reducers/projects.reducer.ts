import { projectConstants } from '../constants';
import { IProjectState, IProjectMember } from '../types/types';

function projects(state: any = {}, action: any) {
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
        data: state.data.filter((p: IProjectState) => p.id !== action.projectId),
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
    case projectConstants.UPDATE_REQUEST:
    case projectConstants.UPDATEMEMBERS_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case projectConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((p: IProjectState) => {
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
    case projectConstants.UPDATEMEMBERS_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((p: IProjectState) => {
          if (p.id === action.projectId) {
            return {
              ...p,
              members: action.data,
            };
          }
          return p;
        }),
      };
    case projectConstants.UPDATE_FAILURE:
    case projectConstants.UPDATEMEMBERS_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      };
    case projectConstants.REMOVEMEMBER_REQUEST:
      return {
        ...state,
        removing: true,
      };
    case projectConstants.REMOVEMEMBER_SUCCESS:
      return {
        ...state,
        removing: false,
        data: state.data.map((p: IProjectState) => {
          if (p.id === action.projectId) {
            return {
              ...p,
              members: p.members?.filter(
                (m: IProjectMember) => m.member.id !== action.projectMemberId
              ),
            };
          }
          return p;
        }),
      };
    case projectConstants.REMOVEMEMBER_FAILURE:
      return {
        ...state,
        removing: false,
        error: action.error,
      };
    case projectConstants.LEAVE_REQUEST:
      return {
        ...state,
        leaving: true,
      };
    case projectConstants.LEAVE_SUCCESS:
      return {
        ...state,
        leaving: false,
      };
    case projectConstants.LEAVE_FAILURE:
      return {
        ...state,
        leaving: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default projects;
