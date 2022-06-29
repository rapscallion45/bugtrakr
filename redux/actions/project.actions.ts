import { projectConstants } from '../constants';
import { projectService } from '../services';
import alertActions from './alert.actions';

function getProjects() {
  function request() {
    return { type: projectConstants.GET_REQUEST };
  }
  function success(projectsData: any) {
    return { type: projectConstants.GET_SUCCESS, projectsData };
  }
  function failure(error: string) {
    return { type: projectConstants.GET_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    projectService.getProject().then(
      (projects) => dispatch(success(projects)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function deleteProject(id: string, closeDialog: () => void) {
  function request(projectId: string) {
    return { type: projectConstants.DELETE_REQUEST, projectId };
  }
  function success(projectId: string) {
    return { type: projectConstants.DELETE_SUCCESS, projectId };
  }
  function failure(projectId: string, error: string) {
    return { type: projectConstants.DELETE_FAILURE, projectId, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    projectService.deleteProject(id).then(
      () => {
        dispatch(success(id));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Project deleted successfully.',
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

function createProject(name: string, members: string[], closeDialog: () => void) {
  function request() {
    return { type: projectConstants.CREATE_REQUEST };
  }
  function success(data: any) {
    return { type: projectConstants.CREATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: projectConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    projectService.createProject(name, members).then(
      (data) => {
        dispatch(success(data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Project "${data.name}" created successfully.`,
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

function updateProject(id: string, name: string, members: string[], closeDialog: () => void) {
  function request() {
    return { type: projectConstants.UPDATE_REQUEST };
  }
  function success(data: any) {
    return { type: projectConstants.UPDATE_SUCCESS, data };
  }
  function failure(error: string) {
    return { type: projectConstants.UPDATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    projectService.updateProject(id, name, members).then(
      (data) => {
        dispatch(success(data));
        if (closeDialog) closeDialog();
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Project renamed to "${name}".`,
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

const accountActions = {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
};
export default accountActions;
