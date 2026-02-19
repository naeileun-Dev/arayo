/**
 * 홈 화면 (메인)
 * UI-FRST-107
 *
 * 구성:
 * - 홈 헤더 (로고 + 검색/알림)
 * - 배너 캐러셀
 * - 퀵 메뉴
 * - 추천 기업
 * - 지역 인기 상품
 * - 카테고리 칩 필터
 * - 전체 상품 리스트
 * - FAB (상품 등록)
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  RefreshControl,
  Text,
} from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import {
  HomeHeader,
  BannerCarousel,
  QuickMenuGrid,
  CompanyCardList,
  ProductListItem,
  CategoryChips,
  SectionHeader,
  FloatingActionButton,
} from '../../components/home';
import {
  BANNERS,
  QUICK_MENUS,
  RECOMMENDED_COMPANIES,
  POPULAR_PRODUCTS,
  CATEGORY_CHIPS,
  ALL_PRODUCTS,
} from '../../data/mockData';
import type { Product, CategoryChip as CategoryChipType } from '../../types';

const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // 새로고침
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: API 호출
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 1500));
    setRefreshing(false);
  }, []);

  // 검색
  const handleSearch = () => {
    console.log('Navigate to Search');
  };

  // 알림
  const handleNotification = () => {
    console.log('Navigate to Notification');
  };

  // 상품 클릭
  const handleProductPress = (product: Product) => {
    console.log('Navigate to ProductDetail:', product.id);
  };

  // 좋아요 토글
  const handleLike = (product: Product) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  // 카테고리 선택
  const handleCategorySelect = (category: CategoryChipType) => {
    setActiveCategory(category.id);
  };

  // 상품 등록
  const handlePost = () => {
    console.log('Navigate to Post');
  };

  // 필터된 상품 목록
  const filteredProducts =
    activeCategory === 'all'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) =>
          p.tags?.some((t) =>
            t.toLowerCase().includes(
              CATEGORY_CHIPS.find((c) => c.id === activeCategory)?.label.toLowerCase() || ''
            )
          )
        );

  // SectionList 데이터 구성
  const sections = [
    {
      key: 'banner',
      data: [{ id: 'banner' }],
      renderCustom: true,
    },
    {
      key: 'quickMenu',
      data: [{ id: 'quickMenu' }],
      renderCustom: true,
    },
    {
      key: 'recommendedCompanies',
      title: '추천 기업',
      data: [{ id: 'companies' }],
      renderCustom: true,
    },
    {
      key: 'popularProducts',
      title: '지역 인기있는 상품',
      data: POPULAR_PRODUCTS.map((p) => ({
        ...p,
        isLiked: likedProducts.has(p.id),
      })),
    },
    {
      key: 'categoryFilter',
      data: [{ id: 'categoryFilter' }],
      renderCustom: true,
    },
    {
      key: 'allProducts',
      title: '전체 상품 한눈에 담기',
      data: filteredProducts.map((p) => ({
        ...p,
        isLiked: likedProducts.has(p.id),
      })),
    },
  ];

  const renderSectionHeader = ({ section }: { section: any }) => {
    if (section.key === 'banner' || section.key === 'quickMenu' || section.key === 'categoryFilter') {
      return null;
    }

    if (section.key === 'recommendedCompanies') {
      return (
        <SectionHeader
          title="추천 기업"
          onMore={() => console.log('More companies')}
        />
      );
    }

    if (section.key === 'popularProducts') {
      return (
        <SectionHeader
          title="지역 인기있는 상품"
          subtitle=""
          onMore={() => console.log('More popular')}
        />
      );
    }

    if (section.key === 'allProducts') {
      return (
        <View>
          <SectionHeader
            title="전체 상품 한눈에 담기"
            onMore={() => console.log('More all products')}
          />
        </View>
      );
    }

    return null;
  };

  const renderItem = ({ item, section }: { item: any; section: any }) => {
    // 배너
    if (section.key === 'banner') {
      return <BannerCarousel banners={BANNERS} />;
    }

    // 퀵 메뉴
    if (section.key === 'quickMenu') {
      return (
        <QuickMenuGrid
          menus={QUICK_MENUS}
          onPress={(menu) => console.log('Quick menu:', menu.label)}
        />
      );
    }

    // 추천 기업
    if (section.key === 'recommendedCompanies') {
      return (
        <CompanyCardList
          companies={RECOMMENDED_COMPANIES}
          onPress={(company) => console.log('Company:', company.name)}
        />
      );
    }

    // 카테고리 필터
    if (section.key === 'categoryFilter') {
      return (
        <View style={styles.categorySection}>
          <CategoryChips
            categories={CATEGORY_CHIPS}
            activeId={activeCategory}
            onSelect={handleCategorySelect}
          />
        </View>
      );
    }

    // 상품 리스트 아이템
    if (section.key === 'popularProducts' || section.key === 'allProducts') {
      return (
        <ProductListItem
          product={item}
          onPress={handleProductPress}
          onLike={handleLike}
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 고정 헤더 */}
      <HomeHeader
        onSearch={handleSearch}
        onNotification={handleNotification}
        notificationCount={3}
      />

      {/* 메인 컨텐츠 */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id || `item-${index}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
        contentContainerStyle={styles.listContent}
      />

      {/* FAB */}
      <FloatingActionButton onPost={handlePost} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingBottom: spacing['5xl'],
  },
  sectionSeparator: {
    height: spacing.sm,
    backgroundColor: colors.backgroundGray,
  },
  categorySection: {
    backgroundColor: colors.white,
    paddingTop: spacing.sm,
  },
});

export default HomeScreen;
