import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Layout } from '../../common';

interface VerifyEmailProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  onPressDone: () => void;
  onPressResend: () => void;
}

export default function VerifyEmail(props: VerifyEmailProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Please verify your email address. We sent you a verification email at sign up.</Text>
        <View style={styles.row}>
          <Button containerStyle={styles.doneContainer} title='Done' onPress={props.onPressDone} />
          <Button type='outline' title='Resend verification email' onPress={props.onPressResend} />
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
  text: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneContainer: {
    marginRight: 20,
  },
});
