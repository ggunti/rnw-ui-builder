import _ from 'lodash';
import { Prop, BasicProp, NestedProp } from '../types';

export function sortObjectByKeys<T>(obj: Record<string, T>) {
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, T>>((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

// get the props which will be passed to the user component (View, Text, Button, etc)
export function getActualProps(props: Record<string, Prop>) {
  const actualProps: Record<string, any> = {};
  const nonDefaultProps = getNonDefaultProps(props);
  _.forEach(nonDefaultProps, (p, key) => {
    if (isBasicProp(p)) {
      actualProps[key] = (p as BasicProp).value;
    } else {
      actualProps[key] = getActualProps((p as NestedProp).subprops);
    }
  });
  return actualProps;
}

// get only the props which are not empty object, and which value is not undefined
export function getNonDefaultProps(props: Record<string, Prop>) {
  const nonDefaultProps: Record<string, Prop> = {};
  _.forEach(props, (p, key) => {
    // sometimes we have children = undefined
    if (p) {
      if (isBasicProp(p)) {
        if ((p as BasicProp).value !== undefined) {
          nonDefaultProps[key] = p;
        }
      } else {
        const nonDefaultSubprops = getNonDefaultProps((p as NestedProp).subprops);
        if (!_.isEmpty(nonDefaultSubprops)) {
          nonDefaultProps[key] = { name: p.name, subprops: nonDefaultSubprops };
        }
      }
    }
  });
  return nonDefaultProps;
}

// returns true if the prop passed as parameter is a BasicProp; otherwise returns false
export function isBasicProp(prop: Prop) {
  if (prop.hasOwnProperty('selectorType')) {
    return true;
  }
  return false;
}
