import { markYellow } from './for.console.log';

export const serviceLogger = (
  service: string,
  method: string,
  args: any[],
  error = '',
) => {
  const serviceMessage = `${markYellow('Service:')} ${service}`;
  const methodMessage = `${markYellow('method:')} ${method}`;
  const argsMessage = `${markYellow('arguments:')} ${JSON.stringify(args)}`;
  const errorMessage = error ? `${markYellow('error:')} ${error}` : '';
  console.log(serviceMessage, methodMessage, argsMessage, errorMessage);
};
