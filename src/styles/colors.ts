export const colors = {
  // Primary
  primary: '#DB0025',
  primary200: '#DB0025',
  primaryDark: '#B0001E',
  primaryLight: '#FF1744',

  // Secondary
  secondary: '#1B1B1B',
  secondaryLight: '#424242',

  // Gray Scale
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

  // Border
  borderLight: '#EEEEEE',
  borderMedium: '#CFCFCF',
  borderDark: '#9E9E9E',

  // System
  system100: '#0F53FF',

  // Semantic
  red: '#FF0000',
  redDark: '#DC3545',
  green: '#53B460',
  green100: '#2ecc71',
  orange: '#FB8C14',
  orange100: '#E67E22',
  orangeDark: '#FF8C00',
  star: '#FFB800',

  // Order State
  state1: '#BD9648',
  state2: '#BF8244',
  state3: '#BB6359',
  state4: '#587DC3',
  state5: '#7E7C78',

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
