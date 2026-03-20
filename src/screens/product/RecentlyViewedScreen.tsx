import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import XIcon from '../../assets/icon/X.svg';

const productImage = require('../../assets/images/img01.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = 4;
const COLUMNS = 3;
const IMAGE_SIZE = (SCREEN_WIDTH - screenPadding.horizontal * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

interface ViewedProduct {
  id: string;
  image: any;
  selected: boolean;
}

interface ViewedGroup {
  date: string;
  products: ViewedProduct[];
}

const generateDummyData = (): ViewedGroup[] => [
  {
    date: '2026.02.03',
    products: Array.from({ length: 5 }, (_, i) => ({
      id: `a-${i}`,
      image: productImage,
      selected: true,
    })),
  },
  {
    date: '2026.02.01',
    products: Array.from({ length: 15 }, (_, i) => ({
      id: `b-${i}`,
      image: productImage,
      selected: true,
    })),
  },
];

export const RecentlyViewedScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [groups, setGroups] = useState<ViewedGroup[]>(generateDummyData);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = groups.every((g) => g.products.length === 0);

  const toggleSelect = useCallback((groupDate: string, productId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.date === groupDate
          ? {
              ...g,
              products: g.products.map((p) =>
                p.id === productId ? { ...p, selected: !p.selected } : p,
              ),
            }
          : g,
      ),
    );
  }, []);

  const handleDelete = useCallback(() => {
    setGroups((prev) =>
      prev
        .map((g) => ({
          ...g,
          products: g.products.filter((p) => !p.selected),
        }))
        .filter((g) => g.products.length > 0),
    );
    setMenuVisible(false);
  }, []);

  const handleDeleteAll = useCallback(() => {
    setGroups([]);
    setMenuVisible(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoading || isEmpty) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading, isEmpty]);

  const renderItem = useCallback(
    ({ item: group }: { item: ViewedGroup }) => {
      const isFirst = groups[0]?.date === group.date;
      return (
        <View style={styles.groupContainer}>
          {isFirst ? (
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{group.date}</Text>
            </View>
          ) : (
            <Text style={styles.dateText}>{group.date}</Text>
          )}
          <View style={styles.grid}>
            {group.products.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.imageWrapper}
                activeOpacity={0.8}
                onPress={() => toggleSelect(group.date, product.id)}
              >
                <Image source={product.image} style={styles.productImage} />
                {product.selected && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    },
    [groups, toggleSelect],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>최근 본 상품</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <XIcon width={24} height={24} color={colors.G400} />
          </View>
          <Text style={styles.emptyText}>최근 본 상품이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.date}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color={colors.G400} />
                <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
              </View>
            ) : null
          }
        />
      )}

      {/* Dropdown Menu */}
      {menuVisible && (
        <>
          <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.6}
              onPress={handleDeleteAll}
            >
              <Text style={styles.menuItemText}>전체 삭제</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.6}
              onPress={handleDelete}
            >
              <Text style={styles.menuItemText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding.horizontal,
    height: 52,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  moreIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: 40,
  },
  groupContainer: {
    marginBottom: spacing.lg,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: spacing.sm,
  },
  dateBadgeText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
  dateText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G400,
  },
  loadingFooter: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  menuDropdown: {
    position: 'absolute',
    top: 52,
    right: screenPadding.horizontal,
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 140,
    zIndex: 100,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.G200,
  },
});
