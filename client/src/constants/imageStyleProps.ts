import { Prop } from '../types';
import { viewStyleProps } from './viewStyleProps';
import { layoutProps } from './layoutProps';

export const imageStyleProps: Record<string, Prop> = {
  backfaceVisibility: viewStyleProps.backfaceVisibility,
  backgroundColor: viewStyleProps.backgroundColor,
  borderBottomLeftRadius: viewStyleProps.borderBottomLeftRadius,
  borderBottomRightRadius: viewStyleProps.borderBottomRightRadius,
  borderColor: viewStyleProps.borderColor,
  borderRadius: viewStyleProps.borderRadius,
  borderTopLeftRadius: viewStyleProps.borderTopLeftRadius,
  borderTopRightRadius: viewStyleProps.borderTopRightRadius,
  borderWidth: viewStyleProps.borderWidth,
  opacity: viewStyleProps.opacity,
  overflow: layoutProps.overflow,
  // android only
  overlayColor: {
    name: 'Overlay color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
  resizeMode: {
    name: 'Resize mode',
    optional: true,
    value: undefined,
    shownValue: 'cover',
    oldValue: 'cover',
    oldShownValue: 'cover',
    renderType: 'string',
    selectorType: 'dropDown',
    selectorProps: {
      options: [
        { value: 'cover', label: 'Cover' },
        { value: 'contain', label: 'Contain' },
        { value: 'stretch', label: 'Stretch' },
        { value: 'repeat', label: 'Repeat' },
        { value: 'center', label: 'Center' },
      ],
    },
  },
  tintColor: {
    name: 'Tint color',
    optional: true,
    value: undefined,
    shownValue: '#000000',
    oldValue: '#000000',
    oldShownValue: '#000000',
    renderType: 'string',
    selectorType: 'colorPicker',
    selectorProps: {},
  },
};
