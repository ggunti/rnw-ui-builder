import 'react-native';
import { getErrMsg } from '../err';

// getErrMsg
it('given a message, getErrMsg() returns a formatted error message as string', () => {
  const message = 'Invalid credentials.';
  expect(getErrMsg({ message })).toBe('Invalid credentials.');
});

it('given a message and an array of errors, getErrMsg() returns a formatted error message as string', () => {
  const message = 'Invalid credentials.';
  const errors = {
    email: 'Invalid email address.',
    password: 'Password is required.',
  };
  expect(getErrMsg({ message, errors })).toBe('Invalid credentials.\nInvalid email address.\nPassword is required.');
});
