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

function deleteProject(id: string) {
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
      () => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };
}

function createProject(projectData: any) {
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

    projectService.createProject(projectData).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function updateProject(id: string, newName: string) {
  function request(name: string) {
    return { type: projectConstants.UPDATE_REQUEST, name };
  }
  function success(name: string) {
    return { type: projectConstants.UPDATE_SUCCESS, name };
  }
  function failure(name: string, error: string) {
    return { type: projectConstants.UPDATE_FAILURE, name, error };
  }

  return (dispatch) => {
    dispatch(request(newName));

    projectService.updateProject(id, newName).then(
      (userData) => {
        dispatch(success(userData));
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Project updated successfully.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(newName, error.toString()));
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