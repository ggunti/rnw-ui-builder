import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PageEditor from './PageEditor';
import { createPage } from '../../templates/page';
import { createComponent, getComponentNames } from '../../templates/component';
import { userComponents } from '../../UiEditor/user';
import {
  // pages - entity
  setPages,
  // getPage - function
  getPage,
  hideGetPageError,
  // updatePage - function
  updatePage,
  hideUpdatePageError,
  // generateCode - function
  generateCode,
  hideGenerateCodeError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, PageType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PageEditorPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'pageEditor'>;
  route: RouteProp<StackParamList, 'pageEditor'>;
}

interface PageEditorPageState {
  page: PageType;
}

class PageEditorPage extends Component<PageEditorPageProps, PageEditorPageState> {
  pageId = this.props.route.params.pageId;

  state = {
    page: {
      id: -1,
      projectId: -1,
      name: '',
    },
  };

  componentDidMount() {
    this.getPage();
  }

  getPage = () => {
    const onSuccess = (page: PageType) => this.setState({ page });
    const onError = () => {};
    this.props.getPage({ id: this.pageId }, onSuccess, onError);
  };

  onPressSave = (compressedState: string) => {
    const updatedPage = { ...this.state.page, compressedState };
    const pages = [...this.props.pages];
    const pageIndex = pages.findIndex((p) => p.id === this.pageId);
    pages[pageIndex] = updatedPage;
    const onSuccess = () => this.props.setPages({ pages });
    const onError = () => {};
    this.props.updatePage({ page: updatedPage }, onSuccess, onError);
  };

  onPressGenerateCode = (serializedJson: string) => {
    const nodes = JSON.parse(serializedJson);
    const page = { id: this.pageId, name: this.state.page.name, content: createPage(nodes) };
    const componentNames = getComponentNames(nodes);
    const components = componentNames.map((name) => ({
      name,
      // @ts-ignore
      content: createComponent(userComponents[name].template),
    }));

    const onSuccess = () => {};
    const onError = () => {};
    this.props.generateCode({ projectId: this.state.page.projectId, page, components }, onSuccess, onError);
  };

  onHideError = () => {
    this.props.hideGetPageError();
    this.props.hideUpdatePageError();
    this.props.hideGenerateCodeError();
  };

  render() {
    return (
      <PageEditor
        loading={this.props.loadingGetPage || this.props.loadingUpdatePage || this.props.loadingGenerateCode}
        hasError={this.props.hasErrorGetPage || this.props.hasErrorUpdatePage || this.props.hasErrorGenerateCode}
        errorMessage={
          this.props.errorMessageGetPage + this.props.errorMessageUpdatePage + this.props.errorMessageGenerateCode
        }
        onHideError={this.onHideError}
        page={this.state.page}
        onPressSave={this.onPressSave}
        onPressGenerateCode={this.onPressGenerateCode}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    pages,
    loadingGetPage,
    hasErrorGetPage,
    errorMessageGetPage,
    loadingUpdatePage,
    hasErrorUpdatePage,
    errorMessageUpdatePage,
    loadingGenerateCode,
    hasErrorGenerateCode,
    errorMessageGenerateCode,
  } = state.pages;
  return {
    pages,
    loadingGetPage,
    hasErrorGetPage,
    errorMessageGetPage,
    loadingUpdatePage,
    hasErrorUpdatePage,
    errorMessageUpdatePage,
    loadingGenerateCode,
    hasErrorGenerateCode,
    errorMessageGenerateCode,
  };
};

const mapDispatch = {
  setPages,
  // getPage - function
  getPage,
  hideGetPageError,
  // updatePage - function
  updatePage,
  hideUpdatePageError,
  // generateCode - function
  generateCode,
  hideGenerateCodeError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(PageEditorPage);
