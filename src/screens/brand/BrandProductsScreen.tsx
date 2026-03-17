import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import FilterIcon from '../../assets/icon/filter.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import XIcon from '../../assets/icon/X.svg';
import PhoneIcon from '../../assets/icon/phone.svg';
import { BrandHeader } from './components/BrandHeader';
import { ProductItemMagazine, ProductItemGrid, SortModal } from '../../components/product';
import type { RootStackParamList } from '../../types';
import type { ProductListItem, SortType } from '../../types/product';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 16;

type ViewType = 'magazine' | 'grid';

const IMG_01 = require('../../assets/images/img01.png');

const MOCK_PRODUCTS: ProductListItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타',
  price: 10000000,
  image: IMG_01,
  timeAgo: '9분전',
  isLiked: false,
  likes: 21,
  reviews: 3,
  tags: '#키워드 #키워드 #키워드 #키워드',
  state: 'normal' as const,
}));

export const BrandProductsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandProducts'>>();
  const brandId = route.params?.brandId || '1';
  const showEmpty = route.params?.empty || false;

  const [products, setProducts] = useState<ProductListItem[]>(showEmpty ? [] : MOCK_PRODUCTS);
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');
  const [isLoading, setIsLoading] = useState(false);

  const sortBtnRef = useRef<View>(null);
  const [sortBtnLayout, setSortBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const openSortModal = useCallback(() => {
    sortBtnRef.current?.measureInWindow((x, y, width, height) => {
      setSortBtnLayout({ x, y, width, height });
      setSortVisible(true);
    });
  }, []);

  const handleProductPress = useCallback((id: string) => {
    navigation.navigate('BrandProductDetail', { brandId, productId: id });
  }, [navigation, brandId]);

  const handleLikeToggle = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p));
  }, []);

  const handleGoToProducts = () => {
    navigation.navigate('BrandDetail', { brandId });
  };

  const gridPairs = React.useMemo(() => {
    const pairs: (ProductListItem | null)[][] = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push([products[i], products[i + 1] ?? null]);
    }
    return pairs;
  }, [products]);

  const ListHeader = useCallback(() => (
    <>
      {/* Category Path */}
      <View style={styles.categoryPath}>
        <Text style={styles.categoryDep1}>공작기계</Text>
        <Text style={styles.categoryArrow}> {'>'} </Text>
        <Text style={styles.categoryDep2}>CNC 선반</Text>
        <Text style={styles.itemCount}>123개</Text>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <FilterIcon width={20} height={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          ref={sortBtnRef as any}
          style={styles.sortBtn}
          onPress={openSortModal}
          activeOpacity={0.7}
        >
          <Text style={styles.sortBtnText}>{selectedSort}</Text>
          <ChevronDownIcon width={16} height={16} color={colors.G500} />
        </TouchableOpacity>
        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleBtn, viewType === 'magazine' && styles.viewToggleBtnActive]}
            onPress={() => setViewType('magazine')}
          >
            <View style={styles.iconMagazine}>
              {[0, 1, 2].map(i => (
                <View
                  key={i}
                  style={[
                    styles.iconMagazineLine,
                    viewType === 'magazine' && { backgroundColor: colors.primary },
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleBtn, viewType === 'grid' && styles.viewToggleBtnActive]}
            onPress={() => setViewType('grid')}
          >
            <View style={styles.iconGrid}>
              {[0, 1, 2, 3].map(i => (
                <View
                  key={i}
                  style={[
                    styles.iconGridCell,
                    viewType === 'grid' && { backgroundColor: colors.primary },
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ), [viewType, selectedSort, openSortModal]);

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.emptyIconWrap}>
          <XIcon width={32} height={32} color={colors.G400} />
        </View>
        <Text style={styles.emptyText}>구매 내역이 없습니다.</Text>
      </View>
      <TouchableOpacity style={styles.emptyButton} onPress={handleGoToProducts} activeOpacity={0.8}>
        <Text style={styles.emptyButtonText}>상품 구경하기</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductListItem | (ProductListItem | null)[] }) => {
      if (viewType === 'magazine') {
        const p = item as ProductListItem;
        return (
          <ProductItemMagazine
            item={p}
            isCompared={false}
            onCompareToggle={() => {}}
            onLikeToggle={handleLikeToggle}
            onPress={handleProductPress}
            isSoldOpacity={false}
          />
        );
      } else {
        const pair = item as (ProductListItem | null)[];
        return (
          <View style={styles.gridRow}>
            {pair.map((p, idx) =>
              p ? (
                <ProductItemGrid
                  key={p.id}
                  item={p}
                  isCompared={false}
                  onCompareToggle={() => {}}
                  onLikeToggle={handleLikeToggle}
                  onPress={handleProductPress}
                  isSoldOpacity={false}
                />
              ) : (
                <View key={`empty-${idx}`} style={styles.gridItemEmpty} />
              )
            )}
          </View>
        );
      }
    },
    [viewType, handleLikeToggle, handleProductPress]
  );

  const data = viewType === 'magazine' ? products : gridPairs;
  const keyExtractor = useCallback(
    (item: any, index: number) =>
      viewType === 'magazine' ? (item as ProductListItem).id : `pair-${index}`,
    [viewType]
  );

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} currentPage="products" />

      {products.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <ListHeader />
          <EmptyState />
        </View>
      ) : (
        <FlatList
          data={data as any[]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingWrap}>
                <ActivityIndicator size="large" color={colors.G400} />
                <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
              </View>
            ) : (
              <View style={{ height: 100 }} />
            )
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Sort Modal */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyWrapper: {
    flex: 1,
  },
  categoryPath: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING_LR,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  categoryDep1: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  categoryArrow: {
    fontSize: 15,
    color: colors.G400,
    marginHorizontal: 2,
    fontWeight: '600',
  },
  categoryDep2: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  itemCount: {
    fontSize: 13,
    color: colors.G500,
    marginLeft: 8,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING_LR,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
    gap: 10,
  },
  filterBtn: {
    width: 48,
    height: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBtn: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
  },
  sortBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 4,
  },
  viewToggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewToggleBtnActive: {
    borderColor: colors.primary,
    backgroundColor: '#fff5f7',
  },
  iconMagazine: {
    gap: 3,
  },
  iconMagazineLine: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.G400,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 14,
    gap: 2,
  },
  iconGridCell: {
    width: 5,
    height: 5,
    borderRadius: 1,
    backgroundColor: colors.G400,
  },
  listContent: {
    paddingBottom: 40,
  },
  gridRow: {
    flexDirection: 'row',
    paddingHorizontal: PADDING_LR,
    gap: 12,
    marginBottom: 12,
  },
  gridItemEmpty: {
    width: (SCREEN_WIDTH - PADDING_LR * 2 - 12) / 2,
    opacity: 0,
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: PADDING_LR,
    paddingTop: 20,
  },
  emptyContent: {
    flex: 1,
    backgroundColor: colors.G100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G500,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G500,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: PADDING_LR,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});

