import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text as RNText, Icon } from 'react-native-elements';
import { Element, useEditor } from '@craftjs/core';
import { Container, Text, Button, Input } from '../draggables';

interface ToolboxElementProps {
  title: string;
  icon: { name: string; type: string };
}

const ToolboxElement = React.forwardRef((props: ToolboxElementProps, ref: any) => (
  <TouchableOpacity ref={ref} style={elementStyles.container}>
    <Icon name={props.icon.name} type={props.icon.type} />
    <RNText>{props.title}</RNText>
  </TouchableOpacity>
));

const elementStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    minWidth: 80,
    height: 80,
    margin: 3,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

interface ToolboxProps {}

const Toolbox: React.FC<ToolboxProps> = () => {
  const { connectors } = useEditor();
  return (
    <View style={styles.container}>
      <RNText style={styles.text}>Drag to add</RNText>
      <View style={styles.elementsContainer}>
        <ToolboxElement
          title='Button'
          icon={{ name: 'smart-button', type: 'material' }}
          ref={(ref: any) => connectors.create(ref, <Button />)}
        />
        <ToolboxElement
          title='Text'
          icon={{ name: 'short-text', type: 'material' }}
          ref={(ref) => connectors.create(ref as any, <Text />)}
        />
        <ToolboxElement
          title='Container'
          icon={{ name: 'check-box-outline-blank', type: 'material' }}
          ref={(ref) => connectors.create(ref as any, <Element is={Container} canvas />)}
        />
        <ToolboxElement
          title='Input'
          icon={{ name: 'input', type: 'material' }}
          ref={(ref) => connectors.create(ref as any, <Input />)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 5,
    overflow: 'scroll',
  },
  elementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    margin: 3,
  },
});

export { Toolbox };
