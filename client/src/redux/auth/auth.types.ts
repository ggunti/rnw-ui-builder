export interface AuthState {
  // signup
  loadingSignup: boolean;
  hasErrorSignup: boolean;
  errorMessageSignup: string;
  // login
  loadingLogin: boolean;
  hasErrorLogin: boolean;
  errorMessageLogin: string;
  // logout
  loadingLogout: boolean;
  hasErrorLogout: boolean;
  errorMessageLogout: string;
  // verifyToken
  loadingVerifyToken: boolean;
  hasErrorVerifyToken: boolean;
  errorMessageVerifyToken: string;
  // sendVerificationEmail
  loadingSendVerificationEmail: boolean;
  hasErrorSendVerificationEmail: boolean;
  errorMessageSendVerificationEmail: string;
}
