import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import VerifyEmail from './VerifyEmail';
import {
  // sendVerificationEmail - function
  sendVerificationEmail,
  hideSendVerificationEmailError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface VerifyEmailPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'verifyEmail'>;
}

interface VerifyEmailPageState {
  email: string;
  password: string;
  rePassword: string;
}

class VerifyEmailPage extends Component<VerifyEmailPageProps, VerifyEmailPageState> {
  onPressDone = () => {
    // just reload the current page; if email verification was successful, user will be automatically navigated to main screen
    window.location.reload();
  };

  onPressResend = () => {
    const onSuccess = () => {};
    const onError = () => {};
    this.props.sendVerificationEmail(onSuccess, onError);
  };

  render() {
    return (
      <VerifyEmail
        loading={this.props.loadingSendVerificationEmail}
        hasError={this.props.hasErrorSendVerificationEmail}
        errorMessage={this.props.errorMessageSendVerificationEmail}
        onHideError={this.props.hideSendVerificationEmailError}
        onPressDone={this.onPressDone}
        onPressResend={this.onPressResend}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { loadingSendVerificationEmail, hasErrorSendVerificationEmail, errorMessageSendVerificationEmail } = state.auth;
  return { loadingSendVerificationEmail, hasErrorSendVerificationEmail, errorMessageSendVerificationEmail };
};

const mapDispatch = {
  // sendVerificationEmail - function
  sendVerificationEmail,
  hideSendVerificationEmailError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(VerifyEmailPage);
