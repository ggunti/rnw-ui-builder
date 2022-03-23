import axios from 'axios';
import { createAction } from 'redux-actions';
import { getErrMsg } from '../../utils/err';
import { AppThunk } from '../store';
import { TokenType, UserType } from '../../types';

export const AUTH = {
  // signup
  START_LOADING_SIGNUP: 'start_loading_signup',
  FINISH_LOADING_SIGNUP: 'finish_loading_signup',
  SET_SIGNUP_ERROR: 'set_signup_error',
  HIDE_SIGNUP_ERROR: 'hide_signup_error',
  // login
  START_LOADING_LOGIN: 'start_loading_login',
  FINISH_LOADING_LOGIN: 'finish_loading_login',
  SET_LOGIN_ERROR: 'set_login_error',
  HIDE_LOGIN_ERROR: 'hide_login_error',
  // logout
  START_LOADING_LOGOUT: 'start_loading_logout',
  FINISH_LOADING_LOGOUT: 'finish_loading_logout',
  SET_LOGOUT_ERROR: 'set_logout_error',
  HIDE_LOGOUT_ERROR: 'hide_logout_error',
  // verifyToken
  START_LOADING_VERIFY_TOKEN: 'start_loading_verify_token',
  FINISH_LOADING_VERIFY_TOKEN: 'finish_loading_verify_token',
  SET_VERIFY_TOKEN_ERROR: 'set_verify_token_error',
  HIDE_VERIFY_TOKEN_ERROR: 'hide_verify_token_error',
  // sendVerificationEmail
  START_LOADING_SEND_VERIFICATION_EMAIL: 'start_loading_send_verification_email',
  FINISH_LOADING_SEND_VERIFICATION_EMAIL: 'finish_loading_send_verification_email',
  SET_SEND_VERIFICATION_EMAIL_ERROR: 'set_send_verification_email_error',
  HIDE_SEND_VERIFICATION_EMAIL_ERROR: 'hide_send_verification_email_error',
};

// signup
export const startLoadingSignup = createAction(AUTH.START_LOADING_SIGNUP);
export const finishLoadingSignup = createAction(AUTH.FINISH_LOADING_SIGNUP);
export const setSignupError = createAction(AUTH.SET_SIGNUP_ERROR);
export const hideSignupError = createAction(AUTH.HIDE_SIGNUP_ERROR);

export function signup(
  { email, password }: { email: string; password: string },
  onSuccess: () => void = () => {},
  onError: (errMessage: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch: any) => {
    dispatch(startLoadingSignup());
    return axios
      .post('/users/create', { email, password })
      .then(resp => resp.data)
      .then(() => {
        dispatch(finishLoadingSignup());
        onSuccess();
      })
      .catch(err => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingSignup());
        dispatch(setSignupError(errMsg));
        onError(errMsg);
      });
  };
}

// login
export const startLoadingLogin = createAction(AUTH.START_LOADING_LOGIN);
export const finishLoadingLogin = createAction(AUTH.FINISH_LOADING_LOGIN);
export const setLoginError = createAction(AUTH.SET_LOGIN_ERROR);
export const hideLoginError = createAction(AUTH.HIDE_LOGIN_ERROR);

export function login(
  { email, password }: { email: string; password: string },
  onSuccess: (user: UserType, token: TokenType) => void = () => {},
  onError: (errMessage: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch: any) => {
    dispatch(startLoadingLogin());
    return axios
      .post('/login', { email, password })
      .then(resp => resp.data)
      .then(data => {
        const user: UserType = {
          ...data.user,
          isVerified: data.user.email_verified_at ? true : false,
        };
        dispatch(finishLoadingLogin());
        onSuccess(user, data.token);
      })
      .catch(err => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingLogin());
        dispatch(setLoginError(errMsg));
        onError(errMsg);
      });
  };
}

// logout
export const startLoadingLogout = createAction(AUTH.START_LOADING_LOGOUT);
export const finishLoadingLogout = createAction(AUTH.FINISH_LOADING_LOGOUT);
export const setLogoutError = createAction(AUTH.SET_LOGOUT_ERROR);
export const hideLogoutError = createAction(AUTH.HIDE_LOGOUT_ERROR);

export function logout(
  onSuccess: () => void = () => {},
  onError: (errMessage: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch: any) => {
    dispatch(startLoadingLogout());
    return axios
      .post('/logout')
      .then(res => res.data)
      .then(() => {
        dispatch(finishLoadingLogout());
        onSuccess();
      })
      .catch(err => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingLogout());
        dispatch(setLogoutError(errMsg));
        onError(errMsg);
      });
  };
}

// verifyToken
export const startLoadingVerifyToken = createAction(AUTH.START_LOADING_VERIFY_TOKEN);
export const finishLoadingVerifyToken = createAction(AUTH.FINISH_LOADING_VERIFY_TOKEN);
export const setVerifyTokenError = createAction(AUTH.SET_VERIFY_TOKEN_ERROR);
export const hideVerifyTokenError = createAction(AUTH.HIDE_VERIFY_TOKEN_ERROR);

export function verifyToken(
  onSuccess: (user: UserType) => void = () => {},
  onError: (errMessage: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch: any) => {
    dispatch(startLoadingVerifyToken());
    return axios
      .post('/verifyToken')
      .then(res => res.data)
      .then(data => {
        const user = {
          ...data.user,
          isVerified: data.user.email_verified_at ? true : false,
        };
        dispatch(finishLoadingVerifyToken());
        onSuccess(user);
      })
      .catch(err => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingVerifyToken());
        dispatch(setVerifyTokenError(errMsg));
        onError(errMsg);
      });
  };
}

// sendVerificationEmail
export const startLoadingSendVerificationEmail = createAction(AUTH.START_LOADING_SEND_VERIFICATION_EMAIL);
export const finishLoadingSendVerificationEmail = createAction(AUTH.FINISH_LOADING_SEND_VERIFICATION_EMAIL);
export const setSendVerificationEmailError = createAction(AUTH.SET_SEND_VERIFICATION_EMAIL_ERROR);
export const hideSendVerificationEmailError = createAction(AUTH.HIDE_SEND_VERIFICATION_EMAIL_ERROR);

export function sendVerificationEmail(
  onSuccess: () => void = () => {},
  onError: (errMessage: string) => void = () => {},
): AppThunk<Promise<void>> {
  return (dispatch: any) => {
    dispatch(startLoadingSendVerificationEmail());
    return axios
      .get('/email/resend')
      .then(res => res.data)
      .then(() => {
        dispatch(finishLoadingSendVerificationEmail());
        onSuccess();
      })
      .catch(err => {
        const errMsg = getErrMsg(err.response.data);
        dispatch(finishLoadingSendVerificationEmail());
        dispatch(setSendVerificationEmailError(errMsg));
        onError(errMsg);
      });
  };
}
