import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { useEditor, Frame, Element } from '@craftjs/core';
import { View } from '../draggables';

interface UiPreviewProps {
  json?: string;
  phoneWidth: number;
}

export function UiPreview({ json, phoneWidth }: UiPreviewProps) {
  const { connectors } = useEditor();
  return (
    <RNView ref={(ref) => connectors.select(connectors.hover(ref as any, null), null)} style={styles.container}>
      <RNView style={[styles.phoneContainer, { width: phoneWidth }]}>
        <Frame data={json}>
          <Element is={View} canvas />
        </Frame>
      </RNView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    paddingTop: 10,
  },
  phoneContainer: {
    // borderColor: HALF_BLACK,
    borderWidth: 1,
    height: 640,
    overflow: 'hidden',
    marginBottom: 15,
  },
});
