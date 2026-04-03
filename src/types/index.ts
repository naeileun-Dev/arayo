import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type SocialProvider = 'kakao' | 'naver' | 'google' | 'apple';
export type TradeState = 0 | 1 | 2 | 3 | 4 | 5;

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
  Chat: undefined;
  MyPage: undefined;
};

export type RootStackParamList = {
  DevRoute: undefined;
  Auth: undefined;
  Main: undefined;
  Search: undefined;
  Notification: undefined;
  Terms: undefined;
  Privacy: undefined;
  BusinessUpgradeVerify: undefined;
  BusinessUpgrade: undefined;
  ProductView: { productId: string };
  ProductUpload: undefined;
  CategoryList: { category: string; subCategory: string };
  FAQ: undefined;
  PurchaseList: undefined;
  SalesList: undefined;
  OrderDetail: undefined;
  OrderWrite: { product: OrderProductInfo };
  OrderComplete: { orderInfo: OrderCompleteInfo };
  ChatList: undefined;
  ChatRoom: {
    chatId: string;
    chatContext?: 'product' | 'reservation' | 'payment_before' | 'payment_after';
    userType?: 'personal' | 'business';
  };
  FavoriteList: { initialProducts?: Product[] } | undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  PasswordReset: undefined;
  TradeReview: undefined;
  EstimateReplyList: undefined;
  EstimateDetail: { id: string; status?: 'ing' | 'complete' | 'exp' };
  EstimateList: undefined;
  BusinessUpgradeForm: { plan: 'general' | 'gold' };
  BusinessUpgradeFormNormal: undefined;
  BusinessUpgradeFormGold: undefined;
  EstimateUpload: { mode?: 'edit' };
  EstimateReplyWrite: { mode?: 'edit' };
  ProcessingList: undefined;
  ProcessingUpload: { mode?: 'edit' };
  ProcessingDetail: { id: string; status?: 'ing' | 'complete' | 'exp' };
  ProcessingReplyWrite: { mode?: 'edit' };
  ScrapList: undefined;
  ScrapUpload: undefined;
  ScrapDetail: { id: string; status?: 'ing' | 'complete' | 'exp' };
  ScrapReplyWrite: { mode?: 'edit' };
  ReceivedEstimate: { id?: string; type?: 'estimate' | 'processing' | 'scrap' };
  CompareProducts: undefined;
  Notice: undefined;
  IndustryNews: undefined;
  IndustryNewsDetail: {
    news: {
      id: string;
      title: string;
      date: string;
      content?: string;
      imageUrl?: string;
    };
  };
  ServiceIntroduce: undefined;
  InquiryList: undefined;
  InquiryWrite: undefined;
  BrandHome: undefined;
  BrandSearch: undefined;
  BrandDetail: { brandId?: string };
  BrandWrite: { mode?: 'create' | 'edit'; brandId?: string };
  BrandAbout: { brandId?: string };
  BrandNotice: { brandId?: string };
  BrandNoticeWrite: { mode?: 'create' | 'edit'; brandId?: string };
  BrandProducts: { brandId?: string; empty?: boolean };
  BrandContact: { brandId?: string };
  BrandProductDetail: { brandId?: string; productId?: string };
  ProcessingHome: undefined;
  ProcessingCompanyDetail: undefined;
  ProcessingCompanyWrite: { mode?: 'create' | 'edit' };
  PurchaseInquiry: undefined;
  LoginRequired: undefined;
  AccountRestricted: undefined;
  RecentlyViewed: undefined;
  TradeReviewDetail: undefined;
  TradeReviewEdit: undefined;
  MyEstimateList: undefined;
  MyEstimateDetail: undefined;
  MyProcessingList: undefined;
  MyProcessingDetail: undefined;
  MyScrapList: undefined;
  MyScrapDetail: undefined;
  BusinessUpgradeComplete: { type?: 'general' | 'gold' };
};

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

export interface OrderProductInfo {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface OrderCompleteInfo {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  totalAmount: number;
  sellerPhone: string;
  sellerId?: string;
}

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

export interface Tab {
  key: string;
  label: string;
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

export interface TradeItemButton {
  label: string;
  type: 'primary' | 'light' | 'blue' | 'schedule';
  action: string;
}

export interface TradeItem {
  id: string;
  state: TradeState;
  stateLabel: string;
  helpText?: string;
  timeAgo?: string;
  image: string;
  title: string;
  price: string;
  likes?: number;
  comments?: number;
  buttons: TradeItemButton[];
  moreButtons?: Array<{ label: string; action: string }>;
}

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
  variant?: 'outlined' | 'underline';
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

export interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

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
