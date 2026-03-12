/**
 * 상품 목록 공통 타입 & 상수
 * CategoryListScreen / FavoriteListScreen 공유
 */

import { Dimensions } from 'react-native';
import { colors as C } from '../styles/colors';

// ─────────────────────────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────────────────────────
export type ItemState = 'hold' | 'used' | 'sold' | 'new' | 'normal';
export type ViewType = 'magazine' | 'grid';
export type SortType = '최신순' | '가격 낮은순' | '가격 높은순' | '조회수순' | '관심 많은순' | '거리순';

export interface ProductListItem {
  id: string;
  state: ItemState;
  stateLabel?: string;
  title: string;
  tags: string;
  price: number;
  priceLabel?: string;
  image?: any;
  timeAgo: string;
  likes: number;
  reviews?: number;
  isAd?: boolean;
  isLiked?: boolean;
  isCompared?: boolean;
  // FavoriteList 전용 스펙
  manufacturer?: string;
  manufactureDate?: string;
  modelName?: string;
  warranty?: string;
}

// ─────────────────────────────────────────────────────────────────
// 레이아웃 상수
// ─────────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;
export const COMPARE_CARD_WIDTH = (SCREEN_WIDTH - 32 - 10) / 2;

// ─────────────────────────────────────────────────────────────────
// 뱃지 & 정렬
// ─────────────────────────────────────────────────────────────────
export const BADGE_CONFIG: Record<ItemState, { bg: string; text: string; label: string }> = {
  hold:   { bg: C.green100,    text: C.white, label: '예약중'  },
  used:   { bg: C.orangeDark,  text: C.white, label: '중고'    },
  sold:   { bg: C.white,       text: C.black, label: '판매완료' },
  new:    { bg: C.system100,   text: C.white, label: '신품'    },
  normal: { bg: 'transparent', text: 'transparent', label: '' },
};

export const SORT_OPTIONS: SortType[] = [
  '최신순', '가격 낮은순', '가격 높은순', '조회수순', '관심 많은순', '거리순',
];
