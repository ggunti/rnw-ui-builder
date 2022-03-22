import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Layout } from '../../common';

export default function Splash() {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon name='build' type='material' containerStyle={styles.iconContainer} />
          <Text style={styles.text}>RNW UI Builder</Text>
        </View>
        <ActivityIndicator animating={true} color='black' />
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
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});
