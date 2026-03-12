/**
 * UI-RVEW-102  거래후기
 * React Native  |  Production-Ready Component
 *
 * ┌─ 탭 0: 받은 거래 후기   → "···" 없음  / 별점 O / 회색 "후기 보내기"
 * ├─ 탭 1: 보낸 거래 후기   → "···" 있음 (수정/삭제 드롭다운) / 별점 O / 회색 "후기 보내기"
 * └─ 탭 2: 작성 가능한 후기 → "···" 없음  / 별점 없음 / 빨간 "후기 보내기" 버튼
 *
 * 사용:
 *   import TradeReviewScreen from './TradeReviewScreen';
 *   <Stack.Screen name="TradeReview" component={TradeReviewScreen} />
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import Header from '../../components/common/Header';
import TabBar from '../../components/common/TabBar';

const { width: SW } = Dimensions.get('window');
const PRODUCT_IMG = require('../../assets/images/img03.png');

/* ──────────────────────────────────────────────
   샘플 데이터  (실제 앱에서는 API 응답으로 교체)
────────────────────────────────────────────── */
const MAKE_DATA = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id:           String(i + 1),
    orderDate:    '2025.07.21 주문',
    title:        '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    reviewScore:  4,
    price:        '10,000,000',
  }));

/* ──────────────────────────────────────────────
   헬퍼: 가격 포맷
   ex) '10000000' → '10,000,000'
   이미 콤마가 있는 경우 그대로 반환
────────────────────────────────────────────── */
const fmtPrice = (p = '') =>
  p.includes(',') ? p : p.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* ──────────────────────────────────────────────
   드롭다운 메뉴 (Modal 기반 · 화면 좌표 절대 배치)

   [주의] View에 pointerEvents 미사용
         → 내부 TouchableOpacity가 정상 동작하도록 보장
────────────────────────────────────────────── */
const MENU_W = 90;

interface AnchorLayout {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

interface DropdownMenuProps {
  visible: boolean;
  anchor: AnchorLayout | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, anchor, onClose, onEdit, onDelete }) => {
  if (!visible || !anchor) return null;

  /* 오른쪽 화면 밖으로 넘치지 않도록 보정 */
  let left = anchor.pageX + anchor.width - MENU_W;
  if (left + MENU_W > SW - 8) left = SW - MENU_W - 8;
  if (left < 8)               left = 8;
  const top = anchor.pageY + anchor.height + 4;

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* 배경 전체 → 터치 시 닫기 */}
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* 메뉴 패널  (position: absolute로 좌표 배치) */}
      <View style={[s.ddMenu, { position: 'absolute', top, left, width: MENU_W }]}>
        <TouchableOpacity
          style={s.ddItem}
          activeOpacity={0.7}
          onPress={() => { onClose(); onEdit?.(); }}
        >
          <Text style={s.ddText}>수정</Text>
        </TouchableOpacity>

        <View style={s.ddLine} />

        <TouchableOpacity
          style={s.ddItem}
          activeOpacity={0.7}
          onPress={() => { onClose(); onDelete?.(); }}
        >
          <Text style={s.ddText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

/* ──────────────────────────────────────────────
   ReviewItem
────────────────────────────────────────────── */
const TAB_KEYS = { received: 'received', sent: 'sent', writable: 'writable' } as const;

interface ReviewItemProps {
  item: any;
  activeTabKey: string;
  onDelete?: (id: string) => void;
  onEdit?: (item: any) => void;
  onWriteReview?: (item: any) => void;
}

const ReviewItem = React.memo<ReviewItemProps>(
  ({ item, activeTabKey, onDelete, onEdit, onWriteReview }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor]     = useState<AnchorLayout | null>(null);
    const btnRef                  = useRef<any>(null);

    const isReceived = activeTabKey === TAB_KEYS.received;
    const isSent     = activeTabKey === TAB_KEYS.sent;
    const isWritable = activeTabKey === TAB_KEYS.writable;

    const showMoreBtn  = isSent;
    const showReview   = isReceived || isSent;
    const showWriteBtn = isWritable;
    /* "···" 클릭 → 버튼 좌표 측정 → 드롭다운 열기 */
    const handleMorePress = useCallback(() => {
      btnRef.current?.measure((_fx: number, _fy: number, width: number, height: number, pageX: number, pageY: number) => {
        setAnchor({ pageX, pageY, width, height });
        setMenuOpen(true);
      });
    }, []);

    const handleEdit   = useCallback(() => onEdit?.(item),    [item, onEdit]);
    const handleDelete = useCallback(() => onDelete?.(item.id), [item, onDelete]);
    const handleWrite  = useCallback(() => onWriteReview?.(item), [item, onWriteReview]);

    return (
      <View style={s.itemWrap}>
        {/* 드롭다운 (보낸 탭만) */}
        {showMoreBtn && (
          <DropdownMenu
            visible={menuOpen}
            anchor={anchor}
            onClose={() => setMenuOpen(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <View style={s.itemRow}>
          {/* ── 썸네일 ── */}
          <TouchableOpacity activeOpacity={0.85} style={s.thumb}>
            <Image source={PRODUCT_IMG} style={s.thumbImg} resizeMode="cover" />
          </TouchableOpacity>

          {/* ── 내용 영역 ── */}
          <View style={s.con}>

            {/* 주문일 + ··· 버튼 */}
            <View style={s.topRow}>
              <Text style={s.orderDate}>{item.orderDate}</Text>
              {showMoreBtn && (
                <TouchableOpacity
                  ref={btnRef}
                  onPress={handleMorePress}
                  hitSlop={{ top: 10, bottom: 10, left: 12, right: 4 }}
                  style={s.moreBtn}
                >
                  <Text style={s.moreDot}>···</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* 상품명 (최대 2줄) */}
            <Text style={s.title} numberOfLines={2}>
              {item.title}
            </Text>

            {/* 받은 리뷰 + 별점 (작성 가능한 후기 탭 제외) */}
            {showReview && (
              <View style={s.reviewRow}>
                <Text style={s.reviewLabel}>받은 리뷰</Text>
                <Text style={s.starIcon}>★</Text>
                <Text style={s.reviewScore}>{item.reviewScore}</Text>
              </View>
            )}

            {/* 가격 */}
            <Text style={s.price}>{fmtPrice(item.price)}원</Text>
          </View>
        </View>

        {/* ── 후기 보내기 버튼 (아이템 전체 너비) ── */}
        {showWriteBtn && (
          <TouchableOpacity
            style={s.writeBtn}
            activeOpacity={0.8}
            onPress={handleWrite}
          >
            <Text style={s.writeBtnText}>후기 보내기</Text>
          </TouchableOpacity>
        )}

        {/* 아이템 구분선 */}
        <View style={s.divider} />
      </View>
    );
  },
);

/* ──────────────────────────────────────────────
   ListFooter  (무한 스크롤 로딩 인디케이터)
────────────────────────────────────────────── */
const ListFooter: React.FC<{ loading: boolean }> = ({ loading }) => (
  <View style={s.footer}>
    {loading && (
      <>
        <ActivityIndicator size="large" color={colors.G400} />
        <Text style={s.footerTxt}>목록을 불러오는 중입니다.</Text>
      </>
    )}
  </View>
);

/* ──────────────────────────────────────────────
   TradeReviewScreen  (메인)
────────────────────────────────────────────── */
const TABS = [
  { key: 'received', label: '받은 거래 후기' },
  { key: 'sent',     label: '보낸 거래 후기' },
  { key: 'writable', label: '작성 가능한 후기' },
];

const TradeReviewScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('sent');         // 초기값: 보낸 거래 후기
  const [isLoading, setIsLoading] = useState(true);           // 하단 로딩 스피너
  const [data, setData]           = useState(MAKE_DATA);      // 리스트 데이터

  /* ── 삭제 ── */
  const handleDelete = useCallback((id: string) => {
    setData((prev) => prev.filter((d) => d.id !== id));
  }, []);

  /* ── 수정 → 실제 앱: navigation.navigate('EditReview', { item }) ── */
  const handleEdit = useCallback((item: any) => {
    console.log('[수정] id:', item.id);
    // navigation.navigate('EditReview', { item });
  }, []);

  /* ── 후기보내기 → 실제 앱: navigation.navigate('WriteReview', { item }) ── */
  const handleWrite = useCallback((item: any) => {
    console.log('[후기보내기] id:', item.id);
    // navigation.navigate('WriteReview', { item });
  }, []);

  /* ── 탭 변경 시 데이터 리셋 (실제 앱에서는 API 재호출) ── */
  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
    setIsLoading(true);
    setData(MAKE_DATA()); // 실제 앱에서는 각 탭 API 호출로 교체
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ReviewItem
        item={item}
        activeTabKey={activeTab}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onWriteReview={handleWrite}
      />
    ),
    [activeTab, handleDelete, handleEdit, handleWrite],
  );

  return (
    <SafeAreaView style={s.safe}>
      {/* ════════ 헤더 ════════ */}
      <Header
        title="거래후기"
        onBack={() => navigation.goBack()}
      />

      {/* ════════ 탭 바 ════════ */}
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* ════════ 리스트 ════════ */}
      <FlatList
        data={data}
        keyExtractor={(d) => d.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listCon}
        ListFooterComponent={<ListFooter loading={isLoading} />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          /* 실제 앱: 다음 페이지 로드 로직 삽입 */
          // fetchNextPage().then(next => setData(prev => [...prev, ...next]));
        }}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={10}
        windowSize={7}
        initialNumToRender={8}
      />
    </SafeAreaView>
  );
};

/* ──────────────────────────────────────────────
   StyleSheet
────────────────────────────────────────────── */
const shadow = Platform.select({
  ios: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius:  8,
  },
  android: {
    elevation: 8,
  },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },

  /* ── 리스트 ── */
  listCon: { paddingTop: 8 },

  /* ── 아이템 ── */
  itemWrap: { backgroundColor: colors.white },
  itemRow: {
    flexDirection:    'row',
    paddingHorizontal: 16,
    paddingVertical:  16,
    gap:              14,
    alignItems:       'flex-start',
  },
  divider: {
    height:           1,
    backgroundColor:  colors.G200,
    marginHorizontal: 16,
  },

  /* ── 썸네일 ── */
  thumb: {
    width:           100,
    height:          100,
    borderRadius:    4,
    overflow:        'hidden',
    backgroundColor: colors.G200,
    flexShrink:      0,
  },
  thumbImg: {
    width:  100,
    height: 100,
  },

  /* ── 내용 ── */
  con: { flex: 1 },

  topRow: {
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    marginBottom:    5,
  },
  orderDate: {
    fontSize:   12,
    color:      colors.G500,
    fontWeight: '400',
  },
  moreBtn:  { paddingLeft: 10 },
  moreDot: {
    fontSize:      18,
    color:         colors.G600,
    letterSpacing: 1.5,
    lineHeight:    20,
  },
  title: {
    fontSize:     13,
    fontWeight:   '500',
    color:        colors.black,
    lineHeight:   19,
    marginBottom: 6,
  },

  /* 받은 리뷰 행 */
  reviewRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           3,
    marginBottom:  5,
  },
  reviewLabel: { fontSize: 12, color: colors.G600 },
  starIcon:    { fontSize: 13, color: colors.star, lineHeight: 16 },
  reviewScore: { fontSize: 12, color: colors.G600, fontWeight: '500' },

  /* 가격 */
  price: {
    fontSize:      14,
    fontWeight:    '700',
    color:         colors.black,
    letterSpacing: -0.3,
  },

  /* 후기 보내기 버튼 (작성 가능 탭 - 빨간) */
  writeBtn: {
    marginHorizontal: 16,
    marginBottom:     12,
    height:           44,
    borderRadius:     4,
    backgroundColor:  colors.primary,
    justifyContent:   'center',
    alignItems:       'center',
  },
  writeBtnText: {
    fontSize:      14,
    fontWeight:    '600',
    color:         colors.white,
    letterSpacing: -0.2,
  },

  /* ── 드롭다운 ── */
  ddMenu: {
    backgroundColor: colors.white,
    borderRadius:    6,
    borderWidth:     1,
    borderColor:     colors.G200,
    ...shadow,
  },
  ddItem: {
    height:          44,
    justifyContent:  'center',
    alignItems:      'center',
  },
  ddText: {
    fontSize:   14,
    color:      colors.black,
    fontWeight: '400',
  },
  ddLine: { height: 1, backgroundColor: colors.G200 },

  /* ── 로딩 푸터 ── */
  footer: {
    alignItems:    'center',
    paddingTop:    28,
    paddingBottom: 50,
    gap:           10,
    minHeight:     110,
  },
  footerTxt: {
    fontSize:  13,
    color:     colors.G500,
    marginTop: 8,
  },
});

export default TradeReviewScreen;
