import CogIcon from '../../assets/icon/product/cog.svg';
import WrenchIcon from '../../assets/icon/product/wrench.svg';
import TruckUpIcon from '../../assets/icon/product/truck - up.svg';
import TruckDownIcon from '../../assets/icon/product/truck - down.svg';
import ForkliftIcon from '../../assets/icon/product/forklift.svg';
import ScrollIcon from '../../assets/icon/product/scroll.svg';
import CreditCardIcon from '../../assets/icon/product/credit-card.svg';
import BasketIcon from '../../assets/icon/product/shopping-basket.svg';

// 상품 상세 전용 색상 (글로벌 colors와 값이 다름)
export const colors = {
  black: '#1b1b1b',
  white: '#FFFFFF',
  primary: '#DB0025',
  blue: '#3B82F6',
  red: '#DC3545',
  G100: '#F3F4F7',
  G200: '#E7EAEE',
  G300: '#DBDFE6',
  G400: '#CFD4DE',
  G500: '#A1AAB9',
  G600: '#6D7D9C',
  star: '#FFB800',
};

// 이미지
export const PRODUCT_IMGS = [
  require('../../assets/images/img01.png'),
  require('../../assets/images/img02.png'),
  require('../../assets/images/img03.png'),
];
export const BANNER_IMG = require('../../assets/images/banner03.png');
export const PROFILE_IMG = require('../../assets/images/profileImg.png');
export const USER_IMG = require('../../assets/images/user01.png');

// 탭 / 섹션
export const TABS = ['상품소개', '판매자 정보', '추천상품', '판매자 후기'];
export const SECTION_KEYS = ['intro', 'seller', 'recommend', 'review'] as const;
export type SectionKey = typeof SECTION_KEYS[number];
export const STICKY_HEADER_HEIGHT = 55;

// 서비스 제공 항목 (on: 해당 판매자가 제공하는 서비스)
export const SERVICE_ITEMS = [
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

// 상품 스펙 (API 연동 시 교체)
export const SPEC_ROWS = [
  { label: '제조사', value: '아라요 기계장터' },
  { label: '모델명', value: 'kkma-0000' },
  { label: '제조연월', value: '2025년 01월' },
  { label: '보증기간', value: '2028년 10월' },
];

// 판매자 정보 (API 연동 시 교체)
export const SELLER_INFO = [
  { label: '상호', value: '주식회사 아라요 기계장터' },
  { label: '담당자명', value: '김샘플' },
  { label: '이메일 주소', value: 'sample@sample.com' },
  { label: '전화번호', value: '0501-2345-6789' },
  { label: '사업장 소재지', value: '서울시 강서구' },
  { label: '홈페이지', value: 'https://www.naver.com/', isLink: true },
];

// 평점 분포 (API 연동 시 교체)
export const RATING_BARS = [
  { score: 5, pct: '100%', active: true },
  { score: 4, pct: '20%', active: false },
  { score: 3, pct: '20%', active: false },
  { score: 2, pct: '20%', active: false },
  { score: 1, pct: '20%', active: false },
];
