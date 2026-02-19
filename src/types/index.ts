/**
 * 공통 타입 정의
 */

import { StyleProp, ViewStyle, TextStyle } from 'react-native';

// ============================================================
// 공통 컴포넌트 타입
// ============================================================

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

// ============================================================
// 회원가입 폼 타입
// ============================================================

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

// ============================================================
// 네비게이션 타입
// ============================================================

// 인증 스택
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SignUpComplete: { name: string };
  AccountRestricted: undefined;
  AccountRecovery: { tab?: 'findId' | 'resetPassword' };
};

// 메인 하단 탭
export type MainTabParamList = {
  Home: undefined;
  CategoryTab: undefined;
  Post: undefined;
  Wishlist: undefined;
  MyPage: undefined;
};

// 메인 스택 (탭 위에 쌓이는 화면들)
export type MainStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  CompanyDetail: { companyId: string };
  Search: undefined;
  Notification: undefined;
  CategoryList: { categoryId?: string };
};

// 루트 (Auth ↔ Main 전환)
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// ============================================================
// 홈 화면 관련 타입
// ============================================================

// 배너 타입
export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  link?: string;
}

// 추천 기업 타입
export interface RecommendedCompany {
  id: string;
  name: string;
  imageUrl: string;
  badge?: string;
  isAd?: boolean;
}

// 상품 타입
export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  priceLabel?: string;
  imageUrl: string;
  location: string;
  date: string;
  viewCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  tags?: string[];
  companyName?: string;
  isNew?: boolean;
  isHot?: boolean;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  icon?: string;
}

// 카테고리 칩 타입
export interface CategoryChip {
  id: string;
  label: string;
  isActive?: boolean;
}

// 퀵 메뉴 타입
export interface QuickMenu {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

// 섹션 헤더 Props
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onMore?: () => void;
  moreText?: string;
  style?: StyleProp<ViewStyle>;
}

// 배너 캐러셀 Props
export interface BannerCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  interval?: number;
  style?: StyleProp<ViewStyle>;
}

// 상품 리스트 아이템 Props
export interface ProductListItemProps {
  product: Product;
  onPress?: (product: Product) => void;
  onLike?: (product: Product) => void;
  variant?: 'default' | 'compact' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}

// 추천 기업 카드 Props
export interface CompanyCardProps {
  company: RecommendedCompany;
  onPress?: (company: RecommendedCompany) => void;
  style?: StyleProp<ViewStyle>;
}

// 카테고리 칩 목록 Props
export interface CategoryChipsProps {
  categories: CategoryChip[];
  activeId?: string;
  onSelect?: (category: CategoryChip) => void;
  style?: StyleProp<ViewStyle>;
}

// 퀵 메뉴 Props
export interface QuickMenuProps {
  menus: QuickMenu[];
  onPress?: (menu: QuickMenu) => void;
  style?: StyleProp<ViewStyle>;
}
