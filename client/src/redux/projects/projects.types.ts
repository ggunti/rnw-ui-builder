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
  // deleteProject
  loadingDeleteProject: boolean;
  hasErrorDeleteProject: boolean;
  errorMessageDeleteProject: string;
  // generateProjectCode
  loadingGenerateProjectCode: boolean;
  hasErrorGenerateProjectCode: boolean;
  errorMessageGenerateProjectCode: string;
}
