import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PageEditor from './PageEditor';
import { generatePage } from '../../templates/page';
import { generateComponent, getComponentNames } from '../../templates/component';
import { draggableComponents } from '../../draggables';
import { PHONE_WIDTHS } from '../../constants';
import {
  // pages - entity
  setPages,
  // getPage - function
  getPage,
  hideGetPageError,
  // updatePage - function
  updatePage,
  hideUpdatePageError,
  // generatePageCode - function
  generatePageCode,
  hideGeneratePageCodeError,
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
  phoneWidth: number;
}

class PageEditorPage extends Component<PageEditorPageProps, PageEditorPageState> {
  pageId = this.props.route.params.pageId;

  state = {
    page: {
      id: -1,
      projectId: -1,
      name: '',
    },
    phoneWidth: PHONE_WIDTHS[0].value,
  };

  componentDidMount() {
    this.getPage();
  }

  getPage = () => {
    const onSuccess = (page: PageType) => this.setState({ page });
    const onError = () => {};
    this.props.getPage({ id: this.pageId }, onSuccess, onError);
  };

  onPressSave = (serializedJson: string) => {
    console.log(generatePage(JSON.parse(serializedJson)));

    const updatedPage = { ...this.state.page, json: serializedJson };
    const pages = [...this.props.pages];
    const pageIndex = pages.findIndex(p => p.id === this.pageId);
    pages[pageIndex] = updatedPage;
    const onSuccess = () => this.props.setPages({ pages });
    const onError = () => {};
    this.props.updatePage({ page: updatedPage }, onSuccess, onError);
  };

  onPressGenerateCode = (serializedJson: string) => {
    const nodes = JSON.parse(serializedJson);
    const page = { id: this.pageId, name: this.state.page.name, content: generatePage(nodes) };
    const componentNames = getComponentNames(nodes);
    const components = componentNames.map(name => ({
      name,
      // @ts-ignore
      content: generateComponent(draggableComponents[name].template),
    }));

    const onSuccess = () => {};
    const onError = () => {};
    this.props.generatePageCode({ projectId: this.state.page.projectId, page, components }, onSuccess, onError);
  };

  onHideError = () => {
    this.props.hideGetPageError();
    this.props.hideUpdatePageError();
    this.props.hideGeneratePageCodeError();
  };

  render() {
    return (
      <PageEditor
        loading={this.props.loadingGetPage || this.props.loadingUpdatePage || this.props.loadingGeneratePageCode}
        hasError={this.props.hasErrorGetPage || this.props.hasErrorUpdatePage || this.props.hasErrorGeneratePageCode}
        errorMessage={
          this.props.errorMessageGetPage + this.props.errorMessageUpdatePage + this.props.errorMessageGeneratePageCode
        }
        onHideError={this.onHideError}
        page={this.state.page}
        phoneWidth={this.state.phoneWidth}
        setPhoneWidth={phoneWidth => this.setState({ phoneWidth })}
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
    loadingGeneratePageCode,
    hasErrorGeneratePageCode,
    errorMessageGeneratePageCode,
  } = state.pages;
  return {
    pages,
    loadingGetPage,
    hasErrorGetPage,
    errorMessageGetPage,
    loadingUpdatePage,
    hasErrorUpdatePage,
    errorMessageUpdatePage,
    loadingGeneratePageCode,
    hasErrorGeneratePageCode,
    errorMessageGeneratePageCode,
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
  // generatePageCode - function
  generatePageCode,
  hideGeneratePageCodeError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(PageEditorPage);
