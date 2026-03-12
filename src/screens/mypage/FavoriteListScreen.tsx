/**
 * FavoriteListScreen.tsx
 * 관심목록 화면 - React Native
 *
 * [수정 이력 v3]
 * - 공통 ProductItemMagazine / ProductItemGrid 컴포넌트 사용
 * - 공통 SortModal, ComparePanel, ViewToggle 컴포넌트 사용
 * - DlInfo → mypage/components/DlInfo.tsx 분리
 * - ProductListItem 공통 타입 사용 (price: number)
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import SearchIcon from '../../assets/icon/Search.svg';
import {
  ProductItemMagazine,
  ProductItemGrid,
  SortModal,
  ComparePanel,
  ViewToggle,
} from '../../components/product';
import type { ProductListItem, ViewType, SortType } from '../../types/product';
import { SCREEN_HEIGHT } from '../../types/product';
import DlInfo from './components/DlInfo';

// ─────────────────────────────────────────────────────────────────
// 상수
// ─────────────────────────────────────────────────────────────────
const COMPARISON_MAX = 6;

// ─────────────────────────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────────────────────────
const DUMMY_PRODUCTS: ProductListItem[] = Array.from({ length: 5 }, (_, i) => ({
  id:              String(i + 1),
  state:           'new' as const,
  stateLabel:      '신품',
  title:           '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  tags:            '#누유무 #톱날교체용이',
  price:           12300000,
  timeAgo:         '9분전',
  likes:           21,
  isLiked:         false,
  isCompared:      false,
  manufacturer:    '화천기계',
  manufactureDate: '2006년 07월',
  modelName:       'CS-3020H',
  warranty:        '2006년 07월',
}));

// ─────────────────────────────────────────────────────────────────
// 메인 화면
// ─────────────────────────────────────────────────────────────────
const FavoriteListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [products,   setProducts]   = useState<ProductListItem[]>(DUMMY_PRODUCTS);
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');
  const [viewType,   setViewType]   = useState<ViewType>('magazine');
  const [isLoading,  setIsLoading]  = useState(false);
  const loadingRef = useRef(false);

  // 정렬 모달
  const [sortVisible, setSortVisible] = useState(false);
  const sortBtnRef = useRef<View>(null);
  const [sortBtnLayout, setSortBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // 비교 패널
  const [compareVisible, setCompareVisible] = useState(false);

  const comparedProducts = useMemo(
    () => products.filter((p) => p.isCompared),
    [products],
  );

  // ── 핸들러 ──────────────────────────────────────────
  const openSortModal = useCallback(() => {
    sortBtnRef.current?.measureInWindow((x, y, width, height) => {
      setSortBtnLayout({ x, y, width, height });
      setSortVisible(true);
    });
  }, []);

  const handleLike = useCallback((id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p)),
    );
  }, []);

  const handleCompareToggle = useCallback((id: string) => {
    setProducts((prev) => {
      const target = prev.find((p) => p.id === id);
      if (!target) return prev;
      if (target.isCompared) {
        const next = prev.map((p) => (p.id === id ? { ...p, isCompared: false } : p));
        if (next.filter((p) => p.isCompared).length === 0) setCompareVisible(false);
        return next;
      }
      if (prev.filter((p) => p.isCompared).length >= COMPARISON_MAX) return prev;
      return prev.map((p) => (p.id === id ? { ...p, isCompared: true } : p));
    });
  }, []);

  const handleCompareReset = useCallback(() => {
    setProducts((prev) => prev.map((p) => ({ ...p, isCompared: false })));
    setCompareVisible(false);
  }, []);

  const handlePress = useCallback((id: string) => {
    navigation.navigate('ProductView', { productId: id });
  }, [navigation]);

  // 무한 스크롤
  const handleLoadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) => [
        ...prev,
        ...DUMMY_PRODUCTS.map((p, i) => ({ ...p, id: String(prev.length + i + 1) })),
      ]);
      setIsLoading(false);
      loadingRef.current = false;
    }, 1200);
  }, []);

  // ── FlatList 렌더 ───────────────────────────────────
  const renderMagazineBottom = useCallback(
    (item: ProductListItem) =>
      item.manufacturer ? (
        <DlInfo
          manufacturer={item.manufacturer}
          manufactureDate={item.manufactureDate ?? ''}
          modelName={item.modelName ?? ''}
          warranty={item.warranty ?? ''}
        />
      ) : null,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductListItem }) => {
      const isCompared = !!item.isCompared;
      if (viewType === 'grid') {
        return (
          <ProductItemGrid
            item={item}
            isCompared={isCompared}
            onCompareToggle={handleCompareToggle}
            onLikeToggle={handleLike}
            onPress={handlePress}
            isSoldOpacity={item.state === 'sold'}
          />
        );
      }
      return (
        <ProductItemMagazine
          item={item}
          isCompared={isCompared}
          onCompareToggle={handleCompareToggle}
          onLikeToggle={handleLike}
          onPress={handlePress}
          isSoldOpacity={item.state === 'sold'}
          bottomContent={renderMagazineBottom(item)}
        />
      );
    },
    [viewType, handleCompareToggle, handleLike, handlePress, renderMagazineBottom],
  );

  const keyExtractor = useCallback((item: ProductListItem) => item.id, []);

  const ListFooter = useMemo(
    () => (
      <View style={s.listFooter}>
        {isLoading && (
          <>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={s.loadingText}>목록을 불러오는 중입니다.</Text>
          </>
        )}
      </View>
    ),
    [isLoading],
  );

  // 헤더 우측: 검색 버튼
  const searchButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Search')}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="button"
      accessibilityLabel="검색"
    >
      <SearchIcon width={22} height={22} color={colors.black} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      {/* ══ 헤더 ══ */}
      <Header
        title="관심목록"
        onBack={() => navigation.goBack()}
        rightComponent={searchButton}
        border
      />

      {/* ══ 정렬 & 뷰 토글 바 ══ */}
      <View style={s.controlBar}>
        <TouchableOpacity
          ref={sortBtnRef as any}
          style={s.sortBtn}
          onPress={openSortModal}
          activeOpacity={0.7}
        >
          <Text style={s.sortBtnText}>{selectedSort}</Text>
          <Text style={s.sortCaret}>  ▾</Text>
        </TouchableOpacity>
        <View style={s.toggleWrap}>
          <ViewToggle viewType={viewType} onChange={setViewType} />
        </View>
      </View>

      {/* ══ 상품 목록 ══ */}
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        key={viewType}
        numColumns={viewType === 'grid' ? 2 : 1}
        columnWrapperStyle={viewType === 'grid' ? s.gridWrapper : undefined}
        contentContainerStyle={[
          s.listContent,
          viewType === 'grid' && s.listContentGrid,
          comparedProducts.length > 0 && !compareVisible && { paddingBottom: 80 },
          compareVisible && { paddingBottom: SCREEN_HEIGHT * 0.65 },
        ]}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />

      {/* ══ 축소 비교 바 ══ */}
      {!compareVisible && comparedProducts.length > 0 && (
        <View style={s.compareBarWrap}>
          <TouchableOpacity style={s.barToggleBtn} onPress={() => setCompareVisible(true)} activeOpacity={0.8}>
            <Text style={s.barToggleArrow}>▲</Text>
          </TouchableOpacity>
          <View style={s.compareBar}>
            <Text style={s.compareBarTitle}>
              카테고리별 제품 비교하기 <Text style={{ color: colors.primary }}>{comparedProducts.length}</Text>/6
            </Text>
            <TouchableOpacity onPress={handleCompareReset} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={s.compareBarClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ══ 비교 패널 확장 ══ */}
      {compareVisible && comparedProducts.length > 0 && (
        <ComparePanel
          products={comparedProducts}
          onRemove={handleCompareToggle}
          onReset={handleCompareReset}
          onViewResult={() => {/* 결과보기 화면 이동 */}}
          onClose={() => setCompareVisible(false)}
        />
      )}

      {/* ══ 정렬 모달 ══ */}
      <SortModal
        visible={sortVisible}
        selected={selectedSort}
        onSelect={setSelectedSort}
        onClose={() => setSortVisible(false)}
        anchorLayout={sortBtnLayout}
      />
    </SafeAreaView>
  );
};

export default FavoriteListScreen;

// ─────────────────────────────────────────────────────────────────
// StyleSheet
// ─────────────────────────────────────────────────────────────────
const H_PADDING = 15;
const GRID_GAP  = 10;

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // ── 정렬 & 뷰 토글 바
  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: H_PADDING,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  sortBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },
  sortCaret: {
    fontSize: 11,
    color: colors.G600,
  },
  toggleWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

  // ── FlatList
  listContent: {
    paddingBottom: 24,
  },
  listContentGrid: {
    paddingHorizontal: H_PADDING,
    paddingTop: 10,
  },
  gridWrapper: {
    justifyContent: 'space-between',
    marginBottom: GRID_GAP,
  },
  listFooter: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: colors.G500,
    marginTop: 8,
  },

  // ── 축소 비교 바
  compareBarWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  barToggleBtn: {
    width: 80,
    height: 36,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.08, shadowRadius: 4 },
      android: { elevation: 6 },
    }),
  },
  barToggleArrow: {
    fontSize: 16,
    color: colors.G600,
    fontWeight: '700',
  },
  compareBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'ios' ? 34 : 14,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 20 },
    }),
  },
  compareBarTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
  },
  compareBarClose: {
    fontSize: 16,
    color: colors.G500,
    padding: 4,
  },
});
