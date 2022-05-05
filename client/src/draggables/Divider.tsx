import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Divider as RNEDivider } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps } from '../constants';
import { getActualProps, sortObjectByKeys } from '../utils/helpers';
import { Prop } from '../types';

const viewStyle = sortObjectByKeys({ ...layoutProps, ...viewStyleProps });

const textStyle = sortObjectByKeys({
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
  color: textStyleProps.color,
  inset: {
    name: 'Inset',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  insetType: {
    name: 'Inset type',
    optional: true,
    value: undefined,
    shownValue: 'left',
    oldValue: 'left',
    oldShownValue: 'left',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'middle', label: 'Middle' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
    },
  },
  orientation: {
    name: 'Orientation',
    optional: true,
    value: undefined,
    shownValue: 'horizontal',
    oldValue: 'horizontal',
    oldShownValue: 'horizontal',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ],
    },
  },
  style: {
    name: 'Style',
    subprops: { ...viewStyle },
  },
  subHeader: {
    name: 'Sub Header',
    optional: true,
    value: undefined,
    shownValue: 'Hi!',
    oldValue: 'Hi!',
    oldShownValue: 'Hi!',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  subHeaderStyle: {
    name: 'Sub Header Style',
    subprops: { ...textStyle },
  },
  width: {
    name: 'Width',
    optional: true,
    value: undefined,
    shownValue: 100,
    oldValue: 100,
    oldShownValue: 100,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 0,
      maximumValue: 1000,
    },
  },
};

export function Divider(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);
  return (
    <TouchableOpacity ref={Platform.OS === 'web' ? ref => connect(drag(ref as any)) : undefined}>
      <RNEDivider {...actualProps} />
    </TouchableOpacity>
  );
}

// @ts-ignore
Divider.craft = {
  props: _.cloneDeep(defaultTextProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Divider.template = `import React from 'react';
import { Divider as RNEDivider } from 'react-native-elements';

export function Divider(props) {
  return <RNEDivider {...props} />;
}
`;
