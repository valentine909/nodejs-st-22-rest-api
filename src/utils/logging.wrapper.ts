import { serviceLogger } from './service.logger';

export const loggingWrapper = (prototype: any) => {
  Object.getOwnPropertyNames(prototype).forEach((prop) => {
    if (prop !== 'constructor') {
      const func = prototype[prop];
      prototype[prop] = function () {
        func.call(this, ...arguments);
        serviceLogger(this.constructor.name, prop, Array.from(arguments));
      };
    }
  });
};
