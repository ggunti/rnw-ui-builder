import _ from 'lodash';

export function getErrMsg({ message, errors }: { message: string; errors?: Record<string, string> }) {
  let errorMessages = [message];
  if (errors) {
    _.forEach(errors, (msg) => errorMessages.push(msg));
  }
  return errorMessages.join('\n');
}
