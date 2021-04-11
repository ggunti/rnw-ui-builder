import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect, ConnectedProps } from 'react-redux';
import {
  resetUser,
  // auth
  logout,
} from '../redux/actions';
import LoginPage from '../screens/Login/Login.page';
import ProjectsPage from '../screens/Projects/Projects.page';
import ProjectPreviewPage from '../screens/ProjectPreview/ProjectPreview.page';
import PagePreviewPage from '../screens/PagePreview/PagePreview.page';
import { StackParamList } from '../types';
import { RootState } from '../redux/store';

const Stack = createStackNavigator<StackParamList>();

type RouterPropsFromRedux = ConnectedProps<typeof connector>;

interface RouterProps extends RouterPropsFromRedux {}

class Router extends Component<RouterProps> {
  componentDidMount() {
    SplashScreen.hide();
  }

  onPressLogout = () => {
    const onSuccess = () => this.props.resetUser();
    const onError = () => Alert.alert('Something went wrong.');
    this.props.logout(onSuccess, onError);
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTitle: (titleProps) => (
              <View style={styles.row}>
                <Icon name='build' type='material' containerStyle={{ marginRight: 5 }} />
                <Text>{titleProps.children}</Text>
              </View>
            ),
            headerRight: () =>
              this.props.signedIn && (
                <Button titleStyle={styles.logoutTitle} type='clear' title='Log out' onPress={this.onPressLogout} />
              ),
          }}
        >
          {this.props.signedIn ? (
            <>
              <Stack.Screen name='projects' options={{ title: 'Projects' }} component={ProjectsPage} />
              <Stack.Screen
                name='projectPreview'
                options={{ title: 'Project preview' }}
                component={ProjectPreviewPage}
              />
              <Stack.Screen name='pagePreview' options={{ title: 'Page preview' }} component={PagePreviewPage} />
            </>
          ) : (
            <Stack.Screen name='login' options={{ title: 'Login' }} component={LoginPage} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutTitle: {
    fontSize: 16,
  },
});

const mapStateToProps = (state: RootState) => {
  const { signedIn } = state.user;
  return { signedIn };
};

const connector = connect(mapStateToProps, {
  resetUser,
  // auth
  logout,
});

export default connector(Router);
