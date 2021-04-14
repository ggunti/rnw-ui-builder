import React from 'react';
import { View, Platform } from 'react-native';
import { Input as RNInput } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps, textStyleProps, iconProps } from '../constants';
import { getActualProps, sortObjectByKeys } from '../utils/helpers';
import { Prop } from '../types';

const inputStyle = sortObjectByKeys({
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
  minHeight: layoutProps.minHeight,
});

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
  placeholderTextColor: {
    name: 'Placeholder text color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
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
      name: iconProps.name,
      type: iconProps.type,
      size: iconProps.size,
      color: iconProps.color,
      containerStyle: iconProps.containerStyle,
    },
  },
  rightIcon: {
    name: 'Right icon',
    subprops: {
      name: iconProps.name,
      type: iconProps.type,
      size: iconProps.size,
      color: iconProps.color,
      containerStyle: iconProps.containerStyle,
    },
  },
  labelStyle: {
    name: 'Label style',
    subprops: textStyleProps,
  },
  containerStyle: {
    name: 'Container style',
    subprops: layoutProps,
  },
  inputContainerStyle: {
    name: 'Input container style',
    subprops: layoutProps,
  },
  inputStyle: {
    name: 'Input style',
    subprops: inputStyle,
  },
  disabledInputStyle: {
    name: 'Disabled input style',
    subprops: inputStyle,
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
  autoCapitalize: {
    name: 'Autocapitalize',
    optional: true,
    value: undefined,
    shownValue: 'sentences',
    oldValue: 'sentences',
    oldShownValue: 'sentences',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'none', label: 'None' },
        { value: 'sentences', label: 'Sentences' },
        { value: 'words', label: 'Words' },
        { value: 'characters', label: 'Characters' },
      ],
    },
  },
  autoCorrect: {
    name: 'Autocorrect',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  autoFocus: {
    name: 'Autofocus',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  editable: {
    name: 'Editable',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  keyboardType: {
    name: 'Keyboard type',
    optional: true,
    value: undefined,
    shownValue: 'default',
    oldValue: 'default',
    oldShownValue: 'default',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'default', label: 'Default' },
        { value: 'number-pad', label: 'Number-pad' },
        { value: 'decimal-pad', label: 'Decimal-pad' },
        { value: 'numeric', label: 'Numeric' },
        { value: 'email-address', label: 'Email-address' },
        { value: 'phone-pad', label: 'Phone-pad' },
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
  maxLength: {
    name: 'Max length',
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
      maximumValue: 1000,
    },
  },
  multiline: {
    name: 'Multiline',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
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
  returnKeyType: {
    name: 'Return key type',
    optional: true,
    value: undefined,
    shownValue: 'done',
    oldValue: 'done',
    oldShownValue: 'done',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'done', label: 'Done' },
        { value: 'go', label: 'Go' },
        { value: 'next', label: 'Next' },
        { value: 'search', label: 'Search' },
        { value: 'send', label: 'Send' },
      ],
    },
  },
  secureTextEntry: {
    name: 'Secure text entry',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  selectTextOnFocus: {
    name: 'Select text on focus',
    optional: true,
    value: undefined,
    shownValue: false,
    oldValue: false,
    oldShownValue: false,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  showSoftInputOnFocus: {
    name: 'Show soft input on focus',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
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
