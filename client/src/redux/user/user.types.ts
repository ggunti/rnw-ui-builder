import { UserType, TokenType } from '../../types';

export interface UserState {
  user: UserType;
  signedIn: boolean;
  token: TokenType;
}
