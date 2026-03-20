import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { screenPadding, borderRadius } from '../../styles/spacing';
import MainLogo from '../../assets/images/main_logo.svg';
import SearchIcon from '../../assets/icon/Search.svg';
import GearsIcon from '../../assets/icon/gears.svg';
import { CompanyCard } from '../../components/common';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = screenPadding.horizontal;

interface CompanyItem {
  id: string;
  name: string;
  description: string;
  tags: string;
  image: any;
}

interface AllCompanyItem extends CompanyItem {
  hasEstimateTag: boolean;
  iconColor?: string;
}

const IMG01 = require('../../assets/images/img01.png');
const IMG02 = require('../../assets/images/img02.png');

const NEW_COMPANIES: CompanyItem[] = [
  { id: '1', name: '마키나허브', description: '정밀 임가공 전문 업체. 다양한 장비 보유.', tags: 'CNC 선반 · 밀링 · 정밀 가공', image: IMG02 },
  { id: '2', name: '톰마켓', description: '산업기계 임가공의 신뢰를 구축하는 전문 업체..', tags: '머시닝센터 · 보링기 · 연삭기', image: IMG02 },
  { id: '3', name: '마키나허브', description: '정밀 임가공 전문 업체. 다양한 장비 보유.', tags: 'CNC 선반 · 밀링 · 정밀 가공', image: IMG02 },
  { id: '4', name: '톰마켓', description: '산업기계 임가공의 신뢰를 구축하는 전문 업체..', tags: '머시닝센터 · 보링기 · 연삭기', image: IMG02 },
  { id: '5', name: '마키나허브', description: '정밀 임가공 전문 업체. 다양한 장비 보유.', tags: 'CNC 선반 · 밀링 · 정밀 가공', image: IMG02 },
  { id: '6', name: '톰마켓', description: '산업기계 임가공의 신뢰를 구축하는 전문 업체..', tags: '머시닝센터 · 보링기 · 연삭기', image: IMG02 },
];

const POPULAR_COMPANIES: CompanyItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  name: '아라요 기계장터',
  description: '레이저 설비 세계 1위. 최고의 기술력과 만족도. 창립 10주년 특가...',
  tags: '화천기계, 대성하이텍, FFG DM...',
  image: IMG01,
}));

const ICON_COLORS = [colors.primary, colors.secondary, '#3B5998', '#E04040'];

const generateAllCompanies = (count: number, startId = 0): AllCompanyItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(startId + i + 1),
    name: '아라요 기계장터',
    description: '산업 현장에서 필요한 기계를 합리적으로 연결합니다.',
    tags: '화천기계, 대성하이텍, FFG DMC, 기아테크...',
    hasEstimateTag: true,
    image: IMG01,
    iconColor: ICON_COLORS[(startId + i) % ICON_COLORS.length],
  }));

const ProgressBar = ({ progress }: { progress: number }) => (
  <View style={styles.progressBarBg}>
    <View style={[styles.progressBarFill, { width: `${Math.max(Math.min(progress * 100, 100), 0)}%` }]} />
  </View>
);

const SectionHead = ({ title, onViewAll }: { title: string; onViewAll?: () => void }) => (
  <View style={styles.secHead}>
    <Text style={styles.secHeadTitle}>{title}</Text>
    <TouchableOpacity style={styles.secHeadViewAll} onPress={onViewAll} activeOpacity={0.6}>
      <Text style={styles.viewAllText}>전체보기</Text>
      <Text style={styles.viewAllArrow}>{'>'}</Text>
    </TouchableOpacity>
  </View>
);

const BestBadge = () => (
  <View style={styles.bestBadge}>
    <Text style={styles.bestBadgeText}>BEST</Text>
  </View>
);

const AllCompanyListItem = ({ item, onPress }: { item: AllCompanyItem; onPress: () => void }) => (
  <TouchableOpacity style={styles.listItem} activeOpacity={0.7} onPress={onPress}>
    <View style={[styles.listThumb, { backgroundColor: item.iconColor || colors.primary }]}>
      <GearsIcon width={32} height={32} color={colors.white} />
    </View>
    <View style={styles.listCon}>
      <View style={styles.listHead}>
        <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
        {item.hasEstimateTag && (
          <View style={styles.redTag}>
            <Text style={styles.redTagLabel}>1:1견적요청</Text>
          </View>
        )}
      </View>
      <Text style={styles.listDesc} numberOfLines={2}>{item.description}</Text>
      <Text style={styles.listTags} numberOfLines={2}>{item.tags}</Text>
    </View>
  </TouchableOpacity>
);

const SearchSection = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.searchSection}>
      <Text style={styles.searchSubtitle}>원하시는 업체를 알아보세요</Text>
      <Text style={styles.searchTitle}>임가공 업체 찾기</Text>

      <Image
        source={require('../../assets/images/processing_home.png')}
        style={styles.searchBanner}
        resizeMode="contain"
      />

      <View style={styles.searchInputWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="키워드로 검색 (업체명,지역,취급 품목)"
          placeholderTextColor={colors.G500}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchInputBtn} activeOpacity={0.6}>
          <SearchIcon width={18} height={18} color={colors.G600} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HorizontalSwiperSection = ({
  title,
  data,
  renderCard,
}: {
  title: string;
  data: CompanyItem[];
  renderCard: (item: CompanyItem) => React.ReactNode;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const CARD_WIDTH = (SCREEN_WIDTH - PADDING_LR) / 2.1;
  const GAP = 10;

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const maxScroll = contentSize.width - layoutMeasurement.width;
      if (maxScroll > 0) {
        setScrollProgress(contentOffset.x / maxScroll);
      }
    },
    [],
  );

  return (
    <View style={styles.swiperSection}>
      <View style={styles.swiperSectionHead}>
        <SectionHead title={title} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: PADDING_LR, paddingRight: PADDING_LR - GAP }}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, idx) => (
          <View key={`${item.id}-${idx}`} style={{ width: CARD_WIDTH, marginRight: GAP }}>
            {renderCard(item)}
          </View>
        ))}
      </ScrollView>
      <View style={styles.swiperProgressWrap}>
        <ProgressBar progress={scrollProgress === 0 ? 1 / data.length : scrollProgress} />
      </View>
    </View>
  );
};

const AllCompaniesSection = ({
  companies,
  isLoading,
  onPressItem,
}: {
  companies: AllCompanyItem[];
  isLoading: boolean;
  onPressItem: () => void;
}) => (
  <View style={styles.allCompaniesSection}>
    <View style={styles.allCompaniesHeader}>
      <Text style={styles.secTitle}>전체 업체</Text>
    </View>
    <View style={styles.allCompaniesList}>
      {companies.map((item) => (
        <AllCompanyListItem key={item.id} item={item} onPress={onPressItem} />
      ))}
      {isLoading && (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="small" color={colors.G500} />
          <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
        </View>
      )}
    </View>
  </View>
);

const INITIAL_COUNT = 10;
const MAX_COUNT = 40;

export const ProcessingHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [companies, setCompanies] = useState<AllCompanyItem[]>(() => generateAllCompanies(INITIAL_COUNT));
  const [isLoading, setIsLoading] = useState(true);
  const hasMore = companies.length < MAX_COUNT;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setCompanies((prev) => {
        const remaining = MAX_COUNT - prev.length;
        if (remaining <= 0) return prev;
        const addCount = Math.min(INITIAL_COUNT, remaining);
        return [...prev, ...generateAllCompanies(addCount, prev.length)];
      });
      setIsLoading(false);
    }, 1200);
  }, [isLoading, hasMore]);

  React.useEffect(() => {
    if (isLoading && companies.length === INITIAL_COUNT) {
      setTimeout(() => {
        setCompanies((prev) => {
          const addCount = Math.min(INITIAL_COUNT, MAX_COUNT - prev.length);
          return [...prev, ...generateAllCompanies(addCount, prev.length)];
        });
        setIsLoading(false);
      }, 1200);
    }
  }, []);

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

  const navigateToDetail = () => {
    navigation.navigate('ProcessingCompanyDetail');
  };

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
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        <SearchSection />
        <HorizontalSwiperSection
          title="신규 등록 업체"
          data={NEW_COMPANIES}
          renderCard={(item) => (
            <CompanyCard item={item} onPress={navigateToDetail} />
          )}
        />
        <HorizontalSwiperSection
          title="가장 인기 있는 업체"
          data={POPULAR_COMPANIES}
          renderCard={(item) => (
            <CompanyCard
              item={item}
              descNumberOfLines={3}
              badge={<BestBadge />}
              onPress={navigateToDetail}
            />
          )}
        />
        <AllCompaniesSection
          companies={companies}
          isLoading={isLoading}
          onPressItem={navigateToDetail}
        />
        <View style={{ height: 20 }} />
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
    paddingHorizontal: PADDING_LR,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  appBarSearchBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainScroll: {
    flex: 1,
  },

  searchSection: {
    backgroundColor: colors.G100,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: PADDING_LR,
  },
  searchSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.G600,
  },
  searchTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginTop: 5,
    marginBottom: 15,
  },
  searchBanner: {
    width: '100%',
    height: 160,
    marginBottom: 15,
  },

  searchInputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.G200,
    paddingLeft: 12,
    paddingRight: 65,
    backgroundColor: colors.white,
    color: colors.black,
  },
  searchInputBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  secHeadTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  secHeadViewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  viewAllArrow: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },

  secTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginBottom: 12,
  },

  swiperSection: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  swiperSectionHead: {
    paddingHorizontal: PADDING_LR,
  },
  swiperProgressWrap: {
    paddingHorizontal: PADDING_LR,
    marginTop: 15,
  },

  progressBarBg: {
    height: 3,
    backgroundColor: colors.G200,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.black,
    borderRadius: 6,
  },

  bestBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  bestBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.white,
    letterSpacing: 0.5,
  },

  allCompaniesSection: {
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: colors.G100,
  },
  allCompaniesHeader: {
    paddingHorizontal: PADDING_LR,
  },
  allCompaniesList: {
    paddingHorizontal: PADDING_LR,
  },

  listItem: {
    padding: 13,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 8,
  },
  listThumb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCon: {
    flex: 1,
    gap: 5,
  },
  listHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 4,
  },
  listName: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    flex: 1,
  },
  redTag: {
    backgroundColor: colors.redTagBg,
    paddingHorizontal: 5,
    borderRadius: 4,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redTagLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.primary,
  },
  listDesc: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 18.2,
    color: colors.black,
  },
  listTags: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.G600,
    lineHeight: 15.6,
  },

  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.G500,
    marginTop: 6,
  },
});
