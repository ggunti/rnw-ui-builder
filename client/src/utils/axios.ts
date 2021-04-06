import axios from 'axios';
import { store } from '../redux/store';
import { API_BASE_URL } from '../constants';

export function configAxios() {
  axios.defaults.baseURL = API_BASE_URL;
  // append authorization if it was not appended yet
  axios.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
      const accessToken = store.getState().user.token.access_token;
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  });
}
