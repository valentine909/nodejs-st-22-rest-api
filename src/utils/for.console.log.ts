import { Color } from './colors';

export const markYellow = (text: string) => {
  return `${Color.FgYellow}${text}${Color.Reset}`;
};

export const markMagenta = (text: string) => {
  return `${Color.FgMagenta}${text}${Color.Reset}`;
};

export const markGreen = (text: string) => {
  return `${Color.FgGreen}${text}${Color.Reset}`;
};
