import _ from 'lodash';
// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars';
import { isBasicProp, getNonDefaultProps } from '../utils/helpers';
import { Node, Prop, NestedProp, BasicProp } from '../types';

type ProcessedProp = {
  key: string;
  val: BasicProp | ProcessedProp[];
  isBasicProp: boolean;
};

type NestedNode = { name: string; props: ProcessedProp[]; nodes: NestedNode[] };

function getProcessedProps(nonDefaultProps: Record<string, Prop>): ProcessedProp[] {
  return _.map(nonDefaultProps, (val, key) => {
    if (isBasicProp(val)) {
      return { key, val: val as BasicProp, isBasicProp: true };
    } else {
      return { key, val: getProcessedProps((val as NestedProp).subprops), isBasicProp: false };
    }
  });
}

function getNestedNode(nodes: Record<string, Node>, nodeKey: string): NestedNode {
  const node = nodes[nodeKey];
  return {
    name: node.type.resolvedName,
    props: getProcessedProps(getNonDefaultProps(node.props)),
    nodes: node.nodes.map(childKey => getNestedNode(nodes, childKey)),
  };
}

const PAGE_TEMPLATE = `import React from 'react';
import { {{componentNames}} } from '../common';

export default function {{pageName}}() {
  return (
  {{#nodes}}
    {{> node}}
  {{/nodes}}
  );
}
`;

const NODE_TEMPLATE = `<{{name}}
{{#props}}
  {{> prop}}
{{/props}}
{{#if nodes}}
>
{{/if}}
{{#nodes}}
  {{> node}}
{{/nodes}}
{{#if nodes}}
</{{name}}>
{{/if}}
{{^nodes}}
/>
{{/nodes}}
`;

const PROP_TEMPLATE = `{{#if isBasicProp}}
{{key}}={{{ propValue val true }}}
{{/if}}
{{#unless isBasicProp}}
{{key}}={{ doubleCurly true }}
{{#val}}
  {{> nestedProp}}
{{/val}}
{{ doubleCurly }}
{{/unless}}
`;

const NESTED_PROP_TEMPLATE = `{{#if isBasicProp}}
{{key}}: {{{ propValue val false }}},
{{/if}}
{{#unless isBasicProp}}
{{key}}: {{ curly true }}
{{#val}}
  {{> nestedProp}}
{{/val}}
{{ curly }},
{{/unless}}
`;

export function generatePage(nodes: { [key: string]: Node }): string {
  const nestedNode = getNestedNode(nodes, 'ROOT');
  const view = {
    pageName: 'Page',
    componentNames: function () {
      const uniqueNodeNames = new Set<string>();
      _.forEach(nodes, val => uniqueNodeNames.add(val.type.resolvedName));
      return Array.from(uniqueNodeNames).join(', ');
    },
    nodes: nestedNode,
  };
  Handlebars.registerPartial('node', NODE_TEMPLATE);
  Handlebars.registerPartial('prop', PROP_TEMPLATE);
  Handlebars.registerPartial('nestedProp', NESTED_PROP_TEMPLATE);
  Handlebars.registerHelper('curly', function (_object: any, open: boolean) {
    return open ? '{' : '}';
  });
  Handlebars.registerHelper('doubleCurly', function (_object: any, open: boolean) {
    return open ? '{{' : '}}';
  });
  Handlebars.registerHelper('propValue', function (prop: BasicProp, isSimpleProp: boolean) {
    let propValue = prop.value;
    if (prop.renderType === 'string') {
      propValue = "'" + propValue + "'";
    } else if (isSimpleProp) {
      propValue = '{' + propValue + '}';
    }
    return propValue;
  });
  const template = Handlebars.compile(PAGE_TEMPLATE);
  return template(view);
}
