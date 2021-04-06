import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect, ConnectedProps } from 'react-redux';
import LoginPage from '../screens/Login/Login.page';
import ProjectsPage from '../screens/Projects/Projects.page';
import ProjectPreviewPage from '../screens/ProjectPreview/ProjectPreview.page';
import PagePreviewPage from '../screens/PagePreview/PagePreview.page';
import { StackParamList } from '../types';
import { RootState } from '../redux/store';

const Stack = createStackNavigator<StackParamList>();

type RouterPropsFromRedux = ConnectedProps<typeof connector>;

interface RouterProps extends RouterPropsFromRedux {}

function Router(props: RouterProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.signedIn ? (
          <>
            <Stack.Screen name='projects' options={{ title: 'Projects' }} component={ProjectsPage} />
            <Stack.Screen name='projectPreview' options={{ title: 'Project preview' }} component={ProjectPreviewPage} />
            <Stack.Screen name='pagePreview' options={{ title: 'Page preview' }} component={PagePreviewPage} />
          </>
        ) : (
          <Stack.Screen name='login' options={{ title: 'Login' }} component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state: RootState) => {
  const { signedIn } = state.user;
  return { signedIn };
};

const connector = connect(mapStateToProps, {});

export default connector(Router);
