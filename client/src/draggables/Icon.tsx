import React from 'react';
import { View, Platform } from 'react-native';
import { Icon as RNEIcon, IconProps } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { iconProps } from '../constants';
import { getActualProps } from '../utils/helpers';
import { Prop } from '../types';

const defaultIconProps: Record<string, Prop> = iconProps;

export function Icon(props: Record<string, Prop>) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props) as IconProps;

  return (
    <View ref={Platform.OS === 'web' ? ref => connect(drag(ref as any)) : undefined}>
      <RNEIcon {...actualProps} />
    </View>
  );
}

Icon.craft = {
  props: _.cloneDeep(defaultIconProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

Icon.template = `import React from 'react';
import { Icon as RNEIcon } from 'react-native-elements';

export function Icon(props) {
  return <RNEIcon {...props} />;
}
`;
