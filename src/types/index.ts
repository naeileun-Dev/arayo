/**
 * 공통 타입 정의
 */

import { StyleProp, ViewStyle, TextStyle } from 'react-native';

// 버튼 타입
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// 인풋 타입
export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  onBlur?: () => void;
  onFocus?: () => void;
}

// 체크박스 타입
export interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

// 헤더 타입
export interface HeaderProps {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
  border?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

// 탭바 타입
export interface Tab {
  key: string;
  label: string;
}

export interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

// 소셜 로그인 타입
export type SocialProvider = 'kakao' | 'naver' | 'google' | 'apple';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  variant?: 'icon' | 'full';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

// 약관 동의 타입
export interface AgreementItemProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label: string;
  required?: boolean;
  onViewDetail?: () => void;
  isAllAgree?: boolean;
  style?: StyleProp<ViewStyle>;
}

// 회원가입 폼 타입
export interface SignUpFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  email: string;
  emailDomain: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
}

export interface SignUpErrors {
  userId?: string[];
  userIdSuccess?: string;
  password?: string[];
  passwordSuccess?: string;
  passwordConfirm?: string[];
  name?: string[];
  nickname?: string[];
  email?: string[];
  verification?: string[];
  agreements?: string[];
}

export interface AgreementsState {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

// 네비게이션 타입
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SignUpComplete: { name: string };
  AccountRestricted: undefined;
  AccountRecovery: { tab?: 'findId' | 'resetPassword' };
};
