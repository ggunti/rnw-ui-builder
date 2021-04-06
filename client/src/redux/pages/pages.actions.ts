import axios from 'axios';
import fileDownload from 'js-file-download';
import { createAction } from 'redux-actions';
import { getErrMsg } from '../../utils/err';
import { PagesState } from './pages.types';
import { AppThunk } from '../store';
import { PageType } from '../../types';

export const PAGES = {
  SET: 'set_pages',
  // getPages
  START_LOADING_GET_PAGES: 'start_loading_get_pages',
  FINISH_LOADING_GET_PAGES: 'finish_loading_get_pages',
  SET_GET_PAGES_ERROR: 'set_get_pages_error',
  HIDE_GET_PAGES_ERROR: 'hide_get_pages_error',
  // getPage
  START_LOADING_GET_PAGE: 'start_loading_get_page',
  FINISH_LOADING_GET_PAGE: 'finish_loading_get_page',
  SET_GET_PAGE_ERROR: 'set_get_page_error',
  HIDE_GET_PAGE_ERROR: 'hide_get_page_error',
  // createPage
  START_LOADING_CREATE_PAGE: 'start_loading_create_page',
  FINISH_LOADING_CREATE_PAGE: 'finish_loading_create_page',
  SET_CREATE_PAGE_ERROR: 'set_create_page_error',
  HIDE_CREATE_PAGE_ERROR: 'hide_create_page_error',
  // deletePage
  START_LOADING_DELETE_PAGE: 'start_loading_delete_page',
  FINISH_LOADING_DELETE_PAGE: 'finish_loading_delete_page',
  SET_DELETE_PAGE_ERROR: 'set_delete_page_error',
  HIDE_DELETE_PAGE_ERROR: 'hide_delete_page_error',
  // updatePage
  START_LOADING_UPDATE_PAGE: 'start_loading_update_page',
  FINISH_LOADING_UPDATE_PAGE: 'finish_loading_update_page',
  SET_UPDATE_PAGE_ERROR: 'set_update_page_error',
  HIDE_UPDATE_PAGE_ERROR: 'hide_update_page_error',
  // generateCode
  START_LOADING_GENERATE_CODE: 'start_loading_generate_code',
  FINISH_LOADING_GENERATE_CODE: 'finish_loading_generate_code',
  SET_GENERATE_CODE_ERROR: 'set_generate_code_error',
  HIDE_GENERATE_CODE_ERROR: 'hide_generate_code_error',
};

export const setPages = createAction<Partial<PagesState>>(PAGES.SET);

// getPages - function
export const startLoadingGetPages = createAction(PAGES.START_LOADING_GET_PAGES);
export const finishLoadingGetPages = createAction(PAGES.FINISH_LOADING_GET_PAGES);
export const setGetPagesError = createAction(PAGES.SET_GET_PAGES_ERROR);
export const hideGetPagesError = createAction(PAGES.HIDE_GET_PAGES_ERROR);

export function getPages(
  { projectId }: { projectId: number },
  onSuccess: (pages: PageType[]) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingGetPages());
    return axios
      .get(`/projects/${projectId}/pages`)
      .then((res) => res.data)
      .then(({ pages }) => {
        dispatch(finishLoadingGetPages());
        onSuccess(pages);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGetPages());
        dispatch(setGetPagesError(errMsg));
        onError(errMsg);
      });
  };
}

// getPage - function
export const startLoadingGetPage = createAction(PAGES.START_LOADING_GET_PAGE);
export const finishLoadingGetPage = createAction(PAGES.FINISH_LOADING_GET_PAGE);
export const setGetPageError = createAction(PAGES.SET_GET_PAGE_ERROR);
export const hideGetPageError = createAction(PAGES.HIDE_GET_PAGE_ERROR);

export function getPage(
  { id }: { id: number },
  onSuccess: (page: PageType) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingGetPage());
    return axios
      .get(`/pages/${id}`)
      .then((res) => res.data)
      .then(({ page }) => {
        dispatch(finishLoadingGetPage());
        onSuccess(page);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGetPage());
        dispatch(setGetPageError(errMsg));
        onError(errMsg);
      });
  };
}

// createPage - function
export const startLoadingCreatePage = createAction(PAGES.START_LOADING_CREATE_PAGE);
export const finishLoadingCreatePage = createAction(PAGES.FINISH_LOADING_CREATE_PAGE);
export const setCreatePageError = createAction(PAGES.SET_CREATE_PAGE_ERROR);
export const hideCreatePageError = createAction(PAGES.HIDE_CREATE_PAGE_ERROR);

export function createPage(
  { projectId, name }: { projectId: number; name: string },
  onSuccess: (page: PageType) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingCreatePage());
    return axios
      .post(`/projects/${projectId}/pages/create`, { name })
      .then((res) => res.data)
      .then(({ page }) => {
        dispatch(finishLoadingCreatePage());
        onSuccess(page);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingCreatePage());
        dispatch(setCreatePageError(errMsg));
        onError(errMsg);
      });
  };
}

// deletePage - function
export const startLoadingDeletePage = createAction(PAGES.START_LOADING_DELETE_PAGE);
export const finishLoadingDeletePage = createAction(PAGES.FINISH_LOADING_DELETE_PAGE);
export const setDeletePageError = createAction(PAGES.SET_DELETE_PAGE_ERROR);
export const hideDeletePageError = createAction(PAGES.HIDE_DELETE_PAGE_ERROR);

export function deletePage(
  { pageId }: { pageId: number },
  onSuccess: (page: PageType) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingDeletePage());
    return axios
      .post(`pages/${pageId}/delete`)
      .then((res) => res.data)
      .then(({ page }) => {
        dispatch(finishLoadingDeletePage());
        onSuccess(page);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingDeletePage());
        dispatch(setDeletePageError(errMsg));
        onError(errMsg);
      });
  };
}

// updatePage - function
export const startLoadingUpdatePage = createAction(PAGES.START_LOADING_UPDATE_PAGE);
export const finishLoadingUpdatePage = createAction(PAGES.FINISH_LOADING_UPDATE_PAGE);
export const setUpdatePageError = createAction(PAGES.SET_UPDATE_PAGE_ERROR);
export const hideUpdatePageError = createAction(PAGES.HIDE_UPDATE_PAGE_ERROR);

export function updatePage(
  { page }: { page: PageType },
  onSuccess: (page: PageType) => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingUpdatePage());
    return axios
      .post(`pages/${page.id}/update`, page)
      .then((res) => res.data)
      .then((data) => {
        dispatch(finishLoadingUpdatePage());
        onSuccess(data.page);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingUpdatePage());
        dispatch(setUpdatePageError(errMsg));
        onError(errMsg);
      });
  };
}

// generateCode - function
export const startLoadingGenerateCode = createAction(PAGES.START_LOADING_GENERATE_CODE);
export const finishLoadingGenerateCode = createAction(PAGES.FINISH_LOADING_GENERATE_CODE);
export const setGenerateCodeError = createAction(PAGES.SET_GENERATE_CODE_ERROR);
export const hideGenerateCodeError = createAction(PAGES.HIDE_GENERATE_CODE_ERROR);

export function generateCode(
  {
    projectId,
    page,
    components,
  }: {
    projectId: number;
    page: { id: number; name: string; content: string };
    components: { name: string; content: string }[];
  },
  onSuccess: () => void = () => {},
  onError: (errMsg: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch) => {
    dispatch(startLoadingGenerateCode());
    return axios
      .post('pages/generateCode', { page, components }, { responseType: 'blob' })
      .then((res) => {
        dispatch(finishLoadingGenerateCode());
        fileDownload(res.data, `Proj${projectId} - ${page.name}.zip`);
        onSuccess();
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGenerateCode());
        dispatch(setGenerateCodeError(errMsg));
        onError(errMsg);
      });
  };
}
