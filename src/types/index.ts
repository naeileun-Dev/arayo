import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

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

export interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  variant?: 'checkbox' | 'radio';
  activeColor?: string;
  labelColor?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

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

export type SocialProvider = 'kakao' | 'naver' | 'google' | 'apple';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  variant?: 'icon' | 'full';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface AgreementItemProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label: string;
  required?: boolean;
  onViewDetail?: () => void;
  isAllAgree?: boolean;
  style?: StyleProp<ViewStyle>;
}

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

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SignUpComplete: { name: string };
  AccountRestricted: undefined;
  AccountRecovery: { tab?: 'findId' | 'resetPassword' };
};

export type MainTabParamList = {
  Home: undefined;
  CategoryTab: undefined;
  Menu: undefined;
  Wishlist: undefined;
  MyPage: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Search: undefined;
  Notification: undefined;
  Terms: undefined;
  Privacy: undefined;
  BusinessUpgrade: undefined;
  ProductView: { productId: string };
  ProductUpload: undefined;
  CategoryList: { category: string; subCategory: string };
  FAQ: undefined;
  PurchaseList: undefined;
  SalesList: undefined;
  OrderDetail: undefined;
};

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  link?: string;
}

export interface RecommendedCompany {
  id: string;
  name: string;
  imageUrl: string;
  badge?: string;
  isAd?: boolean;
}

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

export interface CategoryChip {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface QuickMenu {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

export type TradeState = 1 | 2 | 3 | 4 | 5;

export interface TradeItem {
  id: string;
  state: TradeState;
  stateLabel: string;
  helpText?: string;
  image: string;
  title: string;
  price: string;
  buttons: Array<{
    label: string;
    type: 'primary' | 'light' | 'blue';
    action: string;
  }>;
  moreButtons?: Array<{ label: string; action: string }>;
}
