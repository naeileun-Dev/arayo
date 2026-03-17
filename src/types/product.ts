import { Dimensions } from 'react-native';
import { colors } from '../styles/colors';

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
  manufacturer?: string;
  manufactureDate?: string;
  modelName?: string;
  warranty?: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 44) / 2;
export const COMPARE_CARD_WIDTH = (SCREEN_WIDTH - 42) / 2;

export const SORT_OPTIONS: SortType[] = [
  '최신순',
  '가격 낮은순',
  '가격 높은순',
  '조회수순',
  '관심 많은순',
  '거리순',
];

export const BADGE_CONFIG: Record<ItemState, { bg: string; text: string; label: string }> = {
  hold: { bg: colors.green100, text: colors.white, label: '예약중' },
  used: { bg: colors.orangeDark, text: colors.white, label: '중고' },
  sold: { bg: colors.white, text: colors.black, label: '판매완료' },
  new: { bg: colors.system100, text: colors.white, label: '신품' },
  normal: { bg: 'transparent', text: 'transparent', label: '' },
};
