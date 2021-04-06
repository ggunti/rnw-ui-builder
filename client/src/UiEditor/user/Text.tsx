import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Text as RNText } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../common';
import { layoutProps, textStyleProps, viewStyleProps } from '../constants';
import { getActualProps } from '../../utils/helpers';
import { Prop } from '../../types';

const defaultTextProps: Record<string, Prop> = {
  text: {
    name: 'Text',
    optional: false,
    value: 'Hi!',
    shownValue: 'Hi!',
    oldValue: 'Hi!',
    oldShownValue: 'Hi!',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  style: {
    name: 'Style',
    subprops: {
      color: textStyleProps.color,
      fontSize: textStyleProps.fontSize,
      fontWeight: textStyleProps.fontWeight,
      fontStyle: textStyleProps.fontStyle,
      textDecorationLine: textStyleProps.textDecorationLine,
      textAlign: textStyleProps.textAlign,
      backgroundColor: viewStyleProps.backgroundColor,
      borderWidth: viewStyleProps.borderWidth,
      borderColor: viewStyleProps.borderColor,
      borderRadius: viewStyleProps.borderRadius,
      borderStyle: viewStyleProps.borderStyle,
      padding: layoutProps.padding,
      margin: layoutProps.margin,
      marginTop: layoutProps.marginTop,
      marginLeft: layoutProps.marginLeft,
      marginBottom: layoutProps.marginBottom,
      marginRight: layoutProps.marginRight,
    },
  },
};

export function Text(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);
  const { text } = actualProps;

  return (
    <TouchableOpacity ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined}>
      <RNText {...actualProps}>{text}</RNText>
    </TouchableOpacity>
  );
}

// @ts-ignore
Text.craft = {
  props: _.cloneDeep(defaultTextProps),
  related: {
    uiSettings: Renderer,
  },
};

Text.template = `import React from 'react';
import { Text as RNEText } from 'react-native-elements';

export function Text(props) {
  return <RNEText {...props} />;
}
`;
