import { Platform } from 'react-native';

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const API_DEV_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

const API_PRODUCTION_URL = 'https://order-software.com/ui-builder-backend/api';

export const API_BASE_URL = __DEV__ ? API_DEV_URL : API_PRODUCTION_URL;

export const PREFIX = 'uiBuilder/';

export const PHONE_WIDTHS = [
  { label: 'iPhone 5/SE / iPod Touch (320px)', value: 320 },
  { label: 'iPhone XS/X/6/6S/7/8 (375px)', value: 375 },
  { label: 'iPhone XR/XS Max/6+/7+/8+ (414px)', value: 414 },
  { label: 'iPad Air/Mini (768px)', value: 768 },
  { label: 'iPad Pro (1024px)', value: 1024 },
  { label: 'One Plus 3 (480px)', value: 480 },
  { label: 'Nexus 6P/Google Pixel XL (412px)', value: 412 },
  { label: 'Samsung Galaxy Tab 10 (800px)', value: 800 },
  { label: 'Chromebook Pixel (1200px)', value: 1200 },
];

export * from './layoutProps';
export * from './viewStyleProps';
export * from './textStyleProps';
export * from './imageStyleProps';
export * from './shadowProps';
export * from './iconProps';
