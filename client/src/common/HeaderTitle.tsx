import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, Text } from 'react-native-elements';
import { StackHeaderTitleProps } from '@react-navigation/stack';

interface HeaderTitleProps extends StackHeaderTitleProps {
  signedIn: boolean;
  isVerified: boolean;
  email: string;
  onPressLogout: () => void;
}

export function HeaderTitle(props: HeaderTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name='build' type='material' containerStyle={{ marginRight: 5 }} />
        <Text>
          <Text style={styles.boldText}>RNW App Builder</Text> {'>'} {props.children}
        </Text>
      </View>
      {props.signedIn && (
        <View style={styles.row}>
          {!props.isVerified && (
            <Text>
              [<Text style={styles.errorText}>Unverified</Text>]{' '}
            </Text>
          )}
          <Text>{props.email}</Text>
          <Button titleStyle={styles.logoutTitle} type='clear' title='Log out' onPress={props.onPressLogout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutTitle: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
  },
  errorText: {
    color: 'red',
  },
});
