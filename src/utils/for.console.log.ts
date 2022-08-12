import { Color } from './colors';

export const simplifyObject = (obj: any) => {
  const simpleObject = {};
  Object.keys(obj).forEach((prop) => {
    let value = obj[prop];
    if (typeof obj[prop] === 'object') {
      value = JSON.stringify(obj[prop], replaceCircular(obj[prop]));
      value = value.replaceAll('"', "'");
    }
    if (typeof obj[prop] === 'function') {
      value = 'function';
    }
    simpleObject[prop] = value;
  });
  return JSON.stringify(simpleObject, null, 2);
};

export const markYellow = (text: string) => {
  return `${Color.FgYellow}${text}${Color.Reset}`;
};

export const markMagenta = (text: string) => {
  return `${Color.FgMagenta}${text}${Color.Reset}`;
};

export const replaceCircular = (obj) => {
  let i = 0;
  return function (key, value) {
    if (
      i !== 0 &&
      typeof obj === 'object' &&
      typeof value === 'object' &&
      obj === value
    ) {
      return '[Circular]';
    }

    if (i >= 127) {
      return '[Unknown]';
    }
    i += 1;
    return value;
  };
};
