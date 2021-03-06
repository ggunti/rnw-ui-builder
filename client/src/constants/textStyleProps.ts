import { Prop } from '../types';

export const textStyleProps: Record<string, Prop> = {
  color: {
    name: 'Color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
  fontFamily: {
    name: 'Font family',
    optional: true,
    value: undefined,
    shownValue: '',
    oldValue: '',
    oldShownValue: '',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  },
  fontSize: {
    name: 'Font size',
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
  fontStyle: {
    name: 'Font style',
    optional: true,
    value: undefined,
    shownValue: 'normal',
    oldValue: 'normal',
    oldShownValue: 'normal',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Italic' },
      ],
    },
  },
  fontWeight: {
    name: 'Font weight',
    optional: true,
    value: undefined,
    shownValue: 'normal',
    oldValue: 'normal',
    oldShownValue: 'normal',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' },
        { value: '100', label: '100' },
        { value: '200', label: '200' },
        { value: '300', label: '300' },
        { value: '400', label: '400' },
        { value: '500', label: '500' },
        { value: '600', label: '600' },
        { value: '700', label: '700' },
        { value: '800', label: '800' },
        { value: '900', label: '900' },
      ],
    },
  },
  // android only
  includeFontPadding: {
    name: 'Include font padding',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  letterSpacing: {
    name: 'Letter spacing',
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
      maximumValue: 30,
    },
  },
  lineHeight: {
    name: 'Line height',
    optional: true,
    value: undefined,
    shownValue: 17,
    oldValue: 17,
    oldShownValue: 17,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 8,
      maximumValue: 100,
    },
  },
  textAlign: {
    name: 'Text align',
    optional: true,
    value: undefined,
    shownValue: 'auto',
    oldValue: 'auto',
    oldShownValue: 'auto',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
        { value: 'center', label: 'Center' },
        { value: 'justify', label: 'Justify' },
      ],
    },
  },
  // android only
  textAlignVertical: {
    name: 'Text align vertical',
    optional: true,
    value: undefined,
    shownValue: 'auto',
    oldValue: 'auto',
    oldShownValue: 'auto',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'center', label: 'Center' },
      ],
    },
  },
  // iOS only
  textDecorationColor: {
    name: 'Text decoration color',
    optional: true,
    value: undefined,
    shownValue: '#ffffff',
    oldValue: '#ffffff',
    oldShownValue: '#ffffff',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
  textDecorationLine: {
    name: 'Text decoration line',
    optional: true,
    value: undefined,
    shownValue: 'none',
    oldValue: 'none',
    oldShownValue: 'none',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' },
        { value: 'line-through', label: 'Line-through' },
        { value: 'underline line-through', label: 'Underline & line-through' },
      ],
    },
  },
  // iOS only
  textDecorationStyle: {
    name: 'Text decoration style',
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
        { value: 'double', label: 'Double' },
        { value: 'dotted', label: 'Dotted' },
        { value: 'dashed', label: 'Dashed' },
      ],
    },
  },
  textShadowColor: {
    name: 'Text shadow color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
  textShadowOffset: {
    name: 'Text shadow offset',
    subprops: {
      width: {
        name: 'Width',
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
          maximumValue: 50,
        },
      },
      height: {
        name: 'Height',
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
          maximumValue: 50,
        },
      },
    },
  },
  textShadowRadius: {
    name: 'Text shadow radius',
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
      maximumValue: 10,
    },
  },
  textTransform: {
    name: 'Text transform',
    optional: true,
    value: undefined,
    shownValue: 'none',
    oldValue: 'none',
    oldShownValue: 'none',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'none', label: 'None' },
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'capitalize', label: 'Capitalize' },
      ],
    },
  },
  // iOS only
  writingDirection: {
    name: 'Writing direction',
    optional: true,
    value: undefined,
    shownValue: 'auto',
    oldValue: 'auto',
    oldShownValue: 'auto',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'ltr', label: 'Left to right' },
        { value: 'rtl', label: 'Right to left' },
      ],
    },
  },
};
