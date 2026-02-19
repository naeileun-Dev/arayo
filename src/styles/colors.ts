/**
 * 아라요 기계장터 색상 팔레트
 */

export const colors = {
  // Primary (--mainColor: #DB0025)
  primary: '#DB0025',
  primary200: '#DB0025',
  primaryDark: '#B0001E',
  primaryLight: '#FF1744',

  // Secondary
  secondary: '#1B1B1B',
  secondaryLight: '#424242',

  // Gray Scale (웹 CSS 변수 기준)
  G100: '#F7F7F7',
  G200: '#EEEEEE',
  G300: '#CFCFCF',
  G400: '#B1B1B1',
  G500: '#9E9E9E',
  G600: '#7E7E7E',
  G700: '#333333',
  G800: '#515151',
  G900: '#3B3B3B',

  // Background
  background: '#FFFFFF',
  backgroundGray: '#F7F7F7',
  backgroundDark: '#FAFAFA',

  // Text
  textPrimary: '#1B1B1B',
  textSecondary: '#7E7E7E',
  textTertiary: '#9E9E9E',
  textPlaceholder: 'rgba(71,78,103,0.5)',
  textError: '#FF0000',
  textSuccess: '#4CAF50',

  // Border (--border-color: var(--G300))
  borderLight: '#EEEEEE',
  borderMedium: '#CFCFCF',
  borderDark: '#9E9E9E',

  // Status
  success: '#4CAF50',
  successLight: '#E8F5E9',
  error: '#FF0000',
  errorLight: '#FFEBEE',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  info: '#2196F3',
  infoLight: '#E3F2FD',

  // Social Login
  kakao: '#FEE500',
  kakaoText: '#000000',
  naver: '#03C75A',
  naverText: '#FFFFFF',
  google: '#FFFFFF',
  googleBorder: '#DADCE0',
  apple: '#000000',
  appleText: '#FFFFFF',

  // Misc
  white: '#FFFFFF',
  black: '#1B1B1B',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorKeys = keyof typeof colors;

export default colors;
