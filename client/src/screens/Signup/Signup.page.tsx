import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Signup from './Signup';
import {
  // signup - function
  signup,
  hideSignupError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface SignupPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'signup'>;
}

interface SignupPageState {
  email: string;
  password: string;
  rePassword: string;
}

class SignupPage extends Component<SignupPageProps, SignupPageState> {
  state = {
    email: '',
    password: '',
    rePassword: '',
  };

  onPressSignup = () => {
    const { email, password, rePassword } = this.state;
    if (password === rePassword) {
      const onSuccess = () => this.props.navigation.navigate('login');
      const onError = () => {};
      this.props.signup({ email, password }, onSuccess, onError);
    } else {
      alert('Invalid password confirmation.');
    }
  };

  render() {
    return (
      <Signup
        loading={this.props.loadingSignup}
        hasError={this.props.hasErrorSignup}
        errorMessage={this.props.errorMessageSignup}
        onHideError={this.props.hideSignupError}
        email={this.state.email}
        setEmail={(email) => this.setState({ email })}
        password={this.state.password}
        setPassword={(password) => this.setState({ password })}
        rePassword={this.state.rePassword}
        setRePassword={(rePassword) => this.setState({ rePassword })}
        onPressSignup={this.onPressSignup}
        onPressLogin={() => this.props.navigation.navigate('login')}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { loadingSignup, hasErrorSignup, errorMessageSignup } = state.auth;
  return { loadingSignup, hasErrorSignup, errorMessageSignup };
};

const mapDispatch = {
  // signup - function
  signup,
  hideSignupError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(SignupPage);
