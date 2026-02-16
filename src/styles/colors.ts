/**
 * 아라요 기계장터 색상 팔레트
 */

export const colors = {
  // Primary
  primary: '#E53935',
  primaryDark: '#C62828',
  primaryLight: '#EF5350',

  // Secondary
  secondary: '#212121',
  secondaryLight: '#424242',

  // Background
  background: '#FFFFFF',
  backgroundGray: '#F5F5F5',
  backgroundDark: '#FAFAFA',

  // Text
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textPlaceholder: '#BDBDBD',
  textError: '#E53935',
  textSuccess: '#4CAF50',

  // Border
  borderLight: '#E0E0E0',
  borderMedium: '#BDBDBD',
  borderDark: '#9E9E9E',

  // Status
  success: '#4CAF50',
  successLight: '#E8F5E9',
  error: '#E53935',
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
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorKeys = keyof typeof colors;

export default colors;
