import { markYellow } from './for.console.log';

export class ServiceLogger {
  log(service: string, method: string, args: any[]) {
    console.log(
      `${markYellow('Service:')} ${service}, ${markYellow(
        'method:',
      )} ${method}, ${markYellow('arguments:')} ${JSON.stringify(args)}`,
    );
  }
}
