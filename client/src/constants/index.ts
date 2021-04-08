import { Platform } from 'react-native';

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const API_DEV_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

const API_PRODUCTION_URL = 'https://order-software.com/app-builder-backend/api';

export const API_BASE_URL = __DEV__ ? API_DEV_URL : API_PRODUCTION_URL;

export const PREFIX = 'appBuilder/';
