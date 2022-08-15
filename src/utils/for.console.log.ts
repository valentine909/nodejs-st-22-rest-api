import { Color } from './colors';

export const markYellow = (text: string) => {
  return `${Color.FgYellow}${text}${Color.Reset}`;
};

export const markMagenta = (text: string) => {
  return `${Color.FgMagenta}${text}${Color.Reset}`;
};
