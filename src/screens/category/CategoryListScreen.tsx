import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const IMG_01 = require('../../assets/images/img01.png');
const IMG_02 = require('../../assets/images/img02.png');
const IMG_03 = require('../../assets/images/img03.png');
const PROFILE_IMG = require('../../assets/images/profileImg.png');

import RefreshIcon    from '../../assets/icon/refresh-cw.svg';
import ComparisonIcon from '../../assets/icon/comparison.svg';
import CheckIcon      from '../../assets/icon/check.svg';
import TrashIcon      from '../../assets/icon/trash.svg';
import HeartIcon      from '../../assets/icon/heart.svg';
import CommentIcon    from '../../assets/icon/comment.svg';
import SearchIcon     from '../../assets/icon/Search.svg';
import FilterIcon     from '../../assets/icon/filter.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon  from '../../assets/icon/chevron-up.svg';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import PhoneIcon       from '../../assets/icon/phone.svg';
// 서비스 아이콘
import BasketIcon     from '../../assets/icon/product/shopping-basket.svg';
import TruckUpIcon    from '../../assets/icon/product/truck - up.svg';
import WrenchIcon     from '../../assets/icon/product/wrench.svg';
import ScrollIcon     from '../../assets/icon/product/scroll.svg';
import CogIcon        from '../../assets/icon/product/cog.svg';
import TruckDownIcon  from '../../assets/icon/product/truck - down.svg';
import ForkliftIcon   from '../../assets/icon/product/forklift.svg';
import CreditCardIcon from '../../assets/icon/product/credit-card.svg';
import { REGION_DATA, CITIES as REGION_CITIES } from '../../constants/regionData';
import { CATEGORY_DATA, YEARS, MONTHS } from '../../constants/categoryData';

// ─────────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────────
type ItemState = 'hold' | 'used' | 'sold' | 'new' | 'normal';
type ViewType  = 'magazine' | 'grid';
type SortType  = '최신순' | '가격 낮은순' | '가격 높은순' | '조회수순' | '관심 많은순' | '거리순';

interface Product {
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

interface FilterState {
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

// ─────────────────────────────────────────────────
// 색상 팔레트
// ─────────────────────────────────────────────────
const C = {
  primary: '#DB0025',
  black:   '#1B1B1B',
  white:   '#FFFFFF',
  blue:    '#4381ff',
  green:   '#2ecc71',
  orange:  '#E67E22',
  G100: '#F7F7F7',
  G200: '#EEEEEE',
  G300: '#CFCFCF',
  G400: '#B1B1B1',
  G500: '#9E9E9E',
  G600: '#7E7E7E',
  G700: '#333333',
  G800: '#515151',
  border: '#EEEEEE',
} as const;

const BADGE_CONFIG: Record<ItemState, { bg: string; text: string; label: string }> = {
  hold:   { bg: '#2ecc71',      text: C.white, label: '예약중'  },
  used:   { bg: '#FF8C00',      text: C.white, label: '중고'    },
  sold:   { bg: C.white,        text: C.black, label: '판매완료' },
  new:    { bg: '#4381ff',      text: C.white, label: '신품'    },
  normal: { bg: 'transparent',  text: 'transparent', label: '' },
};

const SORT_OPTIONS: SortType[] = ['최신순', '가격 낮은순', '가격 높은순', '조회수순', '관심 많은순', '거리순'];
const PRICE_RANGES = ['전체', '10만원 이하', '10~100만원', '100~1000만원', '1000~2000만원', '2000만원 이상'];
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

const MANUFACTURERS = [
  '화천기계', 'DN솔루션즈(구두산)', 'SMEC(스맥)', '하스(Haas)', '마작(Mazak)',
  'DMG모리(DMG MORI)', '오쿠마(Okuma)', '미쓰비시(Mitsubishi)', '파나소닉(Panasonic)',
  '화낙(Fanuc)', '두산공작기계', '현대위아', '기아기계', '삼성중공업',
];

const CATEGORY_LIST = Object.values(CATEGORY_DATA);

const INITIAL_FILTER: FilterState = {
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

// 서비스 항목 (ProductViewScreen과 동일)
const SERVICE_ITEMS: { name: string; on: boolean; Icon: React.FC<any> }[][] = [
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

/** 서비스 태그 (아이콘 + 이름) - 인라인 스타일 사용 (선언 순서 문제 방지) */
const ServiceTag = ({ name, on, Icon }: { name: string; on: boolean; Icon: React.FC<any> }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 }}>
    <View style={{
      width: 28, height: 28, borderRadius: 14,
      backgroundColor: on ? C.primary : C.G100,
      justifyContent: 'center', alignItems: 'center',
    }}>
      <Icon width={16} height={16} color={on ? C.white : C.G500} />
    </View>
    <Text style={{ fontSize: 12, color: on ? C.primary : C.G500, fontWeight: on ? '600' : '500' }}>{name}</Text>
  </View>
);

const MOCK_PRODUCTS: Product[] = [
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

// 비교결과 모달에서 사용할 상세 데이터 (mock)
const MOCK_COMPARE_DETAIL = {
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

// ─────────────────────────────────────────────────
// 필터 패널 서브 컴포넌트
// ─────────────────────────────────────────────────
const AccordionHeader = ({
  title, currentVal, isActive, expanded, onToggle,
}: { title: string; currentVal?: string; isActive?: boolean; expanded: boolean; onToggle: () => void }) => (
  <TouchableOpacity style={fStyles.accordionHead} onPress={onToggle} activeOpacity={0.7}>
    <Text style={fStyles.accordionTitle}>{title}</Text>
    {currentVal !== undefined && (
      <Text style={[fStyles.accordionVal, isActive && fStyles.accordionValActive]}>{currentVal}</Text>
    )}
    {expanded
      ? <ChevronUpIcon width={16} height={16} color={C.G500} />
      : <ChevronDownIcon width={16} height={16} color={C.G500} />}
  </TouchableOpacity>
);

const RadioRow = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity style={fStyles.radioRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[fStyles.radioOuter, selected && fStyles.radioOuterOn]}>
      {selected && <View style={fStyles.radioInner} />}
    </View>
    <Text style={[fStyles.radioLabel, selected && fStyles.radioLabelOn]}>{label}</Text>
    {selected && <CheckIcon width={14} height={14} color={C.primary} />}
  </TouchableOpacity>
);

const CheckboxRow = ({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) => (
  <TouchableOpacity style={fStyles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[fStyles.checkboxBox, checked && fStyles.checkboxBoxOn]}>
      {checked && <CheckIcon width={10} height={10} color={C.white} />}
    </View>
    <Text style={[fStyles.checkboxLabel, checked && fStyles.checkboxLabelOn]} numberOfLines={1}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────
// 비교 결과 모달
// ─────────────────────────────────────────────────
interface CompareResultModalProps {
  visible: boolean;
  products: Product[];
  onClose: () => void;
}

const SERVICE_LABELS: { key: keyof typeof MOCK_COMPARE_DETAIL.services; label: string }[] = [
  { key: 'customMade', label: '주문제작' },
  { key: 'as', label: 'A/S 가능' },
  { key: 'loading', label: '상차도' },
  { key: 'arrival', label: '도착도' },
  { key: 'install', label: '설치' },
  { key: 'driveTraining', label: '시운전/교육' },
  { key: 'taxInvoice', label: '세금계산서 발행' },
  { key: 'installment', label: '할부가능' },
];

const CompareResultItem = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const badgeCfg = BADGE_CONFIG[product.state];

  return (
    <View style={rStyles.resultItem}>
      {/* 상단: 상호 + 뱃지 */}
      <View style={rStyles.itemHead}>
        <View style={rStyles.storeRow}>
          <Image source={PROFILE_IMG} style={rStyles.storeProfileImg} />
          <Text style={rStyles.storeName}>{MOCK_COMPARE_DETAIL.storeName}</Text>
        </View>
        <View style={[rStyles.stateBadge, { backgroundColor: '#2ecc71' }]}>
          <Text style={[rStyles.stateBadgeText, { color: C.white }]}>예약중</Text>
        </View>
      </View>

      {/* 이미지 */}
      <View style={rStyles.thumbWrap}>
        <Image source={product.image} style={rStyles.thumbImage} resizeMode="cover" />
      </View>

      {/* 기본 정보 */}
      <View style={rStyles.infoBlock}>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>담당자명</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.manager}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>휴대폰번호</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.phone}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>판매 금액</Text>
          <View style={rStyles.priceRow}>
            <Text style={rStyles.priceText}>{product.price.toLocaleString()}원</Text>
            {MOCK_COMPARE_DETAIL.negotiable && (
              <View style={rStyles.negotiableTag}>
                <Text style={rStyles.negotiableTagText}>협의가능</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={rStyles.divider} />

      {/* 상세 정보 */}
      <View style={rStyles.infoBlock}>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>제조사</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.manufacturer}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>모델명</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.model}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>제조연월</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.madeDate}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>제품위치</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.location}</Text>
        </View>
        <View style={rStyles.infoRow}>
          <Text style={rStyles.infoLabel}>보증기간</Text>
          <Text style={rStyles.infoValue}>{MOCK_COMPARE_DETAIL.warranty}</Text>
        </View>
      </View>

      {/* 더보기 확장 */}
      {expanded && (
        <View>
          <View style={rStyles.divider} />
          {/* 서비스 그리드 (2열 4행 아이콘) */}
          <View style={rStyles.serviceSection}>
            <Text style={rStyles.serviceTitle}>서비스</Text>
            <View style={rStyles.srvGrid}>
              {SERVICE_ITEMS.map((col, colIdx) => (
                <View key={colIdx} style={rStyles.srvCol}>
                  {col.map((srv, idx) => (
                    <ServiceTag key={idx} {...srv} />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* 더보기 버튼 */}
      <TouchableOpacity
        style={rStyles.expandBtn}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={rStyles.expandBtnText}>{expanded ? '접기' : '더보기'}</Text>
        {expanded
          ? <ChevronUpIcon width={14} height={14} color={C.G500} />
          : <ChevronDownIcon width={14} height={14} color={C.G500} />}
      </TouchableOpacity>

      {/* 연락하기 버튼 */}
      {!contactOpen ? (
        <TouchableOpacity
          style={rStyles.contactBtn}
          onPress={() => setContactOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={rStyles.contactBtnText}>연락하기</Text>
        </TouchableOpacity>
      ) : (
        <View style={rStyles.contactBtns}>
          <TouchableOpacity style={rStyles.contactSubBtn} activeOpacity={0.8}>
            <Text style={rStyles.contactSubBtnText}>채팅하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={rStyles.contactSubBtn} activeOpacity={0.8}>
            <Text style={rStyles.contactSubBtnText}>전화하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={rStyles.contactSubBtn} activeOpacity={0.8}>
            <Text style={rStyles.contactSubBtnText}>문자하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const CompareResultModal = ({ visible, products, onClose }: CompareResultModalProps) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(SCREEN_HEIGHT);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={rStyles.overlay}>
        <Pressable style={rStyles.backdrop} onPress={handleClose} />
        <Animated.View style={[rStyles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* 헤더 */}
            <View style={rStyles.sheetHead}>
              <View style={rStyles.sheetHandle} />
              <View style={rStyles.sheetTitleRow}>
                <Text style={rStyles.sheetTitle}>
                  비교하기 <Text style={{ color: C.primary }}>({products.length})</Text>
                </Text>
                <TouchableOpacity onPress={handleClose} style={rStyles.sheetCloseBtn} activeOpacity={0.7}>
                  <Text style={rStyles.sheetCloseBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 상품 목록 */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={rStyles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {products.length === 0 ? (
                <View style={rStyles.emptyWrap}>
                  <Text style={rStyles.emptyText}>비교할 상품이 없습니다.</Text>
                </View>
              ) : (
                products.map((product, idx) => (
                  <View key={product.id}>
                    <CompareResultItem product={product} />
                    {idx < products.length - 1 && <View style={rStyles.itemDivider} />}
                  </View>
                ))
              )}
              <View style={{ height: 40 }} />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ─────────────────────────────────────────────────
// 필터 패널 (우측 드로어)
// ─────────────────────────────────────────────────
interface FilterPanelProps {
  visible: boolean;
  filter: FilterState;
  onFilterChange: (f: FilterState) => void;
  onClose: () => void;
  onReset: () => void;
  selectedCategory: string;
  selectedSubCategory: string;
  onCategorySelect: (category: string, sub: string) => void;
}

const FilterPanel = ({
  visible, filter, onFilterChange, onClose, onReset,
  selectedCategory, selectedSubCategory, onCategorySelect,
}: FilterPanelProps) => {
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [expanded, setExpanded] = useState({
    category: true,
    productType: false,
    saleStatus: false,
    manufacturer: false,
    location: false,
    price: false,
    date: false,
  });
  const [mfSearch, setMfSearch] = useState('');
  const [selectModal, setSelectModal] = useState<{
    visible: boolean;
    title: string;
    options: string[];
    selected: string;
    onSelect: (v: string) => void;
  }>({ visible: false, title: '', options: [], selected: '', onSelect: () => {} });

  const openSelectModal = (title: string, options: string[], selected: string, onSelect: (v: string) => void) => {
    setSelectModal({ visible: true, title, options, selected, onSelect });
  };

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(DRAWER_WIDTH);
      backdropOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(backdropOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const animateClose = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
      Animated.timing(backdropOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => callback());
  };

  const handleClose = () => animateClose(onClose);
  const toggle = (key: keyof typeof expanded) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleManufacturer = (name: string) => {
    const next = filter.manufacturers.includes(name)
      ? filter.manufacturers.filter(m => m !== name)
      : [...filter.manufacturers, name];
    onFilterChange({ ...filter, manufacturers: next });
  };

  const filteredMf = MANUFACTURERS.filter(m => m.toLowerCase().includes(mfSearch.toLowerCase()));

  const mfVal = filter.manufacturers.length > 0
    ? filter.manufacturers[0] + (filter.manufacturers.length > 1 ? ` 외 ${filter.manufacturers.length - 1}` : '')
    : '전체';

  const locationVal = filter.city
    ? filter.county ? `${filter.city} ${filter.county}` : filter.city
    : '전체';
  const priceVal = filter.priceRange !== '전체'
    ? filter.priceRange
    : (filter.priceMin || filter.priceMax) ? `${filter.priceMin || '0'}~${filter.priceMax || '∞'}` : '전체';
  const dateFromStr = filter.dateFromYear ? `${filter.dateFromYear} ${filter.dateFromMonth}` : '';
  const dateToStr = filter.dateToYear ? `${filter.dateToYear} ${filter.dateToMonth}` : '';
  const dateVal = dateFromStr || dateToStr ? `${dateFromStr || '?'}~${dateToStr || '?'}` : '전체';

  const counties = filter.city ? REGION_DATA[filter.city] || [] : [];

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={fStyles.drawerOverlay}>
        <Animated.View style={[fStyles.drawerBackdrop, { opacity: backdropOpacity }]}>
          <Pressable style={{ flex: 1 }} onPress={handleClose} />
        </Animated.View>
        <Animated.View style={[fStyles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={fStyles.drawerInner}>
            <View style={fStyles.panelHead}>
              <Text style={fStyles.panelTitle}>필터</Text>
              <TouchableOpacity onPress={handleClose} style={fStyles.closeBtn} activeOpacity={0.7}>
                <Text style={fStyles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={fStyles.scrollArea} showsVerticalScrollIndicator={false}>
              <View style={fStyles.searchSection}>
                <View style={fStyles.searchWrap}>
                  <SearchIcon width={18} height={18} color={C.G400} />
                  <TextInput
                    style={fStyles.searchInput}
                    placeholder="어떤 설비를 찾으세요?"
                    placeholderTextColor={C.G400}
                    value={filter.searchText}
                    onChangeText={text => onFilterChange({ ...filter, searchText: text })}
                  />
                  {filter.searchText.length > 0 && (
                    <TouchableOpacity onPress={() => onFilterChange({ ...filter, searchText: '' })}>
                      <Text style={fStyles.searchClear}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="카테고리" expanded={expanded.category} onToggle={() => toggle('category')} />
                {expanded.category && (
                  <View style={fStyles.body}>
                    {CATEGORY_LIST.map(cat => (
                      <View key={cat.title}>
                        <View style={fStyles.catGroupHeader}>
                          <Text style={fStyles.catGroupTitle}>{cat.title}</Text>
                        </View>
                        {cat.sub.map(sub => {
                          const isSelected = selectedCategory === cat.title && selectedSubCategory === sub;
                          return (
                            <TouchableOpacity
                              key={sub}
                              style={[fStyles.catSubRow, isSelected && fStyles.catSubRowOn]}
                              onPress={() => onCategorySelect(cat.title, sub)}
                              activeOpacity={0.7}
                            >
                              <Text style={[fStyles.catSubText, isSelected && fStyles.catSubTextOn]}>{sub}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="제품 유형" currentVal={filter.productType} isActive={filter.productType !== '전체'} expanded={expanded.productType} onToggle={() => toggle('productType')} />
                {expanded.productType && (
                  <View style={fStyles.body}>
                    {(['전체', '신품', '중고'] as const).map(opt => (
                      <RadioRow key={opt} label={opt} selected={filter.productType === opt} onPress={() => onFilterChange({ ...filter, productType: opt })} />
                    ))}
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="판매 상태" currentVal={filter.saleStatus} isActive={filter.saleStatus !== '전체'} expanded={expanded.saleStatus} onToggle={() => toggle('saleStatus')} />
                {expanded.saleStatus && (
                  <View style={fStyles.body}>
                    {(['전체', '판매중', '판매완료'] as const).map(opt => (
                      <RadioRow key={opt} label={opt} selected={filter.saleStatus === opt} onPress={() => onFilterChange({ ...filter, saleStatus: opt })} />
                    ))}
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="제조사" currentVal={mfVal} isActive={filter.manufacturers.length > 0} expanded={expanded.manufacturer} onToggle={() => toggle('manufacturer')} />
                {expanded.manufacturer && (
                  <View style={fStyles.body}>
                    <View style={fStyles.mfSearchWrap}>
                      <TextInput style={fStyles.mfSearchInput} placeholder="제조사 검색" placeholderTextColor={C.G400} value={mfSearch} onChangeText={setMfSearch} />
                    </View>
                    {filteredMf.map(m => (
                      <CheckboxRow key={m} label={m} checked={filter.manufacturers.includes(m)} onPress={() => toggleManufacturer(m)} />
                    ))}
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="제품 위치" currentVal={locationVal} isActive={!!filter.city} expanded={expanded.location} onToggle={() => toggle('location')} />
                {expanded.location && (
                  <View style={fStyles.body}>
                    <View style={fStyles.selectRow}>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => openSelectModal('시/도 선택', REGION_CITIES, filter.city, (v) => { onFilterChange({ ...filter, city: v, county: '' }); })}>
                        <Text style={[fStyles.selectBtnText, filter.city && fStyles.selectBtnTextActive]}>{filter.city || '시/도 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => { if (!filter.city) return; openSelectModal('구/군 선택', counties, filter.county, (v) => { onFilterChange({ ...filter, county: v }); }); }}>
                        <Text style={[fStyles.selectBtnText, filter.county && fStyles.selectBtnTextActive]}>{filter.county || '구/군 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="제품 가격" currentVal={priceVal} isActive={priceVal !== '전체'} expanded={expanded.price} onToggle={() => toggle('price')} />
                {expanded.price && (
                  <View style={fStyles.body}>
                    <View style={fStyles.priceInputRow}>
                      <TextInput style={fStyles.priceInput} placeholder="최소금액" placeholderTextColor={C.G400} keyboardType="numeric" value={filter.priceMin} onChangeText={t => onFilterChange({ ...filter, priceMin: t, priceRange: '전체' })} />
                      <Text style={fStyles.priceTilde}>~</Text>
                      <TextInput style={fStyles.priceInput} placeholder="최대금액" placeholderTextColor={C.G400} keyboardType="numeric" value={filter.priceMax} onChangeText={t => onFilterChange({ ...filter, priceMax: t, priceRange: '전체' })} />
                    </View>
                    {PRICE_RANGES.map(opt => (
                      <RadioRow key={opt} label={opt} selected={filter.priceRange === opt} onPress={() => onFilterChange({ ...filter, priceRange: opt, priceMin: '', priceMax: '' })} />
                    ))}
                  </View>
                )}
              </View>
              <View style={fStyles.section}>
                <AccordionHeader title="제조 연월" currentVal={dateVal} isActive={dateVal !== '전체'} expanded={expanded.date} onToggle={() => toggle('date')} />
                {expanded.date && (
                  <View style={fStyles.body}>
                    <Text style={fStyles.dateSubLabel}>시작</Text>
                    <View style={fStyles.selectRow}>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => openSelectModal('시작 연도', YEARS, filter.dateFromYear, (v) => { onFilterChange({ ...filter, dateFromYear: v }); })}>
                        <Text style={[fStyles.selectBtnText, filter.dateFromYear && fStyles.selectBtnTextActive]}>{filter.dateFromYear || '연도 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => openSelectModal('시작 월', MONTHS, filter.dateFromMonth, (v) => { onFilterChange({ ...filter, dateFromMonth: v }); })}>
                        <Text style={[fStyles.selectBtnText, filter.dateFromMonth && fStyles.selectBtnTextActive]}>{filter.dateFromMonth || '월 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[fStyles.dateSubLabel, { marginTop: 12 }]}>종료</Text>
                    <View style={fStyles.selectRow}>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => openSelectModal('종료 연도', YEARS, filter.dateToYear, (v) => { onFilterChange({ ...filter, dateToYear: v }); })}>
                        <Text style={[fStyles.selectBtnText, filter.dateToYear && fStyles.selectBtnTextActive]}>{filter.dateToYear || '연도 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity style={fStyles.selectBtn} activeOpacity={0.7} onPress={() => openSelectModal('종료 월', MONTHS, filter.dateToMonth, (v) => { onFilterChange({ ...filter, dateToMonth: v }); })}>
                        <Text style={[fStyles.selectBtnText, filter.dateToMonth && fStyles.selectBtnTextActive]}>{filter.dateToMonth || '월 선택'}</Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <View style={{ height: 20 }} />
            </ScrollView>
            <View style={fStyles.bottomBtns}>
              <TouchableOpacity style={fStyles.resetBtn} onPress={onReset} activeOpacity={0.7}>
                <RefreshIcon width={16} height={16} color={C.G600} />
                <Text style={fStyles.resetBtnText}>초기화</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>

      <Modal visible={selectModal.visible} transparent animationType="slide" onRequestClose={() => setSelectModal(prev => ({ ...prev, visible: false }))}>
        <Pressable style={fStyles.selectOverlay} onPress={() => setSelectModal(prev => ({ ...prev, visible: false }))}>
          <View style={fStyles.selectBox}>
            <View style={fStyles.selectBoxHead}>
              <Text style={fStyles.selectBoxTitle}>{selectModal.title}</Text>
              <TouchableOpacity onPress={() => setSelectModal(prev => ({ ...prev, visible: false }))} activeOpacity={0.7}>
                <Text style={fStyles.selectBoxClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={fStyles.selectBoxScroll} showsVerticalScrollIndicator={false}>
              {selectModal.options.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[fStyles.selectOption, selectModal.selected === opt && fStyles.selectOptionActive]}
                  onPress={() => { selectModal.onSelect(opt); setSelectModal(prev => ({ ...prev, visible: false })); }}
                  activeOpacity={0.7}
                >
                  <Text style={[fStyles.selectOptionText, selectModal.selected === opt && fStyles.selectOptionTextActive]}>{opt}</Text>
                  {selectModal.selected === opt && <CheckIcon width={14} height={14} color={C.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </Modal>
  );
};

// ─────────────────────────────────────────────────
// 상품 아이템 (magazine)
// ─────────────────────────────────────────────────
interface ProductItemProps {
  item: Product;
  isCompared: boolean;
  onCompareToggle: (id: string) => void;
  onLikeToggle: (id: string) => void;
  onPress: (id: string) => void;
  isSoldOpacity: boolean;
}

const ProductItemMagazine = React.memo(({
  item, isCompared, onCompareToggle, onLikeToggle, onPress,
}: ProductItemProps) => {
  const badgeCfg = BADGE_CONFIG[item.state];
  const isHold = item.state === 'hold';

  return (
    <TouchableOpacity style={styles.productItem} onPress={() => onPress(item.id)} activeOpacity={0.8}>
      <View style={styles.thumbWrap}>
        <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
        {isHold && (
          <View style={styles.holdOverlay}>
            <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
          </View>
        )}
        {item.state !== 'normal' && (
          <View style={[styles.stateBadge, { backgroundColor: badgeCfg.bg }, item.state === 'sold' && styles.stateBadgeSold]}>
            <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>{badgeCfg.label}</Text>
          </View>
        )}
        {item.isAd && (
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>AD</Text>
          </View>
        )}
        <TouchableOpacity style={styles.likeBtn} onPress={() => onLikeToggle(item.id)} activeOpacity={0.7}>
          <HeartIcon width={18} height={18} color={item.isLiked ? C.primary : C.G400} />
        </TouchableOpacity>
      </View>
      <View style={styles.conWrap}>
        {/* 상단: 제목 + 태그 */}
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
            <TouchableOpacity onPress={() => onCompareToggle(item.id)} style={styles.compareIconBtn} activeOpacity={0.7}>
              <ComparisonIcon width={18} height={18} color={isCompared ? C.primary : C.G400} />
            </TouchableOpacity>
          </View>
          <Text style={styles.productTags} numberOfLines={1}>{item.tags}</Text>
        </View>
        {/* 하단: 가격 + 메타 */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.timeAgo}</Text>
            <HeartIcon width={14} height={14} color={C.black} />
            <Text style={styles.metaText}>{item.likes}</Text>
            <CommentIcon width={14} height={14} color={C.black} />
            <Text style={styles.metaText}>{item.reviews}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ─────────────────────────────────────────────────
// 상품 아이템 (grid)
// ─────────────────────────────────────────────────
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;

const ProductItemGrid = React.memo(({
  item, isCompared, onCompareToggle, onLikeToggle, onPress,
}: ProductItemProps) => {
  const badgeCfg = BADGE_CONFIG[item.state];
  const isHold = item.state === 'hold';

  return (
    <TouchableOpacity style={styles.gridItem} onPress={() => onPress(item.id)} activeOpacity={0.8}>
      <View style={styles.gridThumbWrap}>
        <Image source={item.image} style={styles.gridThumbImage} resizeMode="cover" />
        {isHold && (
          <View style={styles.holdOverlay}>
            <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
          </View>
        )}
        {item.state !== 'normal' && (
          <View style={[styles.stateBadge, { backgroundColor: badgeCfg.bg }, item.state === 'sold' && styles.stateBadgeSold]}>
            <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>{badgeCfg.label}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.gridLikeBtn} onPress={() => onLikeToggle(item.id)} activeOpacity={0.7}>
          <HeartIcon width={18} height={18} color={item.isLiked ? C.primary : C.G400} />
        </TouchableOpacity>
      </View>
      <View style={styles.gridCon}>
        <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.gridTags} numberOfLines={1}>{item.tags}</Text>
        <View style={styles.gridPriceRow}>
          <Text style={styles.gridPrice}>{item.price.toLocaleString()}원</Text>
          <Text style={styles.gridMeta}>{item.timeAgo}</Text>
        </View>
        <TouchableOpacity
          style={[styles.gridCompareBtn, isCompared && styles.gridCompareBtnActive]}
          onPress={() => onCompareToggle(item.id)}
          activeOpacity={0.7}
        >
          <CheckIcon width={14} height={14} color={isCompared ? C.white : '#3B3B3B'} />
          <Text style={[styles.gridCompareBtnText, isCompared && styles.gridCompareBtnTextActive]}>비교하기</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

// ─────────────────────────────────────────────────
// 정렬 드롭다운
// ─────────────────────────────────────────────────
interface SortModalProps {
  visible: boolean;
  selected: SortType;
  onSelect: (v: SortType) => void;
  onClose: () => void;
  anchorLayout: { x: number; y: number; width: number; height: number };
}

const SortModal = ({ visible, selected, onSelect, onClose, anchorLayout }: SortModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <View style={[styles.sortDropdown, {
        position: 'absolute',
        top: anchorLayout.y + anchorLayout.height + 4,
        left: anchorLayout.x,
        width: anchorLayout.width,
      }]}>
        {SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.sortOption, selected === opt && styles.sortOptionActive]}
            onPress={() => { onSelect(opt); onClose(); }}
          >
            <Text style={[styles.sortOptionText, selected === opt && styles.sortOptionTextActive]}>{opt}</Text>
            {selected === opt && <Text style={styles.sortCheckMark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  </Modal>
);

// ─────────────────────────────────────────────────
// 비교 패널
// ─────────────────────────────────────────────────
const COMPARE_CARD_WIDTH = (SCREEN_WIDTH - 32 - 10) / 2;

interface ComparePanelProps {
  products: Product[];
  onRemove: (id: string) => void;
  onReset: () => void;
  onViewResult: () => void;
  onClose: () => void;
}

const ComparePanel = ({ products, onRemove, onReset, onViewResult, onClose }: ComparePanelProps) => {
  const slots: (Product | null)[] = [...products];
  while (slots.length < 6) slots.push(null);
  const rows: (Product | null)[][] = [];
  for (let i = 0; i < slots.length; i += 2) rows.push([slots[i], slots[i + 1]]);

  return (
    <View style={styles.comparePanelWrap}>
      <TouchableOpacity style={styles.panelToggleBtn} onPress={onClose} activeOpacity={0.8}>
        <Text style={styles.panelToggleArrow}>▼</Text>
      </TouchableOpacity>
      <View style={styles.comparePanel}>
        <View style={styles.panelHead}>
          <Text style={styles.panelTitle}>
            카테고리별 제품 비교하기 <Text style={{ color: C.primary }}>{products.length}</Text>/6
          </Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.panelCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.panelSlotsGrid} showsVerticalScrollIndicator={false}>
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.panelGridRow}>
              {row.map((product, colIdx) =>
                product ? (
                  <View key={product.id} style={styles.panelCard}>
                    <View style={styles.panelCardThumbWrap}>
                      <Image source={product.image} style={styles.panelCardThumbImage} resizeMode="cover" />
                      <TouchableOpacity style={styles.panelCardTrashBtn} onPress={() => onRemove(product.id)} activeOpacity={0.7}>
                        <TrashIcon width={20} height={20} color={C.G600} />
                      </TouchableOpacity>
                      {product.state !== 'normal' && (
                        <View style={[styles.stateBadge, { backgroundColor: BADGE_CONFIG[product.state].bg }, product.state === 'sold' && styles.stateBadgeSold]}>
                          <Text style={[styles.stateBadgeText, { color: BADGE_CONFIG[product.state].text }]}>{BADGE_CONFIG[product.state].label}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.panelCardCon}>
                      <Text style={styles.panelCardTitle} numberOfLines={2}>{product.title}</Text>
                      <Text style={styles.panelCardTags} numberOfLines={1}>{product.tags}</Text>
                      <Text style={styles.panelCardPrice}>{product.price.toLocaleString()}원</Text>
                      <View style={styles.panelCardMetaRow}>
                        <Text style={styles.panelCardMeta}>{product.timeAgo}</Text>
                        <View style={styles.metaDot} />
                        <Text style={styles.panelCardMeta}>관심 {product.likes}</Text>
                        <View style={styles.metaDot} />
                        <Text style={styles.panelCardMeta}>후기 {product.reviews}</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={`empty-${rowIdx}-${colIdx}`} style={styles.panelCardEmpty}>
                    <Text style={styles.panelSlotEmptyText}>+</Text>
                  </View>
                )
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.panelBtns}>
          <TouchableOpacity style={styles.panelBtnReset} onPress={onReset}>
            <RefreshIcon width={16} height={16} color={C.G600} />
            <Text style={styles.panelBtnResetText}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelBtnResult} onPress={onViewResult}>
            <Text style={styles.panelBtnResultText}>결과보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────
// 필터 개수 카운터
// ─────────────────────────────────────────────────
const countActiveFilters = (f: FilterState) => {
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

// ─────────────────────────────────────────────────
// 메인 스크린
// ─────────────────────────────────────────────────
export default function ProductListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const initialCategory = route.params?.category ?? '공작기계';
  const initialSubCategory = route.params?.subCategory ?? 'CNC 선반';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [viewType, setViewType] = useState<ViewType>('magazine');
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareVisible, setCompareVisible] = useState(false);
  const [compareResultVisible, setCompareResultVisible] = useState(false); // ← 결과보기 모달 상태

  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(INITIAL_FILTER);
  const [filterVisible, setFilterVisible] = useState(false);

  const sortBtnRef = useRef<View>(null);
  const [sortBtnLayout, setSortBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const openSortModal = useCallback(() => {
    sortBtnRef.current?.measureInWindow((x, y, width, height) => {
      setSortBtnLayout({ x, y, width, height });
      setSortVisible(true);
    });
  }, []);

  const openFilter = useCallback(() => {
    setFilter(appliedFilter);
    setFilterVisible(true);
  }, [appliedFilter]);

  const resetFilter = useCallback(() => setFilter(INITIAL_FILTER), []);
  const activeFilterCount = React.useMemo(() => countActiveFilters(appliedFilter), [appliedFilter]);

  const handleProductPress = useCallback((id: string) => {
    navigation.navigate('ProductView', { productId: id });
  }, [navigation]);

  const handleLikeToggle = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p));
  }, []);

  const handleCompareToggle = useCallback((id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        const next = prev.filter(x => x !== id);
        if (next.length === 0) setCompareVisible(false);
        return next;
      }
      if (prev.length >= 6) return prev;
      return [...prev, id];
    });
  }, []);

  const handleCompareReset = useCallback(() => {
    setCompareList([]);
    setCompareVisible(false);
    setCompareResultVisible(false);
  }, []);

  // ← 결과보기 클릭 핸들러
  const handleViewResult = useCallback(() => {
    setCompareResultVisible(true);
  }, []);

  const gridPairs = React.useMemo(() => {
    const pairs: (Product | null)[][] = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push([products[i], products[i + 1] ?? null]);
    }
    return pairs;
  }, [products]);

  const ListHeader = useCallback(() => (
    <>
      <View style={styles.bannerWrap}>
        <TouchableOpacity activeOpacity={0.9}>
          <Image source={IMG_01} style={styles.bannerImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]}
          onPress={openFilter}
          activeOpacity={0.7}
        >
          <FilterIcon width={20} height={20} color={activeFilterCount > 0 ? C.white : C.primary} />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity ref={sortBtnRef as any} style={styles.sortBtn} onPress={openSortModal} activeOpacity={0.7}>
          <Text style={styles.sortBtnText}>{selectedSort}</Text>
          <ChevronDownIcon width={16} height={16} color={C.G500} />
        </TouchableOpacity>
      </View>
      <View style={styles.productHead}>
        <View style={styles.categoryPath}>
          <Text style={styles.categoryDep1}>{selectedCategory}</Text>
          <Text style={styles.categoryArrow}> › </Text>
          <Text style={styles.categoryDep2}>{selectedSubCategory}</Text>
        </View>
        <Text style={styles.itemCount}>123개</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleBtn, viewType === 'magazine' && styles.viewToggleBtnActive]}
            onPress={() => setViewType('magazine')}
          >
            <View style={styles.iconMagazine}>
              {[0, 1, 2].map(i => (
                <View key={i} style={[styles.iconMagazineLine, viewType === 'magazine' && { backgroundColor: C.primary }]} />
              ))}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleBtn, viewType === 'grid' && styles.viewToggleBtnActive]}
            onPress={() => setViewType('grid')}
          >
            <View style={styles.iconGrid}>
              {[0, 1, 2, 3].map(i => (
                <View key={i} style={[styles.iconGridCell, viewType === 'grid' && { backgroundColor: C.primary }]} />
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ), [viewType, activeFilterCount, selectedSort, openFilter, openSortModal, selectedCategory, selectedSubCategory]);

  const renderItem = useCallback(
    ({ item }: { item: Product | (Product | null)[] }) => {
      if (viewType === 'magazine') {
        const p = item as Product;
        return (
          <ProductItemMagazine
            item={p} isCompared={compareList.includes(p.id)}
            onCompareToggle={handleCompareToggle} onLikeToggle={handleLikeToggle}
            onPress={handleProductPress} isSoldOpacity={p.state === 'sold'}
          />
        );
      } else {
        const pair = item as (Product | null)[];
        return (
          <View style={styles.gridRow}>
            {pair.map((p, idx) =>
              p ? (
                <ProductItemGrid
                  key={p.id} item={p} isCompared={compareList.includes(p.id)}
                  onCompareToggle={handleCompareToggle} onLikeToggle={handleLikeToggle}
                  onPress={handleProductPress} isSoldOpacity={p.state === 'sold'}
                />
              ) : (
                <View key={`empty-${idx}`} style={[styles.gridItem, { opacity: 0 }]} />
              )
            )}
          </View>
        );
      }
    },
    [viewType, compareList, handleCompareToggle, handleLikeToggle, handleProductPress]
  );

  const data = viewType === 'magazine' ? products : gridPairs;
  const keyExtractor = useCallback(
    (item: any, index: number) => viewType === 'magazine' ? (item as Product).id : `pair-${index}`,
    [viewType]
  );

  const compareProducts = products.filter(p => compareList.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeftIcon width={28} height={28} color={C.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCategory}</Text>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Search')} activeOpacity={0.7}>
          <SearchIcon width={22} height={22} color={C.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data as any[]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={[
          styles.listContent,
          compareList.length > 0 && !compareVisible && { paddingBottom: 80 },
          compareVisible && { paddingBottom: SCREEN_HEIGHT * 0.65 },
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />

      {/* 축소 비교 바 */}
      {!compareVisible && compareList.length > 0 && (
        <View style={styles.compareBarWrap}>
          <TouchableOpacity style={styles.barToggleBtn} onPress={() => setCompareVisible(true)} activeOpacity={0.8}>
            <Text style={styles.panelToggleArrow}>▲</Text>
          </TouchableOpacity>
          <View style={styles.compareBar}>
            <Text style={styles.compareBarTitle}>
              카테고리별 제품 비교하기 <Text style={{ color: C.primary }}>{compareList.length}</Text>/6
            </Text>
            <TouchableOpacity onPress={handleCompareReset} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.compareBarClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 비교 패널 확장 */}
      {compareVisible && compareList.length > 0 && (
        <ComparePanel
          products={compareProducts}
          onRemove={handleCompareToggle}
          onReset={handleCompareReset}
          onViewResult={handleViewResult}   // ← 결과보기 연결
          onClose={() => setCompareVisible(false)}
        />
      )}

      {/* 정렬 모달 */}
      <SortModal
        visible={sortVisible} selected={selectedSort}
        onSelect={setSelectedSort} onClose={() => setSortVisible(false)}
        anchorLayout={sortBtnLayout}
      />

      {/* 필터 패널 */}
      <FilterPanel
        visible={filterVisible}
        filter={filter}
        onFilterChange={(f) => { setFilter(f); setAppliedFilter(f); }}
        onClose={() => setFilterVisible(false)}
        onReset={() => { resetFilter(); setAppliedFilter(INITIAL_FILTER); }}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onCategorySelect={(cat, sub) => { setSelectedCategory(cat); setSelectedSubCategory(sub); }}
      />

      {/* ← 비교 결과 모달 */}
      <CompareResultModal
        visible={compareResultVisible}
        products={compareProducts}
        onClose={() => setCompareResultVisible(false)}
      />
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────
// 비교 결과 모달 스타일
// ─────────────────────────────────────────────────
const rStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    height: SCREEN_HEIGHT * 0.92,
    backgroundColor: C.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.15, shadowRadius: 20 },
      android: { elevation: 24 },
    }),
  },
  sheetHead: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.G300,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.black,
  },
  sheetCloseBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetCloseBtnText: {
    fontSize: 18,
    color: C.G600,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 15,
    color: C.G500,
  },
  itemDivider: {
    height: 1,
    backgroundColor: C.G200,
    marginVertical: 20,
  },

  // 결과 아이템
  resultItem: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.G200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
  },
  itemHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: C.G100,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.white,
  },
  storeProfileImg: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: C.black,
  },
  stateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stateBadgeSold: {
    borderWidth: 1,
    borderColor: C.G300,
  },
  stateBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  thumbWrap: {
    width: '100%',
    height: 200,
    backgroundColor: C.G100,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  infoBlock: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoLabel: {
    width: 80,
    fontSize: 13,
    color: C.G600,
    fontWeight: '500',
    flexShrink: 0,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: C.black,
    fontWeight: '500',
  },
  priceRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.black,
  },
  negotiableTag: {
    backgroundColor: '#FFF0F2',
    borderWidth: 1,
    borderColor: '#FFB3BE',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  negotiableTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: C.primary,
  },
  divider: {
    height: 1,
    backgroundColor: C.G100,
    marginHorizontal: 14,
  },
  // 서비스 섹션
  serviceSection: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.black,
    marginBottom: 10,
  },
  serviceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  srvGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  srvCol: {
    flex: 1,
    gap: 8,
  },
  serviceTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: C.G100,
    borderWidth: 1,
    borderColor: C.G200,
  },
  serviceTagOn: {
    backgroundColor: '#EEF3FF',
    borderColor: '#C5D5FF',
  },
  serviceTagText: {
    fontSize: 12,
    color: C.G500,
    fontWeight: '500',
  },
  serviceTagTextOn: {
    color: C.blue,
    fontWeight: '600',
  },
  // 더보기 버튼
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.G100,
    gap: 4,
  },
  expandBtnText: {
    fontSize: 13,
    color: C.G500,
    fontWeight: '500',
  },
  // 연락하기 버튼
  contactBtn: {
    marginHorizontal: 14,
    marginBottom: 14,
    height: 48,
    backgroundColor: C.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.white,
  },
  contactBtns: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginBottom: 14,
    gap: 8,
  },
  contactSubBtn: {
    flex: 1,
    height: 44,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactSubBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.black,
  },
});

// ─────────────────────────────────────────────────
// 필터 패널 스타일
// ─────────────────────────────────────────────────
const fStyles = StyleSheet.create({
  drawerOverlay: { flex: 1, flexDirection: 'row' },
  drawerBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  drawerContainer: {
    position: 'absolute', top: 0, bottom: 0, right: 0,
    width: DRAWER_WIDTH, backgroundColor: C.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: -4, height: 0 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 24 },
    }),
  },
  drawerInner: { flex: 1, backgroundColor: C.white },
  panelHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  panelTitle: { fontSize: 17, fontWeight: '700', color: C.black },
  closeBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { fontSize: 18, color: C.G600 },
  scrollArea: { flex: 1 },
  searchSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', height: 44,
    borderWidth: 1, borderColor: C.G300, borderRadius: 6,
    paddingHorizontal: 12, gap: 8, backgroundColor: C.white,
  },
  searchInput: { flex: 1, fontSize: 14, color: C.black, padding: 0 },
  searchClear: { fontSize: 14, color: C.G400, padding: 4 },
  section: { borderBottomWidth: 1, borderBottomColor: C.border },
  accordionHead: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 15, gap: 8,
  },
  accordionTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: C.black },
  accordionVal: { fontSize: 13, color: C.G500 },
  accordionValActive: { color: C.primary, fontWeight: '600' },
  body: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: C.G100 },
  catGroupHeader: { backgroundColor: C.G200, paddingHorizontal: 12, paddingVertical: 8 },
  catGroupTitle: { fontSize: 13, fontWeight: '700', color: C.G700 },
  catSubRow: {
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: C.G200, backgroundColor: C.white,
  },
  catSubRowOn: { backgroundColor: '#fff5f7' },
  catSubText: { fontSize: 14, color: C.black },
  catSubTextOn: { color: C.primary, fontWeight: '600' },
  radioRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 11, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.G200,
  },
  radioOuter: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1.5, borderColor: C.G300, justifyContent: 'center', alignItems: 'center',
  },
  radioOuterOn: { borderColor: C.primary },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary },
  radioLabel: { flex: 1, fontSize: 14, color: C.black },
  radioLabelOn: { color: C.primary, fontWeight: '600' },
  checkboxRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.G200,
  },
  checkboxBox: {
    width: 18, height: 18, borderRadius: 3,
    borderWidth: 1.5, borderColor: C.G300, justifyContent: 'center', alignItems: 'center', backgroundColor: C.white,
  },
  checkboxBoxOn: { backgroundColor: C.primary, borderColor: C.primary },
  checkboxLabel: { flex: 1, fontSize: 14, color: C.black },
  checkboxLabelOn: { color: C.primary, fontWeight: '600' },
  mfSearchWrap: { paddingTop: 12, paddingBottom: 8 },
  mfSearchInput: {
    height: 40, borderWidth: 1, borderColor: C.G300, borderRadius: 6,
    paddingHorizontal: 12, fontSize: 14, color: C.black, backgroundColor: C.white,
  },
  selectRow: { flexDirection: 'row', gap: 8, paddingTop: 12 },
  selectBtn: {
    flex: 1, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: C.G300, borderRadius: 6, paddingHorizontal: 12, backgroundColor: C.white,
  },
  selectBtnText: { fontSize: 14, color: C.G400 },
  selectBtnTextActive: { color: C.black, fontWeight: '500' },
  selectOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  selectBox: {
    backgroundColor: C.white, borderTopLeftRadius: 16, borderTopRightRadius: 16,
    maxHeight: SCREEN_HEIGHT * 0.5, paddingBottom: Platform.OS === 'ios' ? 28 : 16,
  },
  selectBoxHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  selectBoxTitle: { fontSize: 16, fontWeight: '700', color: C.black },
  selectBoxClose: { fontSize: 18, color: C.G600, padding: 4 },
  selectBoxScroll: { paddingHorizontal: 16 },
  selectOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: C.G100,
  },
  selectOptionActive: { backgroundColor: '#fff5f7' },
  selectOptionText: { fontSize: 14, color: C.black },
  selectOptionTextActive: { color: C.primary, fontWeight: '600' },
  dateSubLabel: { fontSize: 13, fontWeight: '600', color: C.G700, marginTop: 12 },
  priceInputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 12, paddingBottom: 4 },
  priceInput: {
    flex: 1, height: 44, borderWidth: 1, borderColor: C.G300, borderRadius: 6,
    paddingHorizontal: 12, fontSize: 14, color: C.black, backgroundColor: C.white,
  },
  priceTilde: { fontSize: 16, color: C.G500, fontWeight: '500' },
  bottomBtns: {
    flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.white,
  },
  resetBtn: {
    flex: 1, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: C.G100, borderRadius: 8, borderWidth: 1, borderColor: C.G200,
  },
  resetBtnText: { fontSize: 15, fontWeight: '600', color: C.G600 },
});

// ─────────────────────────────────────────────────
// 메인 스타일
// ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  header: {
    flexDirection: 'row', alignItems: 'center', height: 52,
    paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.white,
  },
  headerIconBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: C.black, letterSpacing: -0.3 },
  bannerWrap: { paddingHorizontal: 16, paddingTop: 10 },
  bannerImage: { width: '100%', height: 80, borderRadius: 6, backgroundColor: C.G200 },
  filterBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.white, gap: 10,
  },
  filterBtn: {
    width: 48, height: 40, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.primary, borderRadius: 6,
    justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  filterBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  filterBadge: {
    position: 'absolute', top: -6, right: -6,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#FF6B6B', justifyContent: 'center', alignItems: 'center',
  },
  filterBadgeText: { fontSize: 10, fontWeight: '700', color: C.white },
  sortBtn: {
    flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, borderWidth: 1, borderColor: C.G300, borderRadius: 6,
  },
  sortBtnText: { fontSize: 14, fontWeight: '500', color: C.black },
  productHead: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  categoryPath: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  categoryDep1: { fontSize: 15, fontWeight: '600', color: C.black },
  categoryArrow: { fontSize: 15, color: C.G400, marginHorizontal: 2, fontWeight: '600' },
  categoryDep2: { fontSize: 15, fontWeight: '600', color: C.black },
  itemCount: { fontSize: 13, color: C.G500, marginRight: 12 },
  viewToggle: { flexDirection: 'row', gap: 4 },
  viewToggleBtn: {
    width: 32, height: 32, borderRadius: 4,
    borderWidth: 1, borderColor: C.G300, justifyContent: 'center', alignItems: 'center',
  },
  viewToggleBtnActive: { borderColor: C.primary, backgroundColor: '#fff5f7' },
  iconMagazine: { gap: 3 },
  iconMagazineLine: { width: 14, height: 2, borderRadius: 1, backgroundColor: C.G400 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 14, gap: 2 },
  iconGridCell: { width: 5, height: 5, borderRadius: 1, backgroundColor: C.G400 },
  listContent: { paddingBottom: 40 },
  productItem: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.white,
  },
  thumbWrap: {
    width: 120, height: 120, borderRadius: 6, overflow: 'hidden',
    backgroundColor: C.G100, position: 'relative', flexShrink: 0,
  },
  thumbImage: { width: '100%', height: '100%' },
  holdOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  holdOverlayText: { color: C.white, fontSize: 14, fontWeight: '700', textAlign: 'center', lineHeight: 20 },
  stateBadge: { position: 'absolute', top: 0, left: 0, paddingHorizontal: 7, paddingVertical: 4, borderBottomRightRadius: 6 },
  stateBadgeSold: { borderWidth: 1, borderColor: C.G300 },
  stateBadgeText: { color: C.white, fontSize: 11, fontWeight: '700', letterSpacing: -0.2 },
  adBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.45)', paddingHorizontal: 6, paddingVertical: 3, borderBottomLeftRadius: 6 },
  adBadgeText: { color: C.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  likeBtn: { position: 'absolute', bottom: 8, right: 8 },
  conWrap: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  productTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: C.black, lineHeight: 20, letterSpacing: -0.2 },
  compareIconBtn: { paddingLeft: 8, paddingTop: 2 },
  productTags: { fontSize: 13, color: C.G500, marginTop: 2, fontWeight: '500' },
  infoSet: {},
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '700', color: C.black, letterSpacing: -0.3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: C.G300 },
  metaText: { fontSize: 12, color: C.G500, fontWeight: '500' },
  gridRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  gridItem: { width: GRID_ITEM_WIDTH, backgroundColor: C.G100, borderRadius: 5, overflow: 'hidden', padding: 12 },
  gridThumbWrap: { width: '100%', aspectRatio: 1, borderRadius: 6, overflow: 'hidden', backgroundColor: C.G200, position: 'relative' },
  gridThumbImage: { width: '100%', height: '100%' },
  gridLikeBtn: { position: 'absolute', bottom: 8, right: 8 },
  gridCon: { paddingTop: 10 },
  gridTitle: { fontSize: 13, fontWeight: '700', color: C.black, lineHeight: 18, letterSpacing: -0.2 },
  gridTags: { fontSize: 11, color: C.G500, marginTop: 3 },
  gridPriceRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 },
  gridPrice: { fontSize: 13, fontWeight: '600', color: C.black },
  gridMeta: { fontSize: 11, color: C.G600 },
  gridCompareBtn: {
    width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderWidth: 1, borderColor: C.G300, borderRadius: 6, gap: 6, marginTop: 10,
  },
  gridCompareBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  gridCompareBtnText: { fontSize: 13, fontWeight: '500', color: '#3B3B3B' },
  gridCompareBtnTextActive: { color: C.white },
  comparePanelWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' },
  panelToggleBtn: {
    width: 80, height: 36, backgroundColor: C.white,
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: -1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.08, shadowRadius: 4 },
      android: { elevation: 6 },
    }),
  },
  panelToggleArrow: { fontSize: 16, color: C.G600, fontWeight: '700' },
  comparePanel: {
    width: '100%', backgroundColor: C.white,
    paddingHorizontal: 16, paddingBottom: Platform.OS === 'ios' ? 28 : 16, paddingTop: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 20 },
    }),
  },
  panelCardTrashBtn: {
    position: 'absolute', top: 0, right: 0, width: 40, height: 40,
    backgroundColor: C.white, borderRadius: 10, justifyContent: 'center', alignItems: 'center', zIndex: 2,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  panelHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  panelTitle: { fontSize: 15, fontWeight: '700', color: C.black },
  panelCloseText: { fontSize: 16, color: C.G500, padding: 4 },
  panelSlotsGrid: { maxHeight: SCREEN_HEIGHT * 0.45, marginBottom: 14 },
  panelGridRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  panelCard: { width: COMPARE_CARD_WIDTH, backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 8, overflow: 'hidden' },
  panelCardThumbWrap: { width: '100%', aspectRatio: 1, backgroundColor: C.G100, position: 'relative' },
  panelCardThumbImage: { width: '100%', height: '100%' },
  panelCardCon: { padding: 8 },
  panelCardTitle: { fontSize: 12, fontWeight: '500', color: C.black, lineHeight: 17 },
  panelCardTags: { fontSize: 10, color: C.blue, marginTop: 2 },
  panelCardPrice: { fontSize: 14, fontWeight: '700', color: C.black, marginTop: 4 },
  panelCardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  panelCardMeta: { fontSize: 10, color: C.G500 },
  panelCardEmpty: {
    width: COMPARE_CARD_WIDTH, aspectRatio: 0.65,
    borderWidth: 1.5, borderColor: C.G300, borderStyle: 'dashed',
    borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  panelSlotEmptyText: { fontSize: 24, color: C.G300, fontWeight: '300' },
  panelBtns: { flexDirection: 'row', gap: 8 },
  panelBtnReset: {
    flex: 1, flexDirection: 'row', height: 48, backgroundColor: C.G100,
    borderRadius: 6, justifyContent: 'center', alignItems: 'center', gap: 6,
  },
  panelBtnResetText: { fontSize: 15, fontWeight: '600', color: C.G600 },
  panelBtnResult: { flex: 1, height: 48, backgroundColor: C.primary, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  panelBtnResultText: { fontSize: 15, fontWeight: '600', color: C.white },
  compareBarWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' },
  barToggleBtn: {
    width: 80, height: 36, backgroundColor: C.white,
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: -1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.08, shadowRadius: 4 },
      android: { elevation: 6 },
    }),
  },
  compareBar: {
    width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: C.white,
    paddingHorizontal: 16, paddingVertical: 14, paddingBottom: Platform.OS === 'ios' ? 34 : 14,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 20 },
    }),
  },
  compareBarTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: C.black },
  compareBarClose: { fontSize: 16, color: C.G500, padding: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sortDropdown: {
    backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.border, overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  sortOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: C.G100,
  },
  sortOptionActive: { backgroundColor: '#fff5f7' },
  sortOptionText: { fontSize: 14, color: C.black, fontWeight: '400' },
  sortOptionTextActive: { color: C.primary, fontWeight: '600' },
  sortCheckMark: { fontSize: 14, color: C.primary, fontWeight: '700' },
});