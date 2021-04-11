import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Layout } from '../../common';

interface LoginProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onPressLogin: () => void;
  onPressSignup: () => void;
}

// NOTE: we do not use global loading indicator in Login page because it causes infinite loading overlay on mobile; instead we use loading indicator at button level
export default function Login(props: LoginProps) {
  return (
    <Layout hasError={props.hasError} errorMessage={props.errorMessage} onHideError={props.onHideError}>
      <View style={styles.container}>
        <Input placeholder='Email' value={props.email} onChangeText={props.setEmail} />
        <Input secureTextEntry placeholder='Password' value={props.password} onChangeText={props.setPassword} />
        <View style={styles.row}>
          <Button
            containerStyle={styles.loginContainer}
            title='Login'
            loading={props.loading}
            onPress={props.onPressLogin}
          />
          {Platform.OS === 'web' && <Button type='outline' title='Sign up' onPress={props.onPressSignup} />}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContainer: {
    marginRight: 20,
  },
});
