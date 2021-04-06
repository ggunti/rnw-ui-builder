import { ProjectType } from '../../types';

export interface ProjectsState {
  projects: ProjectType[];
  // getProjects
  loadingGetProjects: boolean;
  hasErrorGetProjects: boolean;
  errorMessageGetProjects: string;
  // createProject
  loadingCreateProject: boolean;
  hasErrorCreateProject: boolean;
  errorMessageCreateProject: string;
}
