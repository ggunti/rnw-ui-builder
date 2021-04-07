import { PAGES } from './pages.actions';
import { PagesState } from './pages.types';

const INITIAL_STATE: PagesState = {
  pages: [],
  // getPages
  loadingGetPages: false,
  hasErrorGetPages: false,
  errorMessageGetPages: '',
  // getPage
  loadingGetPage: false,
  hasErrorGetPage: false,
  errorMessageGetPage: '',
  // createPage
  loadingCreatePage: false,
  hasErrorCreatePage: false,
  errorMessageCreatePage: '',
  // deletePage
  loadingDeletePage: false,
  hasErrorDeletePage: false,
  errorMessageDeletePage: '',
  // updatePage
  loadingUpdatePage: false,
  hasErrorUpdatePage: false,
  errorMessageUpdatePage: '',
  // generatePageCode
  loadingGeneratePageCode: false,
  hasErrorGeneratePageCode: false,
  errorMessageGeneratePageCode: '',
};

export default (state = INITIAL_STATE, action: any): PagesState => {
  switch (action.type) {
    case PAGES.SET:
      return { ...state, ...action.payload };
    // getPages
    case PAGES.START_LOADING_GET_PAGES:
      return { ...state, loadingGetPages: true };
    case PAGES.FINISH_LOADING_GET_PAGES:
      return { ...state, loadingGetPages: false };
    case PAGES.SET_GET_PAGES_ERROR:
      return { ...state, hasErrorGetPages: true, errorMessageGetPages: action.payload };
    case PAGES.HIDE_GET_PAGES_ERROR:
      return { ...state, hasErrorGetPages: false, errorMessageGetPages: '' };
    // getPage
    case PAGES.START_LOADING_GET_PAGE:
      return { ...state, loadingGetPage: true };
    case PAGES.FINISH_LOADING_GET_PAGE:
      return { ...state, loadingGetPage: false };
    case PAGES.SET_GET_PAGE_ERROR:
      return { ...state, hasErrorGetPage: true, errorMessageGetPage: action.payload };
    case PAGES.HIDE_GET_PAGE_ERROR:
      return { ...state, hasErrorGetPage: false, errorMessageGetPage: '' };
    // createPage
    case PAGES.START_LOADING_CREATE_PAGE:
      return { ...state, loadingCreatePage: true };
    case PAGES.FINISH_LOADING_CREATE_PAGE:
      return { ...state, loadingCreatePage: false };
    case PAGES.SET_CREATE_PAGE_ERROR:
      return { ...state, hasErrorCreatePage: true, errorMessageCreatePage: action.payload };
    case PAGES.HIDE_CREATE_PAGE_ERROR:
      return { ...state, hasErrorCreatePage: false, errorMessageCreatePage: '' };
    // deletePage
    case PAGES.START_LOADING_DELETE_PAGE:
      return { ...state, loadingDeletePage: true };
    case PAGES.FINISH_LOADING_DELETE_PAGE:
      return { ...state, loadingDeletePage: false };
    case PAGES.SET_DELETE_PAGE_ERROR:
      return { ...state, hasErrorDeletePage: true, errorMessageDeletePage: action.payload };
    case PAGES.HIDE_DELETE_PAGE_ERROR:
      return { ...state, hasErrorDeletePage: false, errorMessageDeletePage: '' };
    // updatePage
    case PAGES.START_LOADING_UPDATE_PAGE:
      return { ...state, loadingUpdatePage: true };
    case PAGES.FINISH_LOADING_UPDATE_PAGE:
      return { ...state, loadingUpdatePage: false };
    case PAGES.SET_UPDATE_PAGE_ERROR:
      return { ...state, hasErrorUpdatePage: true, errorMessageUpdatePage: action.payload };
    case PAGES.HIDE_UPDATE_PAGE_ERROR:
      return { ...state, hasErrorUpdatePage: false, errorMessageUpdatePage: '' };
    // generatePageCode
    case PAGES.START_LOADING_GENERATE_PAGE_CODE:
      return { ...state, loadingGeneratePageCode: true };
    case PAGES.FINISH_LOADING_GENERATE_PAGE_CODE:
      return { ...state, loadingGeneratePageCode: false };
    case PAGES.SET_GENERATE_PAGE_CODE_ERROR:
      return { ...state, hasErrorGeneratePageCode: true, errorMessageGeneratePageCode: action.payload };
    case PAGES.HIDE_GENERATE_PAGE_CODE_ERROR:
      return { ...state, hasErrorGeneratePageCode: false, errorMessageGeneratePageCode: '' };
    default:
      return state;
  }
};
