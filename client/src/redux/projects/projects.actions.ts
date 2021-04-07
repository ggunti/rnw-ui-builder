import axios from 'axios';
import fileDownload from 'js-file-download';
import { createAction } from 'redux-actions';
import { getErrMsg } from '../../utils/err';
import { ProjectsState } from './projects.types';
import { AppThunk } from '../store';
import { ProjectType } from '../../types';

export const PROJECTS = {
  SET: 'set_projects',
  // getProjects
  START_LOADING_GET_PROJECTS: 'start_loading_get_projects',
  FINISH_LOADING_GET_PROJECTS: 'finish_loading_get_projects',
  SET_GET_PROJECTS_ERROR: 'set_get_projects_error',
  HIDE_GET_PROJECTS_ERROR: 'hide_get_projects_error',
  // createProject
  START_LOADING_CREATE_PROJECT: 'start_loading_create_project',
  FINISH_LOADING_CREATE_PROJECT: 'finish_loading_create_project',
  SET_CREATE_PROJECT_ERROR: 'set_create_project_error',
  HIDE_CREATE_PROJECT_ERROR: 'hide_create_project_error',
  // generateProjectCode
  START_LOADING_GENERATE_PROJECT_CODE: 'start_loading_generate_project_code',
  FINISH_LOADING_GENERATE_PROJECT_CODE: 'finish_loading_generate_project_code',
  SET_GENERATE_PROJECT_CODE_ERROR: 'set_generate_project_code_error',
  HIDE_GENERATE_PROJECT_CODE_ERROR: 'hide_generate_project_code_error',
};

export const setProjects = createAction<Partial<ProjectsState>>(PROJECTS.SET);

// getProjects - function
export const startLoadingGetProjects = createAction(PROJECTS.START_LOADING_GET_PROJECTS);
export const finishLoadingGetProjects = createAction(PROJECTS.FINISH_LOADING_GET_PROJECTS);
export const setGetProjectsError = createAction(PROJECTS.SET_GET_PROJECTS_ERROR);
export const hideGetProjectsError = createAction(PROJECTS.HIDE_GET_PROJECTS_ERROR);

export function getProjects(
  onSuccess: (projects: ProjectType[]) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingGetProjects());
    return axios
      .get('/projects')
      .then((res) => res.data)
      .then(({ projects }) => {
        dispatch(finishLoadingGetProjects());
        onSuccess(projects);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGetProjects());
        dispatch(setGetProjectsError(errMsg));
        onError(errMsg);
      });
  };
}

// createProject - function
export const startLoadingCreateProject = createAction(PROJECTS.START_LOADING_CREATE_PROJECT);
export const finishLoadingCreateProject = createAction(PROJECTS.FINISH_LOADING_CREATE_PROJECT);
export const setCreateProjectError = createAction(PROJECTS.SET_CREATE_PROJECT_ERROR);
export const hideCreateProjectError = createAction(PROJECTS.HIDE_CREATE_PROJECT_ERROR);

export function createProject(
  { name }: { name: string },
  onSuccess: (project: ProjectType) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingCreateProject());
    return axios
      .post('/projects/create', { name })
      .then((res) => res.data)
      .then(({ project }) => {
        dispatch(finishLoadingCreateProject());
        onSuccess(project);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingCreateProject());
        dispatch(setCreateProjectError(errMsg));
        onError(errMsg);
      });
  };
}

// generateProjectCode - function
export const startLoadingGenerateProjectCode = createAction(PROJECTS.START_LOADING_GENERATE_PROJECT_CODE);
export const finishLoadingGenerateProjectCode = createAction(PROJECTS.FINISH_LOADING_GENERATE_PROJECT_CODE);
export const setGenerateProjectCodeError = createAction(PROJECTS.SET_GENERATE_PROJECT_CODE_ERROR);
export const hideGenerateProjectCodeError = createAction(PROJECTS.HIDE_GENERATE_PROJECT_CODE_ERROR);

export function generateProjectCode(
  {
    project,
    components,
  }: {
    project: { id: number; pages: { id: number; name: string; content: string }[] };
    components: { name: string; content: string }[];
  },
  onSuccess: () => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingGenerateProjectCode());
    return axios
      .post('/projects/generateCode', { project, components }, { responseType: 'blob' })
      .then((res) => {
        dispatch(finishLoadingGenerateProjectCode());
        fileDownload(res.data, `Proj${project.id}.zip`);
        onSuccess();
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGenerateProjectCode());
        dispatch(setGenerateProjectCodeError(errMsg));
        onError(errMsg);
      });
  };
}
