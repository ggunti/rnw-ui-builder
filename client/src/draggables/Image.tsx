import React from 'react';
import { View, Platform } from 'react-native';
import { Image as RNEImage } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, imageStyleProps } from '../constants';
import { getActualProps } from '../utils/helpers';
import { Prop } from '../types';

const defaultImageProps: Record<string, Prop> = {
  source: {
    name: 'Source',
    subprops: {
      uri: {
        name: 'Uri',
        optional: false,
        value: 'https://picsum.photos/100',
        shownValue: 'https://picsum.photos/100',
        oldValue: 'https://picsum.photos/100',
        oldShownValue: 'https://picsum.photos/100',
        renderType: 'string',
        selectorType: 'input',
        selectorProps: {},
      },
    },
  },
  style: {
    name: 'Style',
    subprops: {
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
      height: {
        name: 'Height',
        optional: true,
        value: 100,
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
      ...imageStyleProps,
    },
  },
  containerStyle: {
    name: 'Container style',
    subprops: layoutProps,
  },
  transition: {
    name: 'Transition',
    optional: true,
    value: undefined,
    shownValue: true,
    oldValue: true,
    oldShownValue: true,
    renderType: 'boolean',
    selectorType: 'checkBox',
    selectorProps: {},
  },
  transitionDuration: {
    name: 'Transition duration',
    optional: true,
    value: undefined,
    shownValue: 360,
    oldValue: 360,
    oldShownValue: 360,
    renderType: 'number',
    selectorType: 'slider',
    selectorProps: {
      step: 1,
      minimumValue: 0,
      maximumValue: 1000,
    },
  },
};

export function Image(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props) as any;

  return (
    <View ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined}>
      <RNEImage {...actualProps} />
    </View>
  );
}

Image.craft = {
  props: _.cloneDeep(defaultImageProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Image.template = `import React from 'react';
import { Image as RNEImage } from 'react-native-elements';

export function Image(props) {
  return <RNEImage {...props} />;
}
`;
