import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEditor, Frame, Element } from '@craftjs/core';
import { Container } from '../draggables';

interface UiPreviewProps {
  json?: string;
  phoneWidth: number;
}

export function UiPreview({ json, phoneWidth }: UiPreviewProps) {
  const { connectors } = useEditor();
  return (
    <View ref={(ref) => connectors.select(connectors.hover(ref as any, null), null)} style={styles.container}>
      <View style={[styles.phoneContainer, { width: phoneWidth }]}>
        <Frame data={json}>
          <Element is={Container} canvas />
        </Frame>
      </View>
    </View>
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
