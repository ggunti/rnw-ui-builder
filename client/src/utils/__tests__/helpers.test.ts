import 'react-native';
import { sortObjectByKeys, isBasicProp, getNonDefaultProps, getActualProps } from '../helpers';
import { BasicProp, NestedProp } from '../../types';

// sortObjectByKeys
it('given an object with different keys, sortObjectByKeys() sorts it by keys', () => {
  expect(sortObjectByKeys({ c: 1, a: 2, b: 3 })).toStrictEqual({ a: 2, b: 3, c: 1 });
});

// isBasicProp
it('given an object of type BasicProp, isBasicProp() returns true', () => {
  const basicProp: BasicProp = {
    name: '',
    optional: true,
    value: '',
    shownValue: '',
    oldValue: '',
    oldShownValue: '',
    renderType: 'string',
    selectorType: 'input',
    selectorProps: {},
  };
  expect(isBasicProp(basicProp)).toBe(true);
});

it('given an object of type NestedProp, isBasicProp() returns false', () => {
  const nestedProp: NestedProp = {
    name: 'Nested',
    subprops: {},
  };
  expect(isBasicProp(nestedProp)).toBe(false);
});

// getNonDefaultProps
it('given an object of props, getNonDefaultProps() returns only the props that are not empty, and which value is not undefined', () => {
  const o = {
    children: undefined,
    color: {},
    backgroundColor: {
      value: undefined,
    },
    style: {
      name: 'Style',
      subprops: {},
    },
  };
  expect(getNonDefaultProps(o)).toStrictEqual({});
});

it('(2) given an object of props, getNonDefaultProps() returns only the props that are not empty, and which value is not undefined', () => {
  const o = {
    children: undefined,
    color: {},
    style: {
      name: 'Style',
      subprops: {
        borderRadius: {
          name: 'Border radius',
          value: 50,
          selectorType: 'slider',
        },
      },
    },
  };
  expect(getNonDefaultProps(o)).toStrictEqual({
    style: {
      name: 'Style',
      subprops: {
        borderRadius: {
          name: 'Border radius',
          value: 50,
          selectorType: 'slider',
        },
      },
    },
  });
});

// getActualProps
it('given an object of props, getActualProps() returns the props which needs to be passed to the user component', () => {
  const o = {
    children: undefined,
    color: {},
    backgroundColor: {
      value: undefined,
    },
    style: {
      name: 'Style',
      subprops: {},
    },
  };
  expect(getActualProps(o)).toStrictEqual({});
});

it('(2) given an object of props, getActualProps() returns the props which needs to be passed to the user component', () => {
  const o = {
    children: undefined,
    color: {},
    style: {
      name: 'Style',
      subprops: {
        borderRadius: {
          name: 'Border radius',
          value: 50,
          selectorType: 'slider',
        },
      },
    },
  };
  expect(getActualProps(o)).toStrictEqual({
    style: {
      borderRadius: 50,
    },
  });
});
