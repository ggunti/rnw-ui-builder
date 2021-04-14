import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Text as RNEText } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps } from '../constants';
import { getActualProps, sortObjectByKeys } from '../utils/helpers';
import { Prop } from '../types';

const style = sortObjectByKeys({
  ...textStyleProps,
  backgroundColor: viewStyleProps.backgroundColor,
  margin: layoutProps.margin,
  marginLeft: layoutProps.marginLeft,
  marginRight: layoutProps.marginRight,
  marginBottom: layoutProps.marginBottom,
  marginTop: layoutProps.marginTop,
  padding: layoutProps.padding,
  paddingLeft: layoutProps.paddingLeft,
  paddingRight: layoutProps.paddingRight,
  paddingBottom: layoutProps.paddingBottom,
  paddingTop: layoutProps.paddingTop,
  flex: layoutProps.flex,
});

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
    subprops: { ...style },
  },
  adjustsFontSizeToFit: {
    name: 'Adjusts font size to fit',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  allowFontScaling: {
    name: 'Allow font scaling',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  ellipsizeMode: {
    name: 'Ellipsize mode',
    optional: true,
    value: undefined,
    shownValue: 'tail',
    oldValue: 'tail',
    oldShownValue: 'tail',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'head', label: 'Head' },
        { value: 'middle', label: 'Middle' },
        { value: 'tail', label: 'Tail' },
        { value: 'clip', label: 'Clip' },
      ],
    },
  },
  maxFontSizeMultiplier: {
    name: 'Max font size multiplier',
    optional: true,
    value: undefined,
    shownValue: 0,
    oldValue: 0,
    oldShownValue: 0,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 0,
      maximumValue: 100,
    },
  },
  // iOS only
  minimumFontScale: {
    name: 'Minimum font scale',
    optional: true,
    value: undefined,
    shownValue: 0.5,
    oldValue: 0.5,
    oldShownValue: 0.5,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 0.01,
      minimumValue: 0.01,
      maximumValue: 1,
    },
  },
  numberOfLines: {
    name: 'Number of lines',
    optional: true,
    value: undefined,
    shownValue: 0,
    oldValue: 0,
    oldShownValue: 0,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 0,
      maximumValue: 100,
    },
  },
  selectable: {
    name: 'Selectable',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  // android only
  selectionColor: {
    name: 'Selection color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
  // iOS only
  suppressHighlighting: {
    name: 'Suppress highlighting',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  // android only
  textBreakStrategy: {
    name: 'Text break strategy',
    optional: true,
    value: undefined,
    shownValue: 'highQuality',
    oldValue: 'highQuality',
    oldShownValue: 'highQuality',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'highQuality', label: 'High quality' },
        { value: 'balanced', label: 'Balanced' },
      ],
    },
  },
  // h1: {
  //   name: 'H1',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // h1Style: {
  //   name: 'H1 style',
  //   subprops: { ...style },
  // },
  // h2: {
  //   name: 'H2',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // h2Style: {
  //   name: 'H2 style',
  //   subprops: { ...style },
  // },
  // h3: {
  //   name: 'H3',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // h3Style: {
  //   name: 'H3 style',
  //   subprops: { ...style },
  // },
  // h4: {
  //   name: 'H4',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // h4Style: {
  //   name: 'H4 style',
  //   subprops: { ...style },
  // },
};

export function Text(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);
  const { text } = actualProps;

  return (
    <TouchableOpacity ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined}>
      <RNEText {...actualProps}>{text}</RNEText>
    </TouchableOpacity>
  );
}

// @ts-ignore
Text.craft = {
  props: _.cloneDeep(defaultTextProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Text.template = `import React from 'react';
import { Text as RNEText } from 'react-native-elements';

export function Text(props) {
  return <RNEText {...props} />;
}
`;
