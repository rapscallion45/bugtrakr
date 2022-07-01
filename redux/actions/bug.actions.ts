import { bugConstants } from '../constants';
import { bugService } from '../services';
import { IBugPayload } from '../types/types';
import alertActions from './alert.actions';

function getBugs(projectId: string) {
  function request() {
    return { type: bugConstants.GET_REQUEST };
  }
  function success(bugsData: any) {
    return { type: bugConstants.GET_SUCCESS, bugsData };
  }
  function failure(error: string) {
    return { type: bugConstants.GET_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    bugService.getBug(projectId).then(
      (bugs) => dispatch(success(bugs)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function deleteBug(projectId: string | string[], id: string, closeDialog: () => void) {
  function request(bugId: string) {
    return { type: bugConstants.DELETE_REQUEST, bugId };
  }
  function success(bugId: string) {
    return { type: bugConstants.DELETE_SUCCESS, bugId };
  }
  function failure(bugId: string, error: string) {
    return { type: bugConstants.DELETE_FAILURE, bugId, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    bugService.deleteBug(projectId, id).then(
      () => {
        dispatch(success(id));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Bug deleted successfully.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function createBug(projectId: string | string[], payload: IBugPayload, closeDialog: () => void) {
  function request() {
    return { type: bugConstants.CREATE_REQUEST };
  }
  function success(data: any) {
    return { type: bugConstants.CREATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: bugConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    bugService.createBug(projectId, payload).then(
      (data) => {
        dispatch(success(data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug "${data.title}" created successfully.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function updateBug(
  projectId: string | string[],
  id: string,
  payload: IBugPayload,
  closeDialog: () => void
) {
  function request() {
    return { type: bugConstants.UPDATE_REQUEST };
  }
  function success(data: any) {
    return { type: bugConstants.UPDATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: bugConstants.UPDATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    bugService.updateBug(projectId, id, payload).then(
      (data) => {
        dispatch(success(data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug updated.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function updateBugNotes(projectId: string, id: string, members: string[], closeDialog: () => void) {
  function request() {
    return { type: bugConstants.UPDATENOTES_REQUEST };
  }
  function success(bugId: string, data: any) {
    return { type: bugConstants.UPDATENOTES_SUCCESS, bugId, data };
  }
  function failure(error: string) {
    return { type: bugConstants.UPDATENOTES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    bugService.updateBugNotes(projectId, id, members).then(
      (data) => {
        dispatch(success(id, data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Bug members updated.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

const bugActions = {
  getBugs,
  createBug,
  deleteBug,
  updateBug,
  updateBugNotes,
};
export default bugActions;
