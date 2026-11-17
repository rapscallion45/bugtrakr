import type { INote } from "../types/types"
import router from "next/router"
import { bugConstants } from "../constants"
import { bugService } from "../services"
import { IBugPayload, IBugState } from "../types/types"
import alertActions from "./alert.actions"

let nextRequestId = 0

function loadBugs(scope: string, fetchBugs: () => Promise<IBugState[]>) {
  return async (dispatch) => {
    nextRequestId += 1
    const requestId = nextRequestId
    dispatch({ type: bugConstants.GET_REQUEST, scope, requestId })
    try {
      const bugsData = await fetchBugs()
      dispatch({ type: bugConstants.GET_SUCCESS, scope, requestId, bugsData })
    } catch (error) {
      dispatch({ type: bugConstants.GET_FAILURE, scope, requestId, error: String(error) })
    }
  }
}

function getBugs(projectId: string | string[]) {
  return loadBugs(`project:${projectId}`, () => bugService.getBug(projectId))
}

function getBugsByUser(userId: string) {
  return loadBugs(`user:${userId}`, () => bugService.getBugByUser(userId))
}

function deleteBug(projectId: string | string[], id: string, closeDialog: () => void) {
  function request(bugId: string) {
    return { type: bugConstants.DELETE_REQUEST, bugId }
  }
  function success(bugId: string) {
    return { type: bugConstants.DELETE_SUCCESS, bugId }
  }
  function failure(bugId: string, error: string) {
    return { type: bugConstants.DELETE_FAILURE, bugId, error }
  }

  return (dispatch) => {
    dispatch(request(id))

    bugService.deleteBug(projectId, id).then(
      () => {
        dispatch(success(id))
        if (closeDialog) closeDialog()
        router.push(`/dashboard/projects/${projectId}`)
        dispatch(
          alertActions.enqueueSnackbar({
            message: "Bug deleted successfully.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(id, error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

function createBug(projectId: string | string[], payload: IBugPayload, closeDialog: () => void) {
  function request() {
    return { type: bugConstants.CREATE_REQUEST }
  }
  function success(data: IBugState) {
    return { type: bugConstants.CREATE_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: bugConstants.CREATE_FAILURE, error }
  }

  return (dispatch) => {
    dispatch(request())

    bugService.createBug(projectId, payload).then(
      (data) => {
        dispatch(success(data))
        if (closeDialog) closeDialog()
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug "${data.title}" created successfully.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

function updateBug(projectId: string | string[], id: string, payload: IBugPayload, closeDialog: () => void) {
  function request() {
    return { type: bugConstants.UPDATE_REQUEST }
  }
  function success(data: IBugState) {
    return { type: bugConstants.UPDATE_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: bugConstants.UPDATE_FAILURE, error }
  }

  return (dispatch) => {
    dispatch(request())

    bugService.updateBug(projectId, id, payload).then(
      (data) => {
        dispatch(success(data))
        if (closeDialog) closeDialog()
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug updated.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

function updateBugNotes(projectId: string, id: string, members: string[], closeDialog: () => void) {
  function request() {
    return { type: bugConstants.UPDATENOTES_REQUEST }
  }
  function success(bugId: string, data: INote[]) {
    return { type: bugConstants.UPDATENOTES_SUCCESS, bugId, data }
  }
  function failure(error: string) {
    return { type: bugConstants.UPDATENOTES_FAILURE, error }
  }

  return (dispatch) => {
    dispatch(request())

    bugService.updateBugNotes(projectId, id, members).then(
      (data) => {
        dispatch(success(id, data))
        if (closeDialog) closeDialog()
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug members updated.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

function closeBug(projectId: string | string[], id: string | string[], closeDialog: () => void) {
  function request(bugId: string | string[]) {
    return { type: bugConstants.CLOSE_REQUEST, bugId }
  }
  function success(bugId: string | string[], data: IBugState) {
    return { type: bugConstants.CLOSE_SUCCESS, bugId, data }
  }
  function failure(bugId: string | string[], error: string) {
    return { type: bugConstants.CLOSE_FAILURE, bugId, error }
  }

  return (dispatch) => {
    dispatch(request(id))

    bugService.closeBug(projectId, id).then(
      (data) => {
        dispatch(success(id, data))
        if (closeDialog) closeDialog()
        dispatch(
          alertActions.enqueueSnackbar({
            message: "Bug closed.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(id, error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

function reopenBug(projectId: string | string[], id: string | string[], closeDialog: () => void) {
  function request(bugId: string | string[]) {
    return { type: bugConstants.REOPEN_REQUEST, bugId }
  }
  function success(bugId: string | string[], data: IBugState) {
    return { type: bugConstants.REOPEN_SUCCESS, bugId, data }
  }
  function failure(bugId: string | string[], error: string) {
    return { type: bugConstants.REOPEN_FAILURE, bugId, error }
  }

  return (dispatch) => {
    dispatch(request(id))

    bugService.reopenBug(projectId, id).then(
      (data) => {
        dispatch(success(id, data))
        if (closeDialog) closeDialog()
        dispatch(
          alertActions.enqueueSnackbar({
            message: "Bug reopened.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          }),
        )
      },
      (error) => {
        dispatch(failure(id, error.toString()))
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }),
        )
      },
    )
  }
}

const bugActions = {
  getBugs,
  getBugsByUser,
  createBug,
  deleteBug,
  updateBug,
  updateBugNotes,
  closeBug,
  reopenBug,
}
export default bugActions
