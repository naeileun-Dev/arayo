/**
 * 아라요 기계장터 타이포그래피
 */

import { Platform, TextStyle } from 'react-native';

// 폰트 패밀리
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

// 폰트 사이즈
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

// 라인 높이 배율
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// 타이포그래피 프리셋
export const typography: Record<string, TextStyle> = {
  // 헤딩
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

  // 바디
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

  // 라벨
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

  // 캡션
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
  },

  // 버튼
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
