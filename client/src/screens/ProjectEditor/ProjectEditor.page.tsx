import React, { Component } from 'react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ProjectEditor from './ProjectEditor';
import { generatePage } from '../../templates/page';
import { generateComponent } from '../../templates/component';
import { userComponents } from '../../UiEditor/user';
import {
  // pages - entity
  setPages,
  // getPages - function
  getPages,
  hideGetPagesError,
  // createPage - function
  createPage,
  hideCreatePageError,
  // deletePage - function
  deletePage,
  hideDeletePageError,
  // generateProjectCode
  generateProjectCode,
  hideGenerateProjectCodeError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, PageType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProjectEditorPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'projectEditor'>;
  route: RouteProp<StackParamList, 'projectEditor'>;
}

interface ProjectEditorPageState {
  hoveredPageId: number;
  modalVisible: boolean;
  newPageName: string;
}

class ProjectEditorPage extends Component<ProjectEditorPageProps, ProjectEditorPageState> {
  state = {
    hoveredPageId: -1,
    modalVisible: false,
    newPageName: '',
  };

  projectId = this.props.route.params.projectId;

  componentDidMount() {
    const { projectId } = this;
    const onSuccess = (pages: PageType[]) => this.props.setPages({ pages });
    const onError = () => {};
    this.props.getPages({ projectId }, onSuccess, onError);
  }

  onAddNewPage = () => {
    const { projectId } = this;
    const { newPageName } = this.state;
    const onSuccess = (page: PageType) => this.props.setPages({ pages: [...this.props.pages, page] });
    const onError = () => {};
    this.props.createPage({ projectId, name: newPageName }, onSuccess, onError);
    this.setState({ modalVisible: false, newPageName: '' });
  };

  onPressGenerate = () => {
    const componentNames = new Set<string>();
    const pages = this.props.pages.map((p) => {
      if (p.json) {
        const nodes = JSON.parse(p.json);
        _.forEach(nodes, (val) => componentNames.add(val.type.resolvedName));
        return { ...p, content: generatePage(nodes) };
      }
      return { ...p, content: '' };
    });
    const components = Array.from(componentNames).map((name) => ({
      name,
      // @ts-ignore
      content: generateComponent(userComponents[name].template),
    }));

    const onSuccess = () => {};
    const onError = () => {};
    this.props.generateProjectCode({ project: { id: this.projectId, pages }, components }, onSuccess, onError);
  };

  onPressDeletePage = (id: number) => {
    const onSuccess = () => {
      const pages = this.props.pages.filter((p) => p.id !== id);
      this.props.setPages({ pages });
    };
    const onError = () => {};
    this.props.deletePage({ pageId: id }, onSuccess, onError);
  };

  onPressPage = (pageId: number) => {
    const { projectId } = this;
    // we unhover the clicked item in order to allow preview refresh when user comes back to this page
    this.setState({ hoveredPageId: -1 }, () => this.props.navigation.navigate('pageEditor', { projectId, pageId }));
  };

  onHideError = () => {
    this.props.hideGetPagesError();
    this.props.hideCreatePageError();
    this.props.hideDeletePageError();
    this.props.hideGenerateProjectCodeError();
  };

  render() {
    return (
      <ProjectEditor
        loading={
          this.props.loadingGetPages ||
          this.props.loadingCreatePage ||
          this.props.loadingDeletePage ||
          this.props.loadingGenerateProjectCode
        }
        hasError={
          this.props.hasErrorGetPages ||
          this.props.hasErrorCreatePage ||
          this.props.hasErrorDeletePage ||
          this.props.hasErrorGenerateProjectCode
        }
        errorMessage={
          this.props.errorMessageGetPages +
          this.props.errorMessageCreatePage +
          this.props.errorMessageDeletePage +
          this.props.errorMessageGenerateProjectCode
        }
        onHideError={this.onHideError}
        pages={this.props.pages}
        hoveredPageId={this.state.hoveredPageId}
        setHoveredPageId={(hoveredPageId) => this.setState({ hoveredPageId })}
        modalVisible={this.state.modalVisible}
        setModalVisible={(modalVisible) => this.setState({ modalVisible })}
        newPageName={this.state.newPageName}
        setNewPageName={(newPageName) => this.setState({ newPageName })}
        addDisabled={this.state.newPageName.length === 0}
        onAddNewPage={this.onAddNewPage}
        onPressGenerate={this.onPressGenerate}
        onPressDeletePage={this.onPressDeletePage}
        onPressPage={this.onPressPage}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    pages,
    loadingGetPages,
    hasErrorGetPages,
    errorMessageGetPages,
    loadingCreatePage,
    hasErrorCreatePage,
    errorMessageCreatePage,
    loadingDeletePage,
    hasErrorDeletePage,
    errorMessageDeletePage,
  } = state.pages;
  const { loadingGenerateProjectCode, hasErrorGenerateProjectCode, errorMessageGenerateProjectCode } = state.projects;
  return {
    pages,
    loadingGetPages,
    hasErrorGetPages,
    errorMessageGetPages,
    loadingCreatePage,
    hasErrorCreatePage,
    errorMessageCreatePage,
    loadingDeletePage,
    hasErrorDeletePage,
    errorMessageDeletePage,
    loadingGenerateProjectCode,
    hasErrorGenerateProjectCode,
    errorMessageGenerateProjectCode,
  };
};

const mapDispatch = {
  // pages - entity
  setPages,
  // getPages - function
  getPages,
  hideGetPagesError,
  // createPage - function
  createPage,
  hideCreatePageError,
  // deletePage - function
  deletePage,
  hideDeletePageError,
  // generateProjectCode
  generateProjectCode,
  hideGenerateProjectCodeError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(ProjectEditorPage);
