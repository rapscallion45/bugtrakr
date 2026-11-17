import { useDispatch } from "react-redux"
import type { ThunkDispatch } from "redux-thunk"
import type { UnknownAction } from "redux"
import type { AppState } from "../redux/reducers"

export default useDispatch.withTypes<ThunkDispatch<AppState, undefined, UnknownAction>>()
