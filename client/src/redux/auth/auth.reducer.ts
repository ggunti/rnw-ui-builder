import { AUTH } from './auth.actions';
import { AuthState } from './auth.types';

const INITIAL_STATE: AuthState = {
  // signup
  loadingSignup: false,
  hasErrorSignup: false,
  errorMessageSignup: '',
  // login
  loadingLogin: false,
  hasErrorLogin: false,
  errorMessageLogin: '',
  // logout
  loadingLogout: false,
  hasErrorLogout: false,
  errorMessageLogout: '',
  // verifyToken
  loadingVerifyToken: false,
  hasErrorVerifyToken: false,
  errorMessageVerifyToken: '',
  // sendVerificationEmail
  loadingSendVerificationEmail: false,
  hasErrorSendVerificationEmail: false,
  errorMessageSendVerificationEmail: '',
};

export default (state = INITIAL_STATE, action: any): AuthState => {
  switch (action.type) {
    // signup
    case AUTH.START_LOADING_SIGNUP:
      return { ...state, loadingSignup: true };
    case AUTH.FINISH_LOADING_SIGNUP:
      return { ...state, loadingSignup: false };
    case AUTH.SET_SIGNUP_ERROR:
      return { ...state, hasErrorSignup: true, errorMessageSignup: action.payload };
    case AUTH.HIDE_SIGNUP_ERROR:
      return { ...state, hasErrorSignup: false, errorMessageSignup: '' };
    // login
    case AUTH.START_LOADING_LOGIN:
      return { ...state, loadingLogin: true };
    case AUTH.FINISH_LOADING_LOGIN:
      return { ...state, loadingLogin: false };
    case AUTH.SET_LOGIN_ERROR:
      return { ...state, hasErrorLogin: true, errorMessageLogin: action.payload };
    case AUTH.HIDE_LOGIN_ERROR:
      return { ...state, hasErrorLogin: false, errorMessageLogin: '' };
    // logout
    case AUTH.START_LOADING_LOGOUT:
      return { ...state, loadingLogout: true };
    case AUTH.FINISH_LOADING_LOGOUT:
      return { ...state, loadingLogout: false };
    case AUTH.SET_LOGOUT_ERROR:
      return { ...state, hasErrorLogout: true, errorMessageLogout: action.payload };
    case AUTH.HIDE_LOGOUT_ERROR:
      return { ...state, hasErrorLogout: false, errorMessageLogout: '' };
    // verifyToken
    case AUTH.START_LOADING_VERIFY_TOKEN:
      return { ...state, loadingVerifyToken: true };
    case AUTH.FINISH_LOADING_VERIFY_TOKEN:
      return { ...state, loadingVerifyToken: false };
    case AUTH.SET_VERIFY_TOKEN_ERROR:
      return { ...state, hasErrorVerifyToken: true, errorMessageVerifyToken: action.payload };
    case AUTH.HIDE_VERIFY_TOKEN_ERROR:
      return { ...state, hasErrorVerifyToken: false, errorMessageVerifyToken: '' };
    // sendVerificationEmail
    case AUTH.START_LOADING_SEND_VERIFICATION_EMAIL:
      return { ...state, loadingSendVerificationEmail: true };
    case AUTH.FINISH_LOADING_SEND_VERIFICATION_EMAIL:
      return { ...state, loadingSendVerificationEmail: false };
    case AUTH.SET_SEND_VERIFICATION_EMAIL_ERROR:
      return { ...state, hasErrorSendVerificationEmail: true, errorMessageSendVerificationEmail: action.payload };
    case AUTH.HIDE_SEND_VERIFICATION_EMAIL_ERROR:
      return { ...state, hasErrorSendVerificationEmail: false, errorMessageSendVerificationEmail: '' };
    default:
      return state;
  }
};
