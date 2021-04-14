import React from 'react';
import { View, Platform } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps, iconProps } from '../constants';
import { getActualProps, sortObjectByKeys } from '../utils/helpers';
import { Prop } from '../types';

const defaultButtonProps: Record<string, Prop> = {
  title: {
    name: 'Title',
    optional: false,
    value: 'Click me',
    shownValue: 'Click me',
    oldValue: 'Click me',
    oldShownValue: 'Click me',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  type: {
    name: 'Type',
    optional: true,
    value: undefined,
    shownValue: 'solid',
    oldValue: 'solid',
    oldShownValue: 'solid',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'clear', label: 'Clear' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  },
  disabled: {
    name: 'Disabled',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  loading: {
    name: 'Loading',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  raised: {
    name: 'Raised',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  iconRight: {
    name: 'Icon right',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  icon: {
    name: 'Icon',
    subprops: {
      name: iconProps.name,
      type: iconProps.type,
      size: iconProps.size,
      color: iconProps.color,
      containerStyle: iconProps.containerStyle,
    },
  },
  buttonStyle: {
    name: 'Button style',
    subprops: sortObjectByKeys({ ...layoutProps, ...viewStyleProps }),
  },
  titleStyle: {
    name: 'Title style',
    subprops: textStyleProps,
  },
  containerStyle: {
    name: 'Container style',
    subprops: layoutProps,
  },
  disabledStyle: {
    name: 'Disabled style',
    subprops: sortObjectByKeys({ ...layoutProps, ...viewStyleProps }),
  },
  disabledTitleStyle: {
    name: 'Disabled title style',
    subprops: textStyleProps,
  },
  loadingProps: {
    name: 'Loading props',
    subprops: {
      color: textStyleProps.color,
      size: {
        name: 'Size',
        optional: true,
        value: undefined,
        shownValue: 'small',
        oldValue: 'small',
        oldShownValue: 'small',
        renderType: 'string',
        selectorType: 'dropDown',
        selectorProps: {
          options: [
            { value: 'small', label: 'Small' },
            { value: 'large', label: 'Large' },
          ],
        },
      },
    },
  },
};

export function Button(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);

  return (
    <View ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined}>
      <RNEButton {...actualProps} />
    </View>
  );
}

Button.craft = {
  props: _.cloneDeep(defaultButtonProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Button.template = `import React from 'react';
import { Button as RNEButton } from 'react-native-elements';

export function Button(props) {
  return <RNEButton {...props} />;
}
`;
