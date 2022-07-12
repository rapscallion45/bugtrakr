import { bugConstants, noteConstants } from '../constants';
import { IBugState, INote } from '../types/types';

function bugs(state: any = {}, action: any) {
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
        data: state.data.filter((b: IBugState) => b.id !== action.bugId),
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
      return {
        ...state,
        updating: true,
      };
    case bugConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.data.id) {
            return {
              ...b,
              title: action.data.title ? action.data.title : b.title,
              description: action.data.description ? action.data.description : b.description,
              priority: action.data.priority ? action.data.priority : b.priority,
              updatedAt: action.data.updatedAt,
              updatedBy: action.data.updatedBy,
            };
          }
          return b;
        }),
      };
    case bugConstants.UPDATENOTES_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              notes: action.data,
            };
          }
          return b;
        }),
      };
    case bugConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      };
    case bugConstants.CLOSE_REQUEST:
      return {
        ...state,
        closing: true,
      };
    case bugConstants.CLOSE_SUCCESS:
      return {
        ...state,
        closing: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              isResolved: true,
            };
          }
          return b;
        }),
      };
    case bugConstants.CLOSE_FAILURE:
      return {
        ...state,
        closing: false,
        error: action.error,
      };
    case bugConstants.REOPEN_REQUEST:
      return {
        ...state,
        reopening: true,
      };
    case bugConstants.REOPEN_SUCCESS:
      return {
        ...state,
        reopening: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              isResolved: false,
            };
          }
          return b;
        }),
      };
    case bugConstants.REOPEN_FAILURE:
      return {
        ...state,
        reopening: false,
        error: action.error,
      };
    case noteConstants.DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              deletingNote: true,
            };
          }
          return b;
        }),
      };
    case noteConstants.DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              notes: b.notes.filter((n) => n.id !== action.noteId),
              deletingNote: false,
            };
          }
          return b;
        }),
      };
    case noteConstants.DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              deletingNote: false,
              error: action.error,
            };
          }
          return b;
        }),
      };
    case noteConstants.CREATE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              creatingNote: true,
            };
          }
          return b;
        }),
      };
    case noteConstants.CREATE_SUCCESS:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              notes: b.notes.concat(action.data),
              creatingNote: false,
            };
          }
          return b;
        }),
      };
    case noteConstants.CREATE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              creatingNote: false,
              error: action.error,
            };
          }
          return b;
        }),
      };
    case noteConstants.UPDATE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              updatingNote: true,
            };
          }
          return b;
        }),
      };
    case noteConstants.UPDATE_SUCCESS:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              notes: b.notes.map((n: INote) => {
                if (n.id === action.data.id) {
                  return {
                    ...n,
                    body: action.data.body,
                    updatedAt: action.data.updatedAt,
                  };
                }
                return n;
              }),
              updatingNote: false,
            };
          }
          return b;
        }),
      };
    case noteConstants.UPDATE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              updatingNote: false,
              error: action.error,
            };
          }
          return b;
        }),
      };
    default:
      return state;
  }
}
export default bugs;
