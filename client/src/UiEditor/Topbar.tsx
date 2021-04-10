import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useEditor } from '@craftjs/core';
import { Dropdown } from '../common';
import { PHONE_WIDTHS } from '../constants';

interface TopbarProps {
  pageName: string;
  phoneWidth: number;
  setPhoneWidth: (width: number) => void;
  onPressSave: (serializedJson: string) => void;
  onPressGenerateCode: (serializedJson: string) => void;
}

export function Topbar(props: TopbarProps) {
  const { query } = useEditor();

  return (
    <View style={styles.container}>
      <Text>
        Current page: <Text style={styles.boldText}>{props.pageName}</Text>
      </Text>
      <View style={styles.row}>
        <Text>Device width: </Text>
        <Dropdown
          currentValue={props.phoneWidth.toString()}
          options={PHONE_WIDTHS}
          onChange={(value) => props.setPhoneWidth(parseInt(value, 10))}
        />
      </View>
      <View style={styles.row}>
        <Button
          containerStyle={styles.saveContainer}
          type='outline'
          title='Save'
          onPress={() => props.onPressSave(query.serialize())}
        />
        <Button title='Generate page code' onPress={() => props.onPressGenerateCode(query.serialize())} />
      </View>
    </View>
  );
}

Topbar.defaultProps = {
  onPressSave: () => {},
  onPressGenerateCode: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveContainer: {
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
