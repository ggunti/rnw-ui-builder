import _ from 'lodash';
// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars';
import { Node } from '../types';

export function getComponentNames(nodes: { [key: string]: Node }) {
  const uniqueNodeNames = new Set<string>();
  _.forEach(nodes, (val) => uniqueNodeNames.add(val.type.resolvedName));
  return Array.from(uniqueNodeNames);
}

export function generateComponent(content: string) {
  const template = Handlebars.compile(content);
  return template() as string;
}
