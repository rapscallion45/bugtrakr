import { noteConstants } from '../constants';
import { INote } from '../types/types';

function notes(state: any = {}, action: any) {
  switch (action.type) {
    case noteConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case noteConstants.DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: state.data.filter((n: INote) => n.id !== action.noteId),
      };
    case noteConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    case noteConstants.CREATE_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case noteConstants.CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        data: state.data.concat(action.data),
      };
    case noteConstants.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error,
      };
    case noteConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case noteConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((n: INote) => {
          if (n.id === action.data.id) {
            return {
              ...n,
              body: action.data.body ? action.data.body : n.body,
              updatedAt: action.data.updatedAt,
            };
          }
          return n;
        }),
      };
    case noteConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export default notes;
