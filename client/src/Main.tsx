import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './Router/Router';
// redux store
import { store } from './redux/store';
import { verifyToken, hideVerifyTokenError, setUser } from './redux/actions';
import { configAxios } from './utils/axios';
import { UserType } from './types';

interface MainProps {}

interface MainState {
  resolved: boolean;
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    configAxios();
    this.state = {
      resolved: false,
    };
  }

  componentDidMount() {
    const { token } = store.getState().user;
    if (token.access_token) {
      this._verifyToken();
    } else {
      store.dispatch(setUser({ signedIn: false }));
      this._showRouter();
    }
  }

  _verifyToken = () => {
    const onSuccess = (user: UserType) => {
      store.dispatch(setUser({ signedIn: true, user }));
      this._showRouter();
    };
    const onError = (errMessage: string) => {
      console.log('verifyToken error: ' + errMessage);
      store.dispatch(hideVerifyTokenError());
      store.dispatch(setUser({ signedIn: false }));
      this._showRouter();
    };
    // @ts-ignore
    store.dispatch(verifyToken(onSuccess, onError));
  };

  _showRouter = () => this.setState({ resolved: true });

  render() {
    return <Provider store={store}>{this.state.resolved ? <Router /> : null}</Provider>;
  }
}

export default Main;
