import { Color } from './colors';

export const simplifyObject = (obj: any) => {
  const simpleObject = {};
  for (const prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof obj[prop] === 'object') {
      continue;
    }
    if (typeof obj[prop] === 'function') {
      continue;
    }
    simpleObject[prop] = obj[prop];
  }
  return JSON.stringify(simpleObject);
};

export const markYellow = (text: string) => {
  return `${Color.FgYellow}${text}${Color.Reset}`;
};

export const markMagenta = (text: string) => {
  return `${Color.FgMagenta}${text}${Color.Reset}`;
};
