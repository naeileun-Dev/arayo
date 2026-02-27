import React, { useState, useCallback, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';

import SearchIcon from '../../assets/icon/Search.svg';
import FilterIcon from '../../assets/icon/filter.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { colors as C } from '../../styles/colors';

import {
  Product,
  ViewType,
  SortType,
  FilterState,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MOCK_PRODUCTS,
  INITIAL_FILTER,
  countActiveFilters,
} from './types';
import { ProductItemMagazine, ProductItemGrid } from './components/ProductItems';
import SortModal from './components/SortModal';
import ComparePanel from './components/ComparePanel';
import FilterPanel from './components/FilterPanel';
import CompareResultModal from './components/CompareResultModal';

const IMG_01 = require('../../assets/images/img01.png');

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
  const [compareResultVisible, setCompareResultVisible] = useState(false);

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
                <View key={`empty-${idx}`} style={styles.gridItemEmpty} />
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
            <Text style={styles.barToggleArrow}>▲</Text>
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
          onViewResult={handleViewResult}
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

      {/* 비교 결과 모달 */}
      <CompareResultModal
        visible={compareResultVisible}
        products={compareProducts}
        onClose={() => setCompareResultVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  header: {
    flexDirection: 'row', alignItems: 'center', height: 52,
    paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.G200, backgroundColor: C.white,
  },
  headerIconBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: C.black, letterSpacing: -0.3 },
  bannerWrap: { paddingHorizontal: 16, paddingTop: 10 },
  bannerImage: { width: '100%', height: 80, borderRadius: 6, backgroundColor: C.G200 },
  filterBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: C.G200, backgroundColor: C.white, gap: 10,
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
    borderBottomWidth: 1, borderBottomColor: C.G200,
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
  gridRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  gridItemEmpty: { width: (SCREEN_WIDTH - 32 - 12) / 2, opacity: 0 },
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
  barToggleArrow: { fontSize: 16, color: C.G600, fontWeight: '700' },
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
});
