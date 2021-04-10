import React from 'react';
import { View, Platform } from 'react-native';
import { Button as RNButton } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps } from '../constants';
import { getActualProps } from '../utils/helpers';
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
      type: {
        name: 'Type',
        optional: true,
        value: undefined,
        shownValue: 'material',
        oldValue: 'material',
        oldShownValue: 'material',
        renderType: 'string',
        selectorType: 'input',
        selectorProps: {},
      },
      name: {
        name: 'Name',
        optional: true,
        value: undefined,
        shownValue: 'touch-app',
        oldValue: 'touch-app',
        oldShownValue: 'touch-app',
        renderType: 'string',
        selectorType: 'input',
        selectorProps: {},
      },
      color: textStyleProps.color,
      size: {
        name: 'Size',
        optional: true,
        value: undefined,
        shownValue: 14,
        oldValue: 14,
        oldShownValue: 14,
        renderType: 'number',
        selectorType: 'slider',
        selectorProps: {
          step: 1,
          minimumValue: 2,
          maximumValue: 50,
        },
      },
    },
  },
  buttonStyle: {
    name: 'Button style',
    subprops: {
      backgroundColor: viewStyleProps.backgroundColor,
      borderWidth: viewStyleProps.borderWidth,
      borderColor: viewStyleProps.borderColor,
      borderRadius: viewStyleProps.borderRadius,
      borderStyle: viewStyleProps.borderStyle,
      padding: layoutProps.padding,
    },
  },
  titleStyle: {
    name: 'Title style',
    subprops: {
      color: textStyleProps.color,
      fontSize: textStyleProps.fontSize,
      fontWeight: textStyleProps.fontWeight,
      fontStyle: textStyleProps.fontStyle,
      textDecorationLine: textStyleProps.textDecorationLine,
    },
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
  disabledStyle: {
    name: 'Disabled style',
    subprops: {
      backgroundColor: viewStyleProps.backgroundColor,
      borderWidth: viewStyleProps.borderWidth,
      borderColor: viewStyleProps.borderColor,
      borderRadius: viewStyleProps.borderRadius,
      borderStyle: viewStyleProps.borderStyle,
    },
  },
  disabledTitleStyle: {
    name: 'Disabled title style',
    subprops: {
      color: textStyleProps.color,
      fontSize: textStyleProps.fontSize,
      fontWeight: textStyleProps.fontWeight,
      fontStyle: textStyleProps.fontStyle,
      textDecorationLine: textStyleProps.textDecorationLine,
    },
  },
  containerStyle: {
    name: 'Container style',
    subprops: {
      flex: layoutProps.flex,
      alignItems: layoutProps.alignItems,
      justifyContent: layoutProps.justifyContent,
      margin: layoutProps.margin,
      marginTop: layoutProps.marginTop,
      marginLeft: layoutProps.marginLeft,
      marginBottom: layoutProps.marginBottom,
      marginRight: layoutProps.marginRight,
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
      <RNButton {...actualProps} />
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
