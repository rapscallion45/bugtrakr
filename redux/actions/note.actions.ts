import { noteConstants } from '../constants';
import { noteService } from '../services';
import alertActions from './alert.actions';

function deleteNote(projectId: string | string[], id: number, closeDialog: () => void) {
  function request(noteId: number) {
    return { type: noteConstants.DELETE_REQUEST, noteId };
  }
  function success(noteId: number) {
    return { type: noteConstants.DELETE_SUCCESS, noteId };
  }
  function failure(error: string) {
    return { type: noteConstants.DELETE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    noteService.deleteNote(projectId, id).then(
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

function createNote(
  projectId: string | string[],
  noteId: string | string[],
  payload: string,
  closeDialog: () => void
) {
  function request() {
    return { type: noteConstants.CREATE_REQUEST };
  }
  function success(data: any) {
    return { type: noteConstants.CREATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: noteConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    noteService.createNote(projectId, noteId, payload).then(
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

function updateNote(
  projectId: string | string[],
  id: number,
  payload: string,
  closeDialog: () => void
) {
  function request() {
    return { type: noteConstants.UPDATE_REQUEST };
  }
  function success(data: any) {
    return { type: noteConstants.UPDATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: noteConstants.UPDATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    noteService.updateNote(projectId, id, payload).then(
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

const noteActions = {
  createNote,
  deleteNote,
  updateNote,
};
export default noteActions;
