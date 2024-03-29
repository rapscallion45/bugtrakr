import { noteConstants } from '../constants';
import { noteService } from '../services';
import { INote } from '../types/types';
import alertActions from './alert.actions';

function deleteNote(
  projectId: string | string[],
  bugId: string | string[],
  id: number,
  closeDialog: () => void
) {
  function request(bugID: string | string[], noteId: number) {
    return { type: noteConstants.DELETE_REQUEST, bugID, noteId };
  }
  function success(bugID: string | string[], noteId: number) {
    return { type: noteConstants.DELETE_SUCCESS, bugID, noteId };
  }
  function failure(bugID: string | string[], error: string) {
    return { type: noteConstants.DELETE_FAILURE, bugID, error };
  }

  return (dispatch) => {
    dispatch(request(bugId, id));

    noteService.deleteNote(projectId, bugId, id).then(
      () => {
        dispatch(success(bugId, id));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Note deleted successfully.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(bugId, error.toString()));
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

function createNote(
  projectId: string | string[],
  bugId: string | string[],
  payload: string,
  closeDialog: () => void
) {
  function request(bugID: string | string[]) {
    return { type: noteConstants.CREATE_REQUEST, bugID };
  }
  function success(bugID: string | string[], data: INote) {
    return { type: noteConstants.CREATE_SUCCESS, bugID, data };
  }
  function failure(bugID: string | string[], error: string) {
    return { type: noteConstants.CREATE_FAILURE, bugID, error };
  }

  return (dispatch) => {
    dispatch(request(bugId));

    noteService.createNote(projectId, bugId, payload).then(
      (data) => {
        dispatch(success(bugId, data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Note created successfully.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(bugId, error.toString()));
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

function updateNote(
  projectId: string | string[],
  bugId: string | string[],
  id: number,
  payload: string,
  closeDialog: () => void
) {
  function request(bugID: string | string[]) {
    return { type: noteConstants.UPDATE_REQUEST, bugID };
  }
  function success(bugID: string | string[], data: INote) {
    return { type: noteConstants.UPDATE_SUCCESS, bugID, data };
  }
  function failure(bugID: string | string[], error: string) {
    return { type: noteConstants.UPDATE_FAILURE, bugID, error };
  }

  return (dispatch) => {
    dispatch(request(bugId));

    noteService.updateNote(projectId, bugId, id, payload).then(
      (data) => {
        dispatch(success(bugId, data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Note updated.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(bugId, error.toString()));
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

const noteActions = {
  createNote,
  deleteNote,
  updateNote,
};
export default noteActions;
