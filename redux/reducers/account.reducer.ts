import { accountConstants } from "../constants"

import type { IAccountState, IAccount } from "../types/types"

function account(state: IAccountState = {}, action: { type: string; userData?: IAccount; error?: string }): IAccountState {
  switch (action.type) {
    case accountConstants.GETDETAILS_REQUEST:
      return {
        loading: true,
      }
    case accountConstants.GETDETAILS_SUCCESS:
      return {
        user: action.userData,
        loaded: true,
      }
    case accountConstants.GETDETAILS_FAILURE:
      return {
        loaded: false,
        error: action.error,
      }
    case accountConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
        user: {
          ...state.user,
          ...action.userData,
        },
        error: undefined,
      }
    case accountConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        user: action.userData,
        error: undefined,
      }
    case accountConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error,
      }
    default:
      return state
  }
}
export default account
