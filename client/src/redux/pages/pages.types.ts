import { PageType } from '../../types';

export interface PagesState {
  pages: PageType[];
  // getPages
  loadingGetPages: boolean;
  hasErrorGetPages: boolean;
  errorMessageGetPages: string;
  // getPage
  loadingGetPage: boolean;
  hasErrorGetPage: boolean;
  errorMessageGetPage: string;
  // createPage
  loadingCreatePage: boolean;
  hasErrorCreatePage: boolean;
  errorMessageCreatePage: string;
  // deletePage
  loadingDeletePage: boolean;
  hasErrorDeletePage: boolean;
  errorMessageDeletePage: string;
  // updatePage
  loadingUpdatePage: boolean;
  hasErrorUpdatePage: boolean;
  errorMessageUpdatePage: string;
  // generateCode
  loadingGenerateCode: boolean;
  hasErrorGenerateCode: boolean;
  errorMessageGenerateCode: string;
}
