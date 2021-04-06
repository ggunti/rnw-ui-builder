import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Login from './Login';
import {
  setUser,
  // login - function
  login,
  hideLoginError,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { StackParamList, UserType, TokenType } from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface LoginPageProps extends PropsFromRedux {
  navigation: StackNavigationProp<StackParamList, 'login'>;
}

interface LoginPageState {
  email: string;
  password: string;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  state = {
    email: '',
    password: '',
  };

  onPressLogin = () => {
    const { email, password } = this.state;
    const onSuccess = (user: UserType, token: TokenType) => this.props.setUser({ user, token, signedIn: true });
    this.props.login({ email, password }, onSuccess);
  };

  render() {
    return (
      <Login
        loading={this.props.loadingLogin}
        hasError={this.props.hasErrorLogin}
        errorMessage={this.props.errorMessageLogin}
        onHideError={this.props.hideLoginError}
        email={this.state.email}
        setEmail={(email) => this.setState({ email })}
        password={this.state.password}
        setPassword={(password) => this.setState({ password })}
        onPressLogin={this.onPressLogin}
        onPressSignup={() => this.props.navigation.navigate('signup')}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { loadingLogin, hasErrorLogin, errorMessageLogin } = state.auth;
  return { loadingLogin, hasErrorLogin, errorMessageLogin };
};

const mapDispatch = {
  setUser,
  // login - function
  login,
  hideLoginError,
};

const connector = connect(mapStateToProps, mapDispatch);

export default connector(LoginPage);
