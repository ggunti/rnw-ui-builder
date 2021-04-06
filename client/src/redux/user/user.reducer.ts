import { USER } from './user.actions';
import { UserState } from './user.types';

const INITIAL_STATE: UserState = {
  user: {
    id: -1,
    email: '',
    isVerified: false,
  },
  signedIn: false,
  token: {
    access_token: '',
    token_type: 'bearer',
    expires_in: 0,
  },
};

export default (state = INITIAL_STATE, action: any): UserState => {
  switch (action.type) {
    case USER.SET:
      return { ...state, ...action.payload };
    case USER.RESET:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
