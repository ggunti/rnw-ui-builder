import React from 'react';
import { View as RNView, Platform } from 'react-native';
import { useNode } from '@craftjs/core';
import _ from 'lodash';
import { Renderer } from '../UiEditor';
import { layoutProps, viewStyleProps } from '../constants';
import { getActualProps, sortObjectByKeys } from '../utils/helpers';
import { Prop } from '../types';

const style = sortObjectByKeys({ ...layoutProps, ...viewStyleProps });
style.padding = { ...style.padding, value: 20, shownValue: 20 };

const defaultViewProps: Record<string, Prop> = {
  style: {
    name: 'Style',
    subprops: { ...style },
  },
  // accessible: {
  //   name: 'Accessible',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // accessibilityLabel: {
  //   name: 'Accessibility label',
  //   optional: true,
  //   value: undefined,
  //   shownValue: '',
  //   oldValue: '',
  //   oldShownValue: '',
  //   renderType: 'string',
  //   selectorType: 'input',
  //   selectorProps: {},
  // },
  // accessibilityHint: {
  //   name: 'Accessibility hint',
  //   optional: true,
  //   value: undefined,
  //   shownValue: '',
  //   oldValue: '',
  //   oldShownValue: '',
  //   renderType: 'string',
  //   selectorType: 'input',
  //   selectorProps: {},
  // },
  // accessibilityRole: {
  //   name: 'Accessibility role',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 'none',
  //   oldValue: 'none',
  //   oldShownValue: 'none',
  //   renderType: 'string',
  //   selectorType: 'dropDown',
  //   selectorProps: {
  //     options: [
  //       { value: 'none', label: 'None' },
  //       { value: 'button', label: 'Button' },
  //       { value: 'link', label: 'Link' },
  //       { value: 'search', label: 'Search' },
  //       { value: 'image', label: 'Image' },
  //       { value: 'keyboardkey', label: 'Keyboardkey' },
  //       { value: 'text', label: 'Text' },
  //       { value: 'adjustable', label: 'Adjustable' },
  //       { value: 'imagebutton', label: 'Imagebutton' },
  //       { value: 'header', label: 'Header' },
  //       { value: 'alert', label: 'Alert' },
  //       { value: 'checkbox', label: 'Checkbox' },
  //       { value: 'combobox', label: 'Combobox' },
  //       { value: 'menu', label: 'Menu' },
  //       { value: 'menubar', label: 'Menubar' },
  //       { value: 'menuitem', label: 'Menuitem' },
  //       { value: 'progressbar', label: 'Progressbar' },
  //       { value: 'radio', label: 'Radio' },
  //       { value: 'radiogroup', label: 'Radiogroup' },
  //       { value: 'scrollbar', label: 'Scrollbar' },
  //       { value: 'spinbutton', label: 'Spinbutton' },
  //       { value: 'switch', label: 'Switch' },
  //       { value: 'tab', label: 'Tab' },
  //       { value: 'tablist', label: 'Tablist' },
  //       { value: 'timer', label: 'Timer' },
  //       { value: 'toolbar', label: 'Toolbar' },
  //     ],
  //   },
  // },
  // accessibilityState: {
  //   name: 'Accessibility state',
  //   subprops: {
  //     disabled: {
  //       name: 'Disabled',
  //       optional: true,
  //       value: undefined,
  //       shownValue: false,
  //       oldValue: false,
  //       oldShownValue: false,
  //       renderType: 'boolean',
  //       selectorType: 'checkBox',
  //       selectorProps: {},
  //     },
  //     selected: {
  //       name: 'Selected',
  //       optional: true,
  //       value: undefined,
  //       shownValue: false,
  //       oldValue: false,
  //       oldShownValue: false,
  //       renderType: 'boolean',
  //       selectorType: 'checkBox',
  //       selectorProps: {},
  //     },
  //     checked: {
  //       name: 'Checked',
  //       optional: true,
  //       value: undefined,
  //       shownValue: false,
  //       oldValue: false,
  //       oldShownValue: false,
  //       renderType: 'boolean',
  //       selectorType: 'checkBox',
  //       selectorProps: {},
  //     },
  //     busy: {
  //       name: 'Busy',
  //       optional: true,
  //       value: undefined,
  //       shownValue: false,
  //       oldValue: false,
  //       oldShownValue: false,
  //       renderType: 'boolean',
  //       selectorType: 'checkBox',
  //       selectorProps: {},
  //     },
  //     expanded: {
  //       name: 'Expanded',
  //       optional: true,
  //       value: undefined,
  //       shownValue: false,
  //       oldValue: false,
  //       oldShownValue: false,
  //       renderType: 'boolean',
  //       selectorType: 'checkBox',
  //       selectorProps: {},
  //     },
  //   },
  // },
  // accessibilityValue: {
  //   name: 'Accessibility value',
  //   subprops: {
  //     min: {
  //       name: 'Min',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     max: {
  //       name: 'Max',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     now: {
  //       name: 'Now',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     text: {
  //       name: 'Text',
  //       optional: true,
  //       value: undefined,
  //       shownValue: '',
  //       oldValue: '',
  //       oldShownValue: '',
  //       renderType: 'string',
  //       selectorType: 'input',
  //       selectorProps: {},
  //     },
  //   },
  // },
  // // iOS only
  // accessibilityViewIsModal: {
  //   name: 'Accessibility view is modal',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // iOS only
  // accessibilityElementsHidden: {
  //   name: 'Accessibility elements hidden',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // iOS only
  // accessibilityIgnoresInvertColors: {
  //   name: 'Accessibility ignores invert colors',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // android only
  // accessibilityLiveRegion: {
  //   name: 'Accessibility live region',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 'none',
  //   oldValue: 'none',
  //   oldShownValue: 'none',
  //   renderType: 'string',
  //   selectorType: 'dropDown',
  //   selectorProps: {
  //     options: [
  //       { value: 'none', label: 'None' },
  //       { value: 'polite', label: 'Polite' },
  //       { value: 'assertive', label: 'Assertive' },
  //     ],
  //   },
  // },
  // // android only
  // importantForAccessibility: {
  //   name: 'Important for accessibility',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 'auto',
  //   oldValue: 'auto',
  //   oldShownValue: 'auto',
  //   renderType: 'string',
  //   selectorType: 'dropDown',
  //   selectorProps: {
  //     options: [
  //       { value: 'auto', label: 'Auto' },
  //       { value: 'yes', label: 'Yes' },
  //       { value: 'no', label: 'No' },
  //       { value: 'no-hide-descendants', label: 'No-hide-descendants' },
  //     ],
  //   },
  // },
  // hitSlop: {
  //   name: 'Hit slop',
  //   subprops: {
  //     top: {
  //       name: 'Top',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     left: {
  //       name: 'Left',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     bottom: {
  //       name: 'Bottom',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //     right: {
  //       name: 'Right',
  //       optional: true,
  //       value: undefined,
  //       shownValue: 0,
  //       oldValue: 0,
  //       oldShownValue: 0,
  //       renderType: 'number',
  //       selectorType: 'slider',
  //       selectorProps: {
  //         step: 1,
  //         minimumValue: 0,
  //         maximumValue: 500,
  //       },
  //     },
  //   },
  // },
  // nativeID: {
  //   name: 'Native id',
  //   optional: true,
  //   value: undefined,
  //   shownValue: '',
  //   oldValue: '',
  //   oldShownValue: '',
  //   renderType: 'string',
  //   selectorType: 'input',
  //   selectorProps: {},
  // },
  // pointerEvents: {
  //   name: 'Pointer events',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 'auto',
  //   oldValue: 'auto',
  //   oldShownValue: 'auto',
  //   renderType: 'string',
  //   selectorType: 'dropDown',
  //   selectorProps: {
  //     options: [
  //       { value: 'auto', label: 'Auto' },
  //       { value: 'none', label: 'None' },
  //       { value: 'box-none', label: 'Box-none' },
  //       { value: 'box-only', label: 'Box-only' },
  //     ],
  //   },
  // },
  // removeClippedSubviews: {
  //   name: 'Remove clipped subviews',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // testID: {
  //   name: 'Test id',
  //   optional: true,
  //   value: undefined,
  //   shownValue: '',
  //   oldValue: '',
  //   oldShownValue: '',
  //   renderType: 'string',
  //   selectorType: 'input',
  //   selectorProps: {},
  // },
  // // android only
  // collapsable: {
  //   name: 'Collapsable',
  //   optional: true,
  //   value: undefined,
  //   shownValue: true,
  //   oldValue: true,
  //   oldShownValue: true,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // needsOffscreenAlphaCompositing: {
  //   name: 'Needs offscreen alpha compositing',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // android only
  // renderToHardwareTextureAndroid: {
  //   name: 'Render to hardware texture android',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // iOS only
  // shouldRasterizeIOS: {
  //   name: 'Should rasterize ios',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
  // // android only
  // nextFocusDown: {
  //   name: 'Next focus down',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 1,
  //   oldValue: 1,
  //   oldShownValue: 1,
  //   renderType: 'number',
  //   selectorType: 'slider',
  //   selectorProps: {
  //     step: 1,
  //     minimumValue: 0,
  //     maximumValue: 500,
  //   },
  // },
  // // android only
  // nextFocusForward: {
  //   name: 'Next focus forward',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 1,
  //   oldValue: 1,
  //   oldShownValue: 1,
  //   renderType: 'number',
  //   selectorType: 'slider',
  //   selectorProps: {
  //     step: 1,
  //     minimumValue: 0,
  //     maximumValue: 500,
  //   },
  // },
  // // android only
  // nextFocusLeft: {
  //   name: 'Next focus left',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 1,
  //   oldValue: 1,
  //   oldShownValue: 1,
  //   renderType: 'number',
  //   selectorType: 'slider',
  //   selectorProps: {
  //     step: 1,
  //     minimumValue: 0,
  //     maximumValue: 500,
  //   },
  // },
  // // android only
  // nextFocusRight: {
  //   name: 'Next focus right',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 1,
  //   oldValue: 1,
  //   oldShownValue: 1,
  //   renderType: 'number',
  //   selectorType: 'slider',
  //   selectorProps: {
  //     step: 1,
  //     minimumValue: 0,
  //     maximumValue: 500,
  //   },
  // },
  // // android only
  // nextFocusUp: {
  //   name: 'Next focus up',
  //   optional: true,
  //   value: undefined,
  //   shownValue: 1,
  //   oldValue: 1,
  //   oldShownValue: 1,
  //   renderType: 'number',
  //   selectorType: 'slider',
  //   selectorProps: {
  //     step: 1,
  //     minimumValue: 0,
  //     maximumValue: 500,
  //   },
  // },
  // // android only
  // focusable: {
  //   name: 'Focusable',
  //   optional: true,
  //   value: undefined,
  //   shownValue: false,
  //   oldValue: false,
  //   oldShownValue: false,
  //   renderType: 'boolean',
  //   selectorType: 'checkBox',
  //   selectorProps: {},
  // },
};

export function View(props: any) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const actualProps = getActualProps(props);

  return (
    <RNView ref={Platform.OS === 'web' ? (ref) => connect(drag(ref as any)) : undefined} {...actualProps}>
      {props.children}
    </RNView>
  );
}

View.craft = {
  props: _.cloneDeep(defaultViewProps),
  related: {
    uiSettings: () => <Renderer />,
  },
};

View.template = `import React from 'react';
import { View as RNView } from 'react-native';

export function View(props) {
  return <RNView {...props}>{props.children}</RNView>;
}
`;
