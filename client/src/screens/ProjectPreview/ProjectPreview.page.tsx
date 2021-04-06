import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ProjectPreview from './ProjectPreview';
import {
  // pages - entity
  setPages,
  // getPages - function
  getPages,
  hideGetPagesError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, PageType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProjectPreviewPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'projectPreview'>;
  route: RouteProp<StackParamList, 'projectPreview'>;
}

interface ProjectPreviewPageState {}

class ProjectPreviewPage extends Component<ProjectPreviewPageProps, ProjectPreviewPageState> {
  projectId = this.props.route.params.projectId;

  componentDidMount() {
    const { projectId } = this;
    const onSuccess = (pages: PageType[]) => this.props.setPages({ pages });
    const onError = () => {};
    this.props.getPages({ projectId }, onSuccess, onError);
  }

  onPressPreview = (pageId: number) => {
    const { projectId } = this;
    this.props.navigation.navigate('pagePreview', { projectId, pageId });
  };

  render() {
    return (
      <ProjectPreview
        loading={this.props.loadingGetPages}
        hasError={this.props.hasErrorGetPages}
        errorMessage={this.props.errorMessageGetPages}
        onHideError={this.props.hideGetPagesError}
        pages={this.props.pages}
        onPressPreview={this.onPressPreview}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { pages, loadingGetPages, hasErrorGetPages, errorMessageGetPages } = state.pages;
  return {
    pages,
    loadingGetPages,
    hasErrorGetPages,
    errorMessageGetPages,
  };
};

const mapDispatch = {
  // pages - entity
  setPages,
  // getPages - function
  getPages,
  hideGetPagesError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(ProjectPreviewPage);
