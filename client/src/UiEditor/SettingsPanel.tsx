import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { useEditor } from '@craftjs/core';

interface SettingsPanelProps {}

export const SettingsPanel: React.FC<SettingsPanelProps> = () => {
  const { selected } = useEditor(state => {
    const currentNodeId = state.events.selected;
    let selected;
    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        uiSettings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.uiSettings,
      };
    }
    return { selected };
  });
  return (
    <View style={styles.container}>
      {selected && (
        <View style={styles.innerContainer}>
          <View style={styles.selectedContainer}>
            <Text>Selected</Text>
            <Badge badgeStyle={styles.badge} value={selected.name} />
          </View>
          {selected.uiSettings && React.createElement(selected.uiSettings)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 5,
    overflow: 'scroll',
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
  },
});
