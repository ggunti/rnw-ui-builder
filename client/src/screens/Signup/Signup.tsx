import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Layout } from '../../common';

interface SignupProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rePassword: string;
  setRePassword: (rePassword: string) => void;
  onPressSignup: () => void;
  onPressLogin: () => void;
}

export default function Signup(props: SignupProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      <View style={styles.container}>
        <Input placeholder='Email' value={props.email} onChangeText={props.setEmail} />
        <Input secureTextEntry placeholder='Password' value={props.password} onChangeText={props.setPassword} />
        <Input
          secureTextEntry
          placeholder='Confirm password'
          value={props.rePassword}
          onChangeText={props.setRePassword}
        />
        <View style={styles.row}>
          <Button containerStyle={styles.signupContainer} title='Sign up' onPress={props.onPressSignup} />
          <Button type='outline' title='Login' onPress={props.onPressLogin} />
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
  signupContainer: {
    marginRight: 20,
  },
});
