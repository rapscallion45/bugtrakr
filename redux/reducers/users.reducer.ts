import { usersConstants } from "../constants"

import type { IUser } from "../types/types"
interface DirectoryState {
  data?: IUser[]
  loaded?: boolean
  loading?: boolean
  error?: string
}

function projects(state: DirectoryState = {}, action: { type: string; error?: string; usersData?: IUser[] }): DirectoryState {
  switch (action.type) {
    case usersConstants.GET_REQUEST:
      return {
        loading: true,
      }
    case usersConstants.GET_SUCCESS:
      return {
        loaded: true,
        data: action.usersData,
      }
    case usersConstants.GET_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}
export default projects
