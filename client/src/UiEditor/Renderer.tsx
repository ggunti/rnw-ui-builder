import React, { CSSProperties } from 'react';
import { Input, Slider, CheckBox } from 'react-native-elements';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { ColorPicker, Dropdown, Expandable } from '../common';
import { isBasicProp } from '../utils/helpers';
import { BasicProp, NestedProp, Prop } from '../types';

function RenderBasicProp({ pKey, prop }: { pKey: string; prop: BasicProp }) {
  const {
    actions: { setProp },
  } = useNode();

  return (
    <div style={styles.row}>
      {prop.optional && (
        <input
          checked={prop.value !== undefined}
          type='checkbox'
          onChange={e => {
            if (e.target.checked) {
              setProp(props => _.set(props, pKey, { ...prop, value: prop.oldValue, shownValue: prop.oldShownValue }));
            } else {
              setProp(props =>
                _.set(props, pKey, { ...prop, oldValue: prop.value, oldShownValue: prop.shownValue, value: undefined }),
              );
            }
          }}
        />
      )}
      <p style={styles.name}>{prop.name}</p>
      {prop.value !== undefined && (
        <>
          {prop.selectorType === 'input' && (
            <Input
              {...prop.selectorProps}
              containerStyle={styles.flex as any}
              value={prop.shownValue as string}
              onChangeText={value => setProp(props => _.set(props, pKey, { ...prop, value, shownValue: value }))}
            />
          )}
          {prop.selectorType === 'slider' && (
            <Slider
              {...prop.selectorProps}
              style={styles.flex as any}
              value={prop.shownValue as number}
              onValueChange={value => setProp(props => _.set(props, pKey, { ...prop, value, shownValue: value }))}
            />
          )}
          {prop.selectorType === 'colorPicker' && (
            <ColorPicker
              color={prop.shownValue as string}
              onChange={value =>
                setProp(props => _.set(props, pKey, { ...prop, value: value.hex, shownValue: value.hex }))
              }
            />
          )}
          {prop.selectorType === 'checkBox' && (
            <CheckBox
              checked={prop.shownValue as boolean}
              onPress={() =>
                setProp(props => _.set(props, pKey, { ...prop, value: !prop.value, shownValue: !prop.value }))
              }
            />
          )}
          {prop.selectorType === 'dropDown' && (
            // @ts-ignore
            <Dropdown
              {...prop.selectorProps}
              style={styles.flex}
              currentValue={prop.shownValue as string}
              onChange={value => setProp(props => _.set(props, pKey, { ...prop, value, shownValue: value }))}
            />
          )}
        </>
      )}
    </div>
  );
}

function RenderNestedProp({ pKey, prop }: { pKey: string; prop: NestedProp }) {
  const {
    actions: { setProp },
  } = useNode();

  return (
    <Expandable
      title={prop.name}
      isExpanded={prop.isExpanded}
      toggleIsExpanded={() => setProp(props => _.set(props, pKey, { ...prop, isExpanded: !prop.isExpanded }))}
    >
      {_.map(prop.subprops, (subprop, baseKey) => (
        <RenderProp key={`${pKey}.subprops.${baseKey}`} pKey={`${pKey}.subprops.${baseKey}`} prop={subprop} />
      ))}
    </Expandable>
  );
}

function RenderProp({ pKey, prop }: { pKey: string; prop: Prop }) {
  if (isBasicProp(prop)) {
    return <RenderBasicProp pKey={pKey} prop={prop as BasicProp} />;
  } else {
    return <RenderNestedProp pKey={pKey} prop={prop as NestedProp} />;
  }
}

export function Renderer() {
  const { nodeProps } = useNode(node => ({ nodeProps: node.data.props }));
  return (
    <div>
      {_.map(nodeProps, (prop, pKey) => (
        <RenderProp key={pKey} pKey={pKey} prop={prop} />
      ))}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    marginRight: 10,
  },
  flex: {
    flex: 1,
  },
};
