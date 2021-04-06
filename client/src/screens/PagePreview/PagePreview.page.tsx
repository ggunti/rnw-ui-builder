import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PagePreview from './PagePreview';
import {
  // getPage - function
  getPage,
  hideGetPageError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, PageType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PagePreviewPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'pagePreview'>;
  route: RouteProp<StackParamList, 'pagePreview'>;
}

interface PagePreviewPageState {}

class PagePreviewPage extends Component<PagePreviewPageProps, PagePreviewPageState> {
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

  render() {
    return (
      <PagePreview
        loading={this.props.loadingGetPage}
        hasError={this.props.hasErrorGetPage}
        errorMessage={this.props.errorMessageGetPage}
        onHideError={this.props.hideGetPageError}
        page={this.state.page}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { pages, loadingGetPage, hasErrorGetPage, errorMessageGetPage } = state.pages;
  return {
    pages,
    loadingGetPage,
    hasErrorGetPage,
    errorMessageGetPage,
  };
};

const mapDispatch = {
  // getPage - function
  getPage,
  hideGetPageError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(PagePreviewPage);
