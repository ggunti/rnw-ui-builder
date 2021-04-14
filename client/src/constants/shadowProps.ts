import { Prop } from '../types';

export const shadowProps: Record<string, Prop> = {
  shadowColor: {
    name: 'Shadow color',
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
  shadowOffset: {
    name: 'Shadow offset',
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
  // iOS only
  shadowOpacity: {
    name: 'Shadow opacity',
    optional: true,
    value: undefined,
    shownValue: 0.5,
    oldValue: 0.5,
    oldShownValue: 0.5,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 0.01,
      minimumValue: 0,
      maximumValue: 1,
    },
  },
  // iOS only
  shadowRadius: {
    name: 'Shadow radius',
    optional: true,
    value: undefined,
    shownValue: 5,
    oldValue: 5,
    oldShownValue: 5,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 0,
      maximumValue: 100,
    },
  },
};
