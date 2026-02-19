/**
 * 홈 화면 목 데이터
 * TODO: API 연동 시 제거
 */

import type {
  Banner,
  RecommendedCompany,
  Product,
  CategoryChip,
  QuickMenu,
} from '../types';

// 배너 데이터
export const BANNERS: Banner[] = [
  {
    id: '1',
    title: '입점 카테고리',
    subtitle: '나만의 기계를 찾아보세요',
    backgroundColor: '#E53935',
    imageUrl: '',
  },
  {
    id: '2',
    title: '신규가입 이벤트',
    subtitle: '웰컴 쿠폰 혜택 제공',
    backgroundColor: '#1976D2',
    imageUrl: '',
  },
  {
    id: '3',
    title: '프리미엄 기업 입점',
    subtitle: '검증된 기업만 모았습니다',
    backgroundColor: '#388E3C',
    imageUrl: '',
  },
];

// 퀵 메뉴 데이터
export const QUICK_MENUS: QuickMenu[] = [
  { id: '1', label: '카테고리', icon: '📂', route: 'CategoryTab' },
  { id: '2', label: '신상품', icon: '🆕', route: 'NewProducts' },
  { id: '3', label: '인기상품', icon: '🔥', route: 'PopularProducts' },
  { id: '4', label: '이벤트', icon: '🎉', route: 'Events' },
];

// 추천 기업 데이터
export const RECOMMENDED_COMPANIES: RecommendedCompany[] = [
  { id: '1', name: '한국기계공업', imageUrl: '', badge: '우수기업', isAd: true },
  { id: '2', name: '대성CNC', imageUrl: '', isAd: true },
  { id: '3', name: '삼성기계', imageUrl: '', badge: '인증기업' },
  { id: '4', name: '두산공작기계', imageUrl: '' },
  { id: '5', name: '현대위아', imageUrl: '', badge: '추천' },
];

// 지역 인기 상품 데이터
export const POPULAR_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'CNC선반 PUMA 240M 도산공작기계',
    description: '도산공작기계 | 경기도 시흥시',
    price: 15000000,
    priceLabel: '1,500만원',
    imageUrl: '',
    location: '경기 시흥',
    date: '3일 전',
    viewCount: 152,
    likeCount: 23,
    tags: ['CNC선반'],
    isHot: true,
  },
  {
    id: '2',
    title: '머시닝센터 DNM500 두산공작기계 2019년식',
    description: '두산공작기계 | 인천 남동구',
    price: 28000000,
    priceLabel: '2,800만원',
    imageUrl: '',
    location: '인천 남동',
    date: '5일 전',
    viewCount: 89,
    likeCount: 15,
    tags: ['머시닝센터'],
  },
  {
    id: '3',
    title: '복합가공기 PUMA MX2100ST 두산',
    description: '복합가공기 전문 | 부산 사상구',
    price: 45000000,
    priceLabel: '4,500만원',
    imageUrl: '',
    location: '부산 사상',
    date: '1주 전',
    viewCount: 201,
    likeCount: 34,
    tags: ['복합가공기'],
    isNew: true,
  },
  {
    id: '4',
    title: '와이어컷 FANUC α-C600iA 2020년식',
    description: '정밀가공 전문 | 대구 달서구',
    price: 32000000,
    priceLabel: '3,200만원',
    imageUrl: '',
    location: '대구 달서',
    date: '2일 전',
    viewCount: 67,
    likeCount: 8,
    tags: ['와이어컷'],
  },
  {
    id: '5',
    title: '프레스 110톤 아이다 갑 상태',
    description: '프레스 전문매매 | 경기 화성시',
    price: 8000000,
    priceLabel: '800만원',
    imageUrl: '',
    location: '경기 화성',
    date: '1일 전',
    viewCount: 43,
    likeCount: 5,
    tags: ['프레스'],
  },
];

// 카테고리 칩 데이터
export const CATEGORY_CHIPS: CategoryChip[] = [
  { id: 'all', label: '전체' },
  { id: 'cnc', label: 'CNC선반' },
  { id: 'machining', label: '머시닝센터' },
  { id: 'complex', label: '복합기' },
  { id: 'grinding', label: '연삭기' },
  { id: 'press', label: '프레스' },
  { id: 'wirecut', label: '와이어컷' },
  { id: 'laser', label: '레이저' },
  { id: 'milling', label: '밀링' },
  { id: 'drilling', label: '드릴링' },
];

// 전체 상품 데이터
export const ALL_PRODUCTS: Product[] = [
  {
    id: '101',
    title: '수평형 머시닝센터 NHC6300 두산 2018년',
    description: '주축 12000rpm, BT50, 60ATC',
    price: 55000000,
    priceLabel: '5,500만원',
    imageUrl: '',
    location: '경기 안산',
    date: '방금 전',
    viewCount: 12,
    likeCount: 2,
    tags: ['머시닝센터', '두산'],
    isNew: true,
    companyName: '안산기계상사',
  },
  {
    id: '102',
    title: 'CNC선반 LYNX 220LM 두산 2020년식',
    description: '서브스핀들, C축, 라이브툴',
    price: 22000000,
    priceLabel: '2,200만원',
    imageUrl: '',
    location: '인천 서구',
    date: '1시간 전',
    viewCount: 34,
    likeCount: 7,
    tags: ['CNC선반', '두산'],
    companyName: '인천CNC매매',
  },
  {
    id: '103',
    title: '방전가공기 SODICK AQ55L 2019년',
    description: '리니어모터, 자동결선',
    price: 38000000,
    priceLabel: '3,800만원',
    imageUrl: '',
    location: '경기 시흥',
    date: '3시간 전',
    viewCount: 56,
    likeCount: 11,
    tags: ['방전가공기'],
    companyName: '시흥정밀기계',
  },
  {
    id: '104',
    title: '연삭기 평면연삭 OKAMOTO PSG-63DX',
    description: '테이블 600x300, 자동연삭',
    price: 9500000,
    priceLabel: '950만원',
    imageUrl: '',
    location: '부산 강서',
    date: '5시간 전',
    viewCount: 28,
    likeCount: 3,
    tags: ['연삭기'],
    companyName: '부산기계장터',
  },
  {
    id: '105',
    title: '레이저 커팅기 TRUMPF 3030 4kW 2017년',
    description: '판재가공, 자동로딩',
    price: 120000000,
    priceLabel: '1억 2,000만원',
    imageUrl: '',
    location: '경남 창원',
    date: '어제',
    viewCount: 198,
    likeCount: 45,
    tags: ['레이저'],
    isHot: true,
    companyName: '창원레이저',
  },
  {
    id: '106',
    title: '밀링머신 터렛밀링 3호기 대만제',
    description: '풀옵션, 상태 양호',
    price: 3500000,
    priceLabel: '350만원',
    imageUrl: '',
    location: '경기 광주',
    date: '어제',
    viewCount: 76,
    likeCount: 9,
    tags: ['밀링'],
    companyName: '광주기계',
  },
];
