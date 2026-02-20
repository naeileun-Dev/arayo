import { Platform, TextStyle } from 'react-native';

export const fontFamily = {
  regular: Platform.select({
    ios: 'Pretendard-Regular',
    android: 'Pretendard-Regular',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'Pretendard-Medium',
    android: 'Pretendard-Medium',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'Pretendard-SemiBold',
    android: 'Pretendard-SemiBold',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'Pretendard-Bold',
    android: 'Pretendard-Bold',
    default: 'System',
  }),
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize['3xl'],
    lineHeight: fontSize['3xl'] * lineHeight.tight,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize['2xl'],
    lineHeight: fontSize['2xl'] * lineHeight.tight,
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.tight,
  },
  h4: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.normal,
  },

  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },

  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  labelSmall: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },

  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
  },

  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.tight,
  },
  buttonSmall: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.tight,
  },
};

export default typography;
