import React from 'react';
import { View as RNView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text as RNText, Icon as RNEIcon } from 'react-native-elements';
import { Element, useEditor } from '@craftjs/core';
import { View, Text, Button, Input, Image, Icon } from '../draggables';

interface ToolboxElementProps {
  title: string;
  icon: { name: string; type: string };
}

const ToolboxElement = React.forwardRef((props: ToolboxElementProps, ref: any) => (
  <TouchableOpacity ref={ref} style={elementStyles.container}>
    <RNEIcon name={props.icon.name} type={props.icon.type} />
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
    <RNView style={styles.container}>
      <RNText style={styles.text}>Drag to add</RNText>
      <RNView style={styles.elementsContainer}>
        <ToolboxElement
          title='View'
          icon={{ name: 'check-box-outline-blank', type: 'material' }}
          ref={ref => connectors.create(ref as any, <Element is={View} canvas />)}
        />
        <ToolboxElement
          title='Text'
          icon={{ name: 'short-text', type: 'material' }}
          ref={ref => connectors.create(ref as any, <Text />)}
        />
        <ToolboxElement
          title='Button'
          icon={{ name: 'smart-button', type: 'material' }}
          ref={ref => connectors.create(ref, <Button />)}
        />
        <ToolboxElement
          title='Input'
          icon={{ name: 'input', type: 'material' }}
          ref={ref => connectors.create(ref as any, <Input />)}
        />
        <ToolboxElement
          title='Image'
          icon={{ name: 'image-outline', type: 'material-community' }}
          ref={ref => connectors.create(ref as any, <Image />)}
        />
        <ToolboxElement
          title='Icon'
          icon={{ name: 'emoticon-kiss-outline', type: 'material-community' }}
          ref={ref => connectors.create(ref as any, <Icon />)}
        />
      </RNView>
    </RNView>
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
