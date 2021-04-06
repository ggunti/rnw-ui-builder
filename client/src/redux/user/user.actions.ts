import { createAction } from 'redux-actions';
import { UserState } from './user.types';

export const USER = {
  SET: 'set_user',
  RESET: 'user_reset',
};

export const setUser = createAction<Partial<UserState>>(USER.SET);
export const resetUser = createAction<void>(USER.RESET);
