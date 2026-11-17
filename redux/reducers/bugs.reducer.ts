import { bugConstants, noteConstants } from "../constants"
import { IBugState, INote } from "../types/types"

// Keep a stable empty selection while the next route starts its request.
const emptyList = Object.freeze({ data: [], loaded: false, loading: true, error: undefined })
export interface BugsState {
  scope?: string
  requestId?: number
  data?: IBugState[]
  loading?: boolean
  loaded?: boolean
  error?: string
  creating?: boolean
  updating?: boolean
  deleting?: boolean
  closing?: boolean
  reopening?: boolean
}
type NoteType = (typeof noteConstants)[keyof typeof noteConstants]
type BugType = (typeof bugConstants)[keyof typeof bugConstants]
type ListsOfNotes = typeof bugConstants.UPDATENOTES_SUCCESS
type UpdatedBug = typeof bugConstants.CLOSE_SUCCESS | typeof bugConstants.REOPEN_SUCCESS
type BugAction = { bugID?: string; bugId?: string; noteId?: number; error?: string; scope?: string; requestId?: number; bugsData?: IBugState[] } & (
  | { type: NoteType; data?: INote }
  | { type: ListsOfNotes; data: INote[] }
  | { type: UpdatedBug; data: Partial<IBugState> }
  | { type: Exclude<BugType, ListsOfNotes | UpdatedBug>; data?: IBugState }
)

export function selectBugList(state: { bugs: BugsState }, scope: string): BugsState {
  return state.bugs.scope === scope ? state.bugs : emptyList
}

function bugs(state: BugsState = {}, action: BugAction): BugsState {
  switch (action.type) {
    case bugConstants.GET_REQUEST:
      return {
        scope: action.scope,
        requestId: action.requestId,
        data: [],
        loading: true,
      }
    case bugConstants.GET_SUCCESS:
      if (action.requestId !== state.requestId) return state
      return {
        scope: action.scope,
        loaded: true,
        data: action.bugsData,
      }
    case bugConstants.GET_FAILURE:
      if (action.requestId !== state.requestId) return state
      return {
        scope: action.scope,
        error: action.error,
      }
    case bugConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      }
    case bugConstants.DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: state.data.filter((b: IBugState) => b.id !== action.bugId),
      }
    case bugConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      }
    case bugConstants.CREATE_REQUEST:
      return {
        ...state,
        creating: true,
      }
    case bugConstants.CREATE_SUCCESS:
      if (state.scope !== `project:${action.data.projectId}`) return state
      return {
        ...state,
        creating: false,
        data: state.data.concat(action.data),
      }
    case bugConstants.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error,
      }
    case bugConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
      }
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
            }
          }
          return b
        }),
      }
    case bugConstants.UPDATENOTES_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              notes: action.data,
            }
          }
          return b
        }),
      }
    case bugConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      }
    case bugConstants.CLOSE_REQUEST:
      return {
        ...state,
        closing: true,
      }
    case bugConstants.CLOSE_SUCCESS:
      return {
        ...state,
        closing: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              ...action.data,
              isResolved: true,
            }
          }
          return b
        }),
      }
    case bugConstants.CLOSE_FAILURE:
      return {
        ...state,
        closing: false,
        error: action.error,
      }
    case bugConstants.REOPEN_REQUEST:
      return {
        ...state,
        reopening: true,
      }
    case bugConstants.REOPEN_SUCCESS:
      return {
        ...state,
        reopening: false,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugId) {
            return {
              ...b,
              ...action.data,
              isResolved: false,
            }
          }
          return b
        }),
      }
    case bugConstants.REOPEN_FAILURE:
      return {
        ...state,
        reopening: false,
        error: action.error,
      }
    case noteConstants.DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              deletingNote: true,
            }
          }
          return b
        }),
      }
    case noteConstants.DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              notes: b.notes.filter((n) => n.id !== action.noteId),
              deletingNote: false,
            }
          }
          return b
        }),
      }
    case noteConstants.DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              deletingNote: false,
              error: action.error,
            }
          }
          return b
        }),
      }
    case noteConstants.CREATE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              creatingNote: true,
            }
          }
          return b
        }),
      }
    case noteConstants.CREATE_SUCCESS:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              notes: b.notes.concat(action.data),
              creatingNote: false,
            }
          }
          return b
        }),
      }
    case noteConstants.CREATE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              creatingNote: false,
              error: action.error,
            }
          }
          return b
        }),
      }
    case noteConstants.UPDATE_REQUEST:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              updatingNote: true,
            }
          }
          return b
        }),
      }
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
                  }
                }
                return n
              }),
              updatingNote: false,
            }
          }
          return b
        }),
      }
    case noteConstants.UPDATE_FAILURE:
      return {
        ...state,
        data: state.data.map((b: IBugState) => {
          if (b.id === action.bugID) {
            return {
              ...b,
              updatingNote: false,
              error: action.error,
            }
          }
          return b
        }),
      }
    default:
      return state
  }
}
export default bugs
