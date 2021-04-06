import React from 'react';
import { View, Platform } from 'react-native';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../common';
import { layoutProps, viewStyleProps } from '../constants';
import { getActualProps } from '../../utils/helpers';
import { Prop } from '../../types';

const defaultContainerProps: Record<string, Prop> = {
  style: {
    name: 'Style',
    subprops: {
      padding: {
        ...layoutProps.padding,
        value: 20,
        shownValue: 20,
      },
      backgroundColor: viewStyleProps.backgroundColor,
      flexDirection: layoutProps.flexDirection,
    },
  },
};

export function Container(props: any) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);

  return (
    <View ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined} {...actualProps}>
      {props.children}
    </View>
  );
}

Container.craft = {
  props: _.cloneDeep(defaultContainerProps),
  related: {
    uiSettings: Renderer,
  },
};

Container.template = `import React from 'react';
import { View } from 'react-native';

export function Container(props) {
  return <View {...props}>{props.children}</View>;
}
`;
