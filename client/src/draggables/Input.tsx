import React from 'react';
import { View, Platform } from 'react-native';
import { Input as RNInput } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps } from '../constants';
import { getActualProps } from '../utils/helpers';
import { Prop } from '../types';

const defaultInputProps: Record<string, Prop> = {
  placeholder: {
    name: 'Placeholder',
    optional: true,
    value: undefined,
    shownValue: '',
    oldValue: '',
    oldShownValue: '',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  label: {
    name: 'Label',
    optional: true,
    value: undefined,
    shownValue: '',
    oldValue: '',
    oldShownValue: '',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  errorMessage: {
    name: 'Error message',
    optional: true,
    value: undefined,
    shownValue: '',
    oldValue: '',
    oldShownValue: '',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  renderErrorMessage: {
    name: 'Render error message',
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
  leftIcon: {
    name: 'Left icon',
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
  rightIcon: {
    name: 'Right icon',
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
  labelStyle: {
    name: 'Label style',
    subprops: {
      color: textStyleProps.color,
      fontSize: textStyleProps.fontSize,
      fontWeight: textStyleProps.fontWeight,
      fontStyle: textStyleProps.fontStyle,
      textDecorationLine: textStyleProps.textDecorationLine,
    },
  },
  disabledInputStyle: {
    name: 'Disabled input style',
    subprops: {
      backgroundColor: viewStyleProps.backgroundColor,
      borderWidth: viewStyleProps.borderWidth,
      borderColor: viewStyleProps.borderColor,
      borderRadius: viewStyleProps.borderRadius,
      borderStyle: viewStyleProps.borderStyle,
    },
  },
  inputStyle: {
    name: 'Input style',
    subprops: {
      backgroundColor: viewStyleProps.backgroundColor,
      borderWidth: viewStyleProps.borderWidth,
      borderColor: viewStyleProps.borderColor,
      borderRadius: viewStyleProps.borderRadius,
      borderStyle: viewStyleProps.borderStyle,
      padding: layoutProps.padding,
      paddingTop: layoutProps.paddingTop,
      paddingLeft: layoutProps.paddingLeft,
      paddingBottom: layoutProps.paddingBottom,
      paddingRight: layoutProps.paddingRight,
    },
  },
  inputContainerStyle: {
    name: 'Input container style',
    subprops: {
      borderBottomWidth: viewStyleProps.borderBottomWidth,
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

export function Input(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);

  return (
    <View ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined}>
      <RNInput {...actualProps} />
    </View>
  );
}

Input.craft = {
  props: _.cloneDeep(defaultInputProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Input.template = `import React from 'react';
import { Input as RNEInput } from 'react-native-elements';

export function Input(props) {
  return <RNEInput {...props} />;
}
`;
