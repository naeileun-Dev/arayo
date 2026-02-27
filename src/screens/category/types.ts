import { Dimensions } from 'react-native';
import { colors as C } from '../../styles/colors';

export type ItemState = 'hold' | 'used' | 'sold' | 'new' | 'normal';
export type ViewType = 'magazine' | 'grid';
export type SortType = '최신순' | '가격 낮은순' | '가격 높은순' | '조회수순' | '관심 많은순' | '거리순';

export interface Product {
  id: string;
  state: ItemState;
  isAd?: boolean;
  isLiked?: boolean;
  image: any;
  title: string;
  tags: string;
  price: number;
  timeAgo: string;
  likes: number;
  reviews: number;
}

export interface FilterState {
  searchText: string;
  productType: '전체' | '신품' | '중고';
  saleStatus: '전체' | '판매중' | '판매완료';
  manufacturers: string[];
  city: string;
  county: string;
  priceMin: string;
  priceMax: string;
  priceRange: string;
  dateFromYear: string;
  dateFromMonth: string;
  dateToYear: string;
  dateToMonth: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const BADGE_CONFIG: Record<ItemState, { bg: string; text: string; label: string }> = {
  hold:   { bg: C.green100,     text: C.white, label: '예약중'  },
  used:   { bg: C.orangeDark,   text: C.white, label: '중고'    },
  sold:   { bg: C.white,        text: C.black, label: '판매완료' },
  new:    { bg: C.system100,    text: C.white, label: '신품'    },
  normal: { bg: 'transparent',  text: 'transparent', label: '' },
};

export const SORT_OPTIONS: SortType[] = ['최신순', '가격 낮은순', '가격 높은순', '조회수순', '관심 많은순', '거리순'];
export const PRICE_RANGES = ['전체', '10만원 이하', '10~100만원', '100~1000만원', '1000~2000만원', '2000만원 이상'];
export const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;
export const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;
export const COMPARE_CARD_WIDTH = (SCREEN_WIDTH - 32 - 10) / 2;

export const MANUFACTURERS = [
  '화천기계', 'DN솔루션즈(구두산)', 'SMEC(스맥)', '하스(Haas)', '마작(Mazak)',
  'DMG모리(DMG MORI)', '오쿠마(Okuma)', '미쓰비시(Mitsubishi)', '파나소닉(Panasonic)',
  '화낙(Fanuc)', '두산공작기계', '현대위아', '기아기계', '삼성중공업',
];

export const INITIAL_FILTER: FilterState = {
  searchText: '',
  productType: '전체',
  saleStatus: '전체',
  manufacturers: [],
  city: '',
  county: '',
  priceMin: '',
  priceMax: '',
  priceRange: '전체',
  dateFromYear: '',
  dateFromMonth: '',
  dateToYear: '',
  dateToMonth: '',
};

const IMG_01 = require('../../assets/images/img01.png');
const IMG_02 = require('../../assets/images/img02.png');
const IMG_03 = require('../../assets/images/img03.png');
export const PROFILE_IMG = require('../../assets/images/profileImg.png');

export const MOCK_PRODUCTS: Product[] = [
  { id: '1',  state: 'hold',   isAd: true,  isLiked: false, image: IMG_01, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '9분전',   likes: 21, reviews: 0 },
  { id: '2',  state: 'used',   isAd: true,  isLiked: false, image: IMG_02, title: '화천기계 범용선반 CS-3020H 온도조절 안정적 · 장시간 운전 가능',        tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '9분전',   likes: 21, reviews: 0 },
  { id: '3',  state: 'sold',   isAd: false, isLiked: false, image: IMG_03, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '9분전',   likes: 21, reviews: 0 },
  { id: '4',  state: 'new',    isAd: false, isLiked: false, image: IMG_01, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '9분전',   likes: 21, reviews: 0 },
  { id: '5',  state: 'normal', isAd: false, isLiked: true,  image: IMG_02, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '9분전',   likes: 21, reviews: 0 },
  { id: '6',  state: 'hold',   isAd: false, isLiked: false, image: IMG_03, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '15분전',  likes: 5,  reviews: 2 },
  { id: '7',  state: 'used',   isAd: false, isLiked: false, image: IMG_01, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '1시간전',  likes: 12, reviews: 0 },
  { id: '8',  state: 'sold',   isAd: false, isLiked: false, image: IMG_02, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '2시간전',  likes: 8,  reviews: 1 },
  { id: '9',  state: 'new',    isAd: false, isLiked: false, image: IMG_03, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '3시간전',  likes: 45, reviews: 5 },
  { id: '10', state: 'normal', isAd: false, isLiked: false, image: IMG_01, title: '온도조절 안정적 · 장시간 운전 가능 온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: 12300000, timeAgo: '4시간전',  likes: 3,  reviews: 0 },
];

export const MOCK_COMPARE_DETAIL = {
  storeName: '수성코리아',
  manager: '김샘플',
  phone: '010-1234-5678',
  manufacturer: '화천기계',
  model: 'CS-3020H',
  madeDate: '2006년 07월',
  location: '경기 안산',
  warranty: '2006년 07월',
  category: '공작기계 CNC 선반',
  negotiable: true,
  services: {
    customMade: false,
    as: true,
    loading: true,
    arrival: false,
    install: false,
    driveTraining: true,
    taxInvoice: false,
    installment: false,
  },
};

import BasketIcon     from '../../assets/icon/product/shopping-basket.svg';
import TruckUpIcon    from '../../assets/icon/product/truck - up.svg';
import WrenchIcon     from '../../assets/icon/product/wrench.svg';
import ScrollIcon     from '../../assets/icon/product/scroll.svg';
import CogIcon        from '../../assets/icon/product/cog.svg';
import TruckDownIcon  from '../../assets/icon/product/truck - down.svg';
import ForkliftIcon   from '../../assets/icon/product/forklift.svg';
import CreditCardIcon from '../../assets/icon/product/credit-card.svg';

export const SERVICE_ITEMS: { name: string; on: boolean; Icon: React.FC<any> }[][] = [
  [
    { name: '주문제작', on: false, Icon: BasketIcon },
    { name: '상차도', on: true, Icon: TruckUpIcon },
    { name: '설치', on: false, Icon: WrenchIcon },
    { name: '세금계산서 발행', on: false, Icon: ScrollIcon },
  ],
  [
    { name: 'A/S 가능', on: false, Icon: CogIcon },
    { name: '도착도', on: false, Icon: TruckDownIcon },
    { name: '시운전/교육', on: true, Icon: ForkliftIcon },
    { name: '할부가능', on: false, Icon: CreditCardIcon },
  ],
];

export const SERVICE_LABELS: { key: keyof typeof MOCK_COMPARE_DETAIL.services; label: string }[] = [
  { key: 'customMade', label: '주문제작' },
  { key: 'as', label: 'A/S 가능' },
  { key: 'loading', label: '상차도' },
  { key: 'arrival', label: '도착도' },
  { key: 'install', label: '설치' },
  { key: 'driveTraining', label: '시운전/교육' },
  { key: 'taxInvoice', label: '세금계산서 발행' },
  { key: 'installment', label: '할부가능' },
];

export const countActiveFilters = (f: FilterState) => {
  let n = 0;
  if (f.searchText) n++;
  if (f.productType !== '전체') n++;
  if (f.saleStatus !== '전체') n++;
  if (f.manufacturers.length > 0) n++;
  if (f.city) n++;
  if (f.priceRange !== '전체' || f.priceMin || f.priceMax) n++;
  if (f.dateFromYear || f.dateFromMonth || f.dateToYear || f.dateToMonth) n++;
  return n;
};
