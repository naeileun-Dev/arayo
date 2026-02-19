/**
 * 홈 화면 관련 타입 정의
 */

import { StyleProp, ViewStyle } from 'react-native';

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

// 네비게이션 타입
export type MainTabParamList = {
  Home: undefined;
  CategoryTab: undefined;
  Menu: undefined;
  Wishlist: undefined;
  MyPage: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  CompanyDetail: { companyId: string };
  Search: undefined;
  Notification: undefined;
  CategoryList: { categoryId?: string };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
