import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect, ConnectedProps } from 'react-redux';
import {
  resetUser,
  // auth
  logout,
} from '../redux/actions';
import { PREFIX } from '../constants';
import { HeaderTitle } from '../common';
import LoginPage from '../screens/Login/Login.page';
import SignupPage from '../screens/Signup/Signup.page';
import VerifyEmailPage from '../screens/VerifyEmail/VerifyEmail.page';
import ProjectsPage from '../screens/Projects/Projects.page';
import ProjectEditorPage from '../screens/ProjectEditor/ProjectEditor.page';
import ProjectPreviewPage from '../screens/ProjectPreview/ProjectPreview.page';
import PagePreviewPage from '../screens/PagePreview/PagePreview.page';
import PageEditorPage from '../screens/PageEditor/PageEditor.page';
import { StackParamList } from '../types';
import { RootState } from '../redux/store';

const Stack = createStackNavigator<StackParamList>();

const linking: LinkingOptions = {
  prefixes: ['http://localhost:8080', 'https://order-software.com/uiBuilder'],
  config: {
    screens: {
      login: PREFIX + 'login',
      signup: PREFIX + 'signup',
      verifyEmail: PREFIX + 'email/verify',
      projects: PREFIX + 'projects',
      projectPreview: {
        path: PREFIX + 'projects/:projectId/preview',
        parse: {
          projectId: projectId => parseInt(projectId, 10),
        },
        stringify: {
          projectId: (projectId: number) => projectId.toString(),
        },
      },
      pagePreview: {
        path: PREFIX + 'projects/:projectId/pages/:pageId/preview',
        parse: {
          projectId: projectId => parseInt(projectId, 10),
          pageId: pageId => parseInt(pageId, 10),
        },
        stringify: {
          projectId: (projectId: number) => projectId.toString(),
          pageId: (pageId: number) => pageId.toString(),
        },
      },
      projectEditor: {
        path: PREFIX + 'projects/:projectId/edit',
        parse: {
          projectId: projectId => parseInt(projectId, 10),
        },
        stringify: {
          projectId: (projectId: number) => projectId.toString(),
        },
      },
      pageEditor: {
        path: PREFIX + 'projects/:projectId/pages/:pageId/edit',
        parse: {
          projectId: projectId => parseInt(projectId, 10),
          pageId: pageId => parseInt(pageId, 10),
        },
        stringify: {
          projectId: (projectId: number) => projectId.toString(),
          pageId: (pageId: number) => pageId.toString(),
        },
      },
    },
  },
};

type RouterPropsFromRedux = ConnectedProps<typeof connector>;

interface RouterProps extends RouterPropsFromRedux {}

class Router extends Component<RouterProps> {
  onPressLogout = () => {
    const onSuccess = () => this.props.resetUser();
    const onError = () => alert('Something went wrong.');
    this.props.logout(onSuccess, onError);
  };

  render() {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerBackImage: ({ tintColor }) => <Icon name='arrow-back' type='material' color={tintColor} />,
            headerTitle: titleProps => (
              <HeaderTitle
                {...titleProps}
                signedIn={this.props.signedIn}
                isVerified={this.props.user.isVerified}
                email={this.props.user.email}
                onPressLogout={this.onPressLogout}
              />
            ),
          }}
        >
          {this.props.signedIn ? (
            <>
              {this.props.user.isVerified ? (
                <>
                  <Stack.Screen name='projects' options={{ title: 'Projects' }} component={ProjectsPage} />
                  <Stack.Screen
                    name='projectPreview'
                    options={{ title: 'Project preview' }}
                    component={ProjectPreviewPage}
                  />
                  <Stack.Screen name='pagePreview' options={{ title: 'Page preview' }} component={PagePreviewPage} />
                  <Stack.Screen
                    name='projectEditor'
                    options={{ title: 'Project editor' }}
                    component={ProjectEditorPage}
                  />
                  <Stack.Screen name='pageEditor' options={{ title: 'Page editor' }} component={PageEditorPage} />
                </>
              ) : (
                <Stack.Screen name='verifyEmail' options={{ title: 'Verify your email' }} component={VerifyEmailPage} />
              )}
            </>
          ) : (
            <>
              <Stack.Screen name='login' options={{ title: 'Login' }} component={LoginPage} />
              <Stack.Screen name='signup' options={{ title: 'Sign up' }} component={SignupPage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { signedIn, user } = state.user;
  return { signedIn, user };
};

const connector = connect(mapStateToProps, {
  resetUser,
  // auth
  logout,
});

export default connector(Router);
