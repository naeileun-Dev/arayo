import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import MainLogo from '../../assets/images/main_logo.svg';
import SearchIcon from '../../assets/icon/Search.svg';
import CompanyIcon from '../../assets/icon/company.svg';

const BANNER_IMG = require('../../assets/images/img02.png');

interface BrandItem {
  id: string;
  name: string;
  description: string;
  tags: string;
}

const generateBrands = (count: number, startId = 0): BrandItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(startId + i + 1),
    name: '아라요 기계장터',
    description: '산업 현장에서 필요한 기계를 합리적으로 연결합니다.',
    tags: 'CNC 선반, 베어링 머신, 범용 밀링',
  }));

const TOTAL_COUNT = 123;
const PAGE_SIZE = 10;

const BrandListItem = ({ item }: { item: BrandItem }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.listItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('BrandDetail', { brandId: item.id })}
    >
      <View style={styles.iconBox}>
        <CompanyIcon width={40} height={40} color={colors.white} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.itemTags} numberOfLines={1}>{item.tags}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const BrandSearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [brands, setBrands] = useState<BrandItem[]>(() => generateBrands(PAGE_SIZE));
  const [isLoading, setIsLoading] = useState(true);
  const hasMore = brands.length < TOTAL_COUNT;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBrands((prev) => [
        ...prev,
        ...generateBrands(Math.min(PAGE_SIZE, TOTAL_COUNT - prev.length), prev.length),
      ]);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setBrands((prev) => {
        const remaining = TOTAL_COUNT - prev.length;
        if (remaining <= 0) return prev;
        return [...prev, ...generateBrands(Math.min(PAGE_SIZE, remaining), prev.length)];
      });
      setIsLoading(false);
    }, 1200);
  }, [isLoading, hasMore]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
      if (distanceFromBottom < 200 && !isLoading && hasMore) {
        loadMore();
      }
    },
    [isLoading, hasMore, loadMore],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <MainLogo width={90} height={32} />
        <TouchableOpacity
          style={styles.appBarSearchBtn}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Search')}
        >
          <SearchIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        <View style={styles.bannerWrap}>
          <Image source={BANNER_IMG} style={styles.bannerImage} resizeMode="cover" />
        </View>

        <View style={styles.countSection}>
          <Text style={styles.countLabel}>전체</Text>
          <Text style={styles.countNumber}>{TOTAL_COUNT}개</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.listSection}>
          {brands.map((item) => (
            <BrandListItem key={item.id} item={item} />
          ))}
        </View>

        {isLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  appBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  appBarSearchBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  bannerWrap: {
    marginHorizontal: 20,
    marginTop: 15,
    height: 75,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 22,
  },
  bannerSub: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  countSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    gap: 6,
  },
  countLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B1B1B',
  },
  countNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B1B1B1',
  },
  divider: {
    height: 1,
    backgroundColor: colors.G200,
    marginHorizontal: 20,
  },
  listSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G100,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#1B1B1B',
  },
  itemTags: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7E7E7E',
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primary,
    marginTop: 6,
  },
});
