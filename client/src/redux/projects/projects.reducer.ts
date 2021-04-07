import { PROJECTS } from './projects.actions';
import { ProjectsState } from './projects.types';

const INITIAL_STATE: ProjectsState = {
  projects: [],
  // getProjects
  loadingGetProjects: false,
  hasErrorGetProjects: false,
  errorMessageGetProjects: '',
  // createProject
  loadingCreateProject: false,
  hasErrorCreateProject: false,
  errorMessageCreateProject: '',
  // generateProjectCode
  loadingGenerateProjectCode: false,
  hasErrorGenerateProjectCode: false,
  errorMessageGenerateProjectCode: '',
};

export default (state = INITIAL_STATE, action: any): ProjectsState => {
  switch (action.type) {
    case PROJECTS.SET:
      return { ...state, ...action.payload };
    // getProjects
    case PROJECTS.START_LOADING_GET_PROJECTS:
      return { ...state, loadingGetProjects: true };
    case PROJECTS.FINISH_LOADING_GET_PROJECTS:
      return { ...state, loadingGetProjects: false };
    case PROJECTS.SET_GET_PROJECTS_ERROR:
      return { ...state, hasErrorGetProjects: true, errorMessageGetProjects: action.payload };
    case PROJECTS.HIDE_GET_PROJECTS_ERROR:
      return { ...state, hasErrorGetProjects: false, errorMessageGetProjects: '' };
    // createProject
    case PROJECTS.START_LOADING_CREATE_PROJECT:
      return { ...state, loadingCreateProject: true };
    case PROJECTS.FINISH_LOADING_CREATE_PROJECT:
      return { ...state, loadingCreateProject: false };
    case PROJECTS.SET_CREATE_PROJECT_ERROR:
      return { ...state, hasErrorCreateProject: true, errorMessageCreateProject: action.payload };
    case PROJECTS.HIDE_CREATE_PROJECT_ERROR:
      return { ...state, hasErrorCreateProject: false, errorMessageCreateProject: '' };
    // generateProjectCode
    case PROJECTS.START_LOADING_GENERATE_PROJECT_CODE:
      return { ...state, loadingGenerateProjectCode: true };
    case PROJECTS.FINISH_LOADING_GENERATE_PROJECT_CODE:
      return { ...state, loadingGenerateProjectCode: false };
    case PROJECTS.SET_GENERATE_PROJECT_CODE_ERROR:
      return { ...state, hasErrorGenerateProjectCode: true, errorMessageGenerateProjectCode: action.payload };
    case PROJECTS.HIDE_GENERATE_PROJECT_CODE_ERROR:
      return { ...state, hasErrorGenerateProjectCode: false, errorMessageGenerateProjectCode: '' };
    default:
      return state;
  }
};
