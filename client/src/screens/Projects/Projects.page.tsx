import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Projects from './Projects';
import {
  // projects - entity
  setProjects,
  // getProjects - function
  getProjects,
  hideGetProjectsError,
  // createProject - function
  createProject,
  hideCreateProjectError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, ProjectType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProjectsPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'projects'>;
}

interface ProjectsPageState {
  addModalVisible: boolean;
  newProjectName: string;
}

class ProjectsPage extends Component<ProjectsPageProps, ProjectsPageState> {
  state = {
    addModalVisible: false,
    newProjectName: '',
  };

  componentDidMount() {
    const onSuccess = (projects: ProjectType[]) => this.props.setProjects({ projects });
    const onError = () => {};
    this.props.getProjects(onSuccess, onError);
  }

  onPressProject = (id: number) => {
    this.props.navigation.navigate('projectPreview', { projectId: id });
  };

  onPressEdit = (id: number) => {
    this.props.navigation.navigate('projectEditor', { projectId: id });
  };

  onPressAdd = () => {
    const { newProjectName } = this.state;
    const onSuccess = (project: ProjectType) => this.props.setProjects({ projects: [...this.props.projects, project] });
    const onError = () => {};
    this.props.createProject({ name: newProjectName }, onSuccess, onError);
    this.setState({ addModalVisible: false, newProjectName: '' });
  };

  onHideError = () => {
    this.props.hideGetProjectsError();
    this.props.hideCreateProjectError();
  };

  render() {
    return (
      <Projects
        loading={this.props.loadingGetProjects || this.props.loadingCreateProject}
        hasError={this.props.hasErrorGetProjects || this.props.hasErrorCreateProject}
        errorMessage={this.props.errorMessageGetProjects + this.props.errorMessageCreateProject}
        onHideError={this.onHideError}
        projects={this.props.projects}
        onPressProject={this.onPressProject}
        onPressEdit={this.onPressEdit}
        addModalVisible={this.state.addModalVisible}
        toggleAddModalVisible={() => this.setState((prevState) => ({ addModalVisible: !prevState.addModalVisible }))}
        newProjectName={this.state.newProjectName}
        setNewProjectName={(newProjectName) => this.setState({ newProjectName })}
        onPressAdd={this.onPressAdd}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    projects,
    loadingGetProjects,
    hasErrorGetProjects,
    errorMessageGetProjects,
    loadingCreateProject,
    hasErrorCreateProject,
    errorMessageCreateProject,
  } = state.projects;
  return {
    projects,
    loadingGetProjects,
    hasErrorGetProjects,
    errorMessageGetProjects,
    loadingCreateProject,
    hasErrorCreateProject,
    errorMessageCreateProject,
  };
};

const mapDispatch = {
  // projects - entity
  setProjects,
  // getProjects - function
  getProjects,
  hideGetProjectsError,
  // createProject - function
  createProject,
  hideCreateProjectError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(ProjectsPage);
