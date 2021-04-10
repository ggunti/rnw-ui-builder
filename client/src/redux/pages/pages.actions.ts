import axios from 'axios';
import fileDownload from 'js-file-download';
import { createAction } from 'redux-actions';
import { compress, decompress } from '../../utils/compressor';
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
  // generatePageCode
  START_LOADING_GENERATE_PAGE_CODE: 'start_loading_generate_page_code',
  FINISH_LOADING_GENERATE_PAGE_CODE: 'finish_loading_generate_page_code',
  SET_GENERATE_PAGE_CODE_ERROR: 'set_generate_page_code_error',
  HIDE_GENERATE_PAGE_CODE_ERROR: 'hide_generate_page_code_error',
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
      .then((data) => {
        const pages = data.pages.map((p: any) => ({ ...p, json: decompress(p.compressedState) }));
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
      .then((data) => {
        const page = { ...data.page, json: decompress(data.page.compressedState) };
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
      .then((data) => {
        const page = { ...data.page, json: decompress(data.page.compressedState) };
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
      .then((data) => {
        const page = { ...data.page, json: decompress(data.page.compressedState) };
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
    const compressedPage = { ...page, compressedState: compress(page.json) };
    delete compressedPage.json;
    return axios
      .post(`pages/${page.id}/update`, compressedPage)
      .then((res) => res.data)
      .then((data) => {
        const updatedPage = { ...data.page, json: decompress(data.page.compressedState) };
        dispatch(finishLoadingUpdatePage());
        onSuccess(updatedPage);
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingUpdatePage());
        dispatch(setUpdatePageError(errMsg));
        onError(errMsg);
      });
  };
}

// generatePageCode - function
export const startLoadingGeneratePageCode = createAction(PAGES.START_LOADING_GENERATE_PAGE_CODE);
export const finishLoadingGeneratePageCode = createAction(PAGES.FINISH_LOADING_GENERATE_PAGE_CODE);
export const setGeneratePageCodeError = createAction(PAGES.SET_GENERATE_PAGE_CODE_ERROR);
export const hideGeneratePageCodeError = createAction(PAGES.HIDE_GENERATE_PAGE_CODE_ERROR);

export function generatePageCode(
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
    dispatch(startLoadingGeneratePageCode());
    return axios
      .post('pages/generateCode', { page, components }, { responseType: 'blob' })
      .then((res) => {
        dispatch(finishLoadingGeneratePageCode());
        fileDownload(res.data, `Proj${projectId} - ${page.name}.zip`);
        onSuccess();
      })
      .catch((err) => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingGeneratePageCode());
        dispatch(setGeneratePageCodeError(errMsg));
        onError(errMsg);
      });
  };
}
