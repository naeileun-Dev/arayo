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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import CheckIcon from '../../assets/icon/check.svg';
import XIcon from '../../assets/icon/X.svg';
import {
  ProductItemMagazine,
  ProductItemGrid,
  SortModal,
  ComparePanel,
  ViewToggle,
} from '../../components/product';
import type { ProductListItem, ViewType, SortType } from '../../types/product';
import { SCREEN_HEIGHT } from '../../types/product';
import { DlInfo } from './components/DlInfo';
import type { RootStackParamList } from '../../types';

const productImage = require('../../assets/images/img01.png');

const COMPARISON_MAX = 6;

const DUMMY_PRODUCTS: ProductListItem[] = Array.from({ length: 5 }, (_, i) => ({
  id:              String(i + 1),
  state:           'new' as const,
  stateLabel:      '신품',
  title:           '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오',
  tags:            '#신품급 #즉시설치 #마지막매물',
  price:           10000000,
  timeAgo:         '9분전',
  likes:           21,
  isLiked:         false,
  isCompared:      false,
  manufacturer:    '화천기계',
  manufactureDate: '2020.02',
  modelName:       'ABC',
  warranty:        '2020.02',
  image:           productImage,
}));

export const FavoriteListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FavoriteList'>>();
  const initialProducts = (route.params?.initialProducts ?? DUMMY_PRODUCTS) as ProductListItem[];
  const [products, setProducts] = useState<ProductListItem[]>(initialProducts);
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

  const handleViewResult = useCallback(() => {
    navigation.navigate('CompareProducts');
  }, [navigation]);

  // 무한 스크롤
  const handleLoadMore = useCallback(() => {
    if (loadingRef.current || products.length === 0) return;
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
  }, [products.length]);

  const renderMagazineBottom = useCallback(
    (item: ProductListItem) => (
      <View>
        {item.manufacturer && (
          <DlInfo
            manufacturer={item.manufacturer}
            manufactureDate={item.manufactureDate ?? ''}
            modelName={item.modelName ?? ''}
            warranty={item.warranty ?? ''}
          />
        )}
        <TouchableOpacity
          style={[s.compareBtn, item.isCompared && s.compareBtnActive]}
          onPress={() => handleCompareToggle(item.id)}
          activeOpacity={0.7}
        >
          <CheckIcon width={16} height={16} color={item.isCompared ? colors.white : '#3B3B3B'} />
          <Text style={[s.compareBtnText, item.isCompared && s.compareBtnTextActive]}>
            비교하기
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [handleCompareToggle],
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

  // 빈 상태 렌더링
  const renderEmptyState = () => (
    <View style={s.emptyContainer}>
      <View style={s.emptyIconWrap}>
        <XIcon width={24} height={24} color={colors.G400} />
      </View>
      <Text style={s.emptyText}>구매 내역이 없습니다.</Text>
    </View>
  );

  const isEmpty = products.length === 0;

  return (
    <SafeAreaView style={s.safeArea}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>관심목록</Text>
        <View style={s.backBtn} />
      </View>

      <View style={s.controlBar}>
        <TouchableOpacity
          ref={sortBtnRef as any}
          style={s.sortBtn}
          onPress={openSortModal}
          activeOpacity={0.7}
        >
          <Text style={s.sortBtnText}>{selectedSort}</Text>
          <ChevronDownIcon width={16} height={16} color={colors.G600} />
        </TouchableOpacity>
        <View style={s.toggleWrap}>
          <ViewToggle viewType={viewType} onChange={setViewType} />
        </View>
      </View>

      {isEmpty ? (
        <View style={s.emptyWrapper}>
          {renderEmptyState()}
          <View style={s.emptyBtnWrap}>
            <TouchableOpacity
              style={s.browseBtn}
              onPress={() => navigation.navigate('Main')}
              activeOpacity={0.8}
            >
              <Text style={s.browseBtnText}>상품 구경하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
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
      )}

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

      {compareVisible && comparedProducts.length > 0 && (
        <ComparePanel
          products={comparedProducts}
          onRemove={handleCompareToggle}
          onReset={handleCompareReset}
          onViewResult={handleViewResult}
          onClose={() => setCompareVisible(false)}
        />
      )}

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


const H_PADDING = 15;
const GRID_GAP  = 10;

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },

  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: H_PADDING,
    backgroundColor: colors.white,
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
    gap: 4,
  },
  sortBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },
  toggleWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

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

  // 비교하기 버튼 (매거진)
  compareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    marginTop: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    gap: 6,
  },
  compareBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  compareBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B3B3B',
  },
  compareBtnTextActive: {
    color: colors.white,
  },

  // 빈 상태
  emptyWrapper: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.G100,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.G200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G500,
  },
  emptyBtnWrap: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  browseBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },

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
