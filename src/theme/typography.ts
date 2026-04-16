import { TextStyle } from 'react-native';

export const typography = {
  heading: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  } as TextStyle,
  title: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  } as TextStyle,
  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
  } as TextStyle,
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,
  small: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
} as const;
