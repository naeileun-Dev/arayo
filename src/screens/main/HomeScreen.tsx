import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import MainLogo from '../../assets/images/main_logo.svg';
import SearchIcon from '../../assets/icon/Search.svg';
import AlarmIcon from '../../assets/icon/alarm.svg';
import HeadsetIcon from '../../assets/icon/headset.svg';
import BuildingIcon from '../../assets/icon/building.svg';
import AboutIcon from '../../assets/icon/about.svg';
import GearsIcon from '../../assets/icon/gears.svg';
import NewsIcon from '../../assets/icon/news.svg';
import ProcessIcon from '../../assets/icon/process.svg';
import HeartIcon from '../../assets/icon/heart.svg';
import CommentIcon from '../../assets/icon/comment.svg';
import ChevronRightIcon from '../../assets/icon/chevron-right.svg';

const { width } = Dimensions.get('window');

const RECOMMENDED_COMPANIES = [
  { id: '1', name: '마키나허브', desc: '중고 산업기계를 쉽고 정확하게 연결합니다.', tags: '정밀 선반 · 고출력 모델' },
  { id: '2', name: '툴마켓', desc: '산업기계 유통의 신뢰를 구축하는 중고거래 플..', tags: '고강성 머시닝센터 · 점검 완료' },
  { id: '3', name: '마키나허브', desc: '중고 산업기계를 쉽고 정확하게 연결합니다.', tags: '정밀 선반 · 고출력 모델' },
];

const POPULAR_PRODUCTS = [
  { id: '1', title: '온도조절 안정적 · 장시간 운전 가능온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: '12,300,000원', date: '9분전', likes: 21, comments: 5 },
  { id: '2', title: '온도조절 안정적 · 장시간 운전 가능온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: '12,300,000원', date: '9분전', likes: 21, comments: 5 },
  { id: '3', title: '온도조절 안정적 · 장시간 운전 가능온도조절 안정적 · 온도조절 안정적', tags: '#누유무 #톱날교체용이', price: '12,300,000원', date: '9분전', likes: 21, comments: 5 },
];

const BANNER_IMAGES = [
  require('../../assets/images/tmp_video01.png'),
  require('../../assets/images/banner02.png'),
  require('../../assets/images/banner01.png'),
];

const COMPANY_BG_IMAGES = [
  require('../../assets/images/img01.png'),
  require('../../assets/images/img02.png'),
];

const TABS = ['전체', '공작기계', '금형/사출기', '판금/용접', '목공기계', '운반/중장비'];

const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 4,
          borderBottomColor: colors.G400,
          borderLeftColor: colors.G300,
          borderRightColor: colors.G200,
          borderTopColor: colors.G100,
        },
        { transform: [{ rotate }] },
      ]}
    />
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [allProducts, setAllProducts] = useState(POPULAR_PRODUCTS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const bannerRef = useRef<FlatList>(null);

  const onBannerScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setBannerIndex(index);
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = POPULAR_PRODUCTS.map((item, i) => ({
        ...item,
        id: `page${nextPage}-${i + 1}`,
      }));
      setAllProducts(prev => [...prev, ...newItems]);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, hasMore, page]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setAllProducts(POPULAR_PRODUCTS);
    setPage(1);
    setHasMore(true);
  }, []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (distanceFromBottom < 200) {
      loadMoreProducts();
    }
  }, [loadMoreProducts]);

  const handleSearch = () => {
    if (searchText.trim().length >= 2) {
      (navigation as any).navigate('Search');
    } else {
      Alert.alert('알림', '검색어는 두글자 이상 입력하십시오.');
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.logoBox}>
        <MainLogo width={90} height={32} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="어떤 설비를 찾으세요?"
          placeholderTextColor={colors.G500}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <SearchIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.alarmIcon} onPress={() => (navigation as any).navigate('Notification')}>
        <AlarmIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  const renderServiceGrid = () => (
    <View style={styles.serviceGridSection}>
      <View style={styles.gridTopRow}>
        <TouchableOpacity style={styles.gridItemLarge} onPress={() => Alert.alert('설비 구매하기')}>
          <Text style={styles.gridItemLargeText}>설비 구매하기</Text>
        </TouchableOpacity>
        <View style={styles.gridTopRightCol}>
          <TouchableOpacity style={styles.gridItemSmall} onPress={() => Alert.alert('견적문의')}>
            <HeadsetIcon width={20} height={20} color={colors.primary200} />
            <Text style={styles.gridItemSmallText}>견적문의</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItemSmall} onPress={() => Alert.alert('브랜드 관')}>
            <BuildingIcon width={20} height={20} color={colors.primary200} />
            <Text style={styles.gridItemSmallText}>브랜드 관</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.gridBottomBox}>
        <Text style={styles.gridBottomTitle}>이런 서비스도 있어요</Text>
        <View style={styles.gridBottomMenu}>
          <TouchableOpacity style={styles.bottomMenuItem} onPress={() => Alert.alert('서비스 소개')}>
            <AboutIcon width={24} height={24} />
            <Text style={styles.bottomMenuText}>서비스 소개</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomMenuItem} onPress={() => Alert.alert('임가공')}>
            <GearsIcon width={24} height={24} />
            <Text style={styles.bottomMenuText}>임가공</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomMenuItem} onPress={() => Alert.alert('산업소식')}>
            <NewsIcon width={24} height={24} />
            <Text style={styles.bottomMenuText}>산업소식</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomMenuItem} onPress={() => Alert.alert('고철처리')}>
            <ProcessIcon width={24} height={24} />
            <Text style={styles.bottomMenuText}>고철처리</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <FlatList
        ref={bannerRef}
        data={BANNER_IMAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onBannerScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => `banner-${index}`}
        renderItem={({ item }) => (
          <Image source={item} style={styles.bannerImage} resizeMode="cover" />
        )}
      />
      <View style={styles.paginationBox}>
        <Text style={styles.paginationText}>{bannerIndex + 1} / {BANNER_IMAGES.length}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = (title: string, showViewAll: boolean = true) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>전체보기</Text>
          <ChevronRightIcon width={16} height={16} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderRecommendedCompanies = () => (
    <View style={styles.sectionContainer}>
      {renderSectionHeader('추천 기업')}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.px20}
        data={RECOMMENDED_COMPANIES}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.companyCard}>
            <View style={styles.companyThumbBox}>
              <Image
                source={COMPANY_BG_IMAGES[index % COMPANY_BG_IMAGES.length]}
                style={styles.companyBgImage}
                resizeMode="cover"
              />
              <Image
                source={require('../../assets/images/profileImg.png')}
                style={styles.companyProfileImg}
              />
            </View>
            <View style={styles.companyCon}>
              <Text style={styles.companyName}>{item.name}</Text>
              <Text style={styles.companyDesc} numberOfLines={2}>{item.desc}</Text>
              <Text style={styles.companyTags}>{item.tags}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderMagazineProduct = (item: any) => (
    <TouchableOpacity style={styles.magazineCard} key={item.id} onPress={() => (navigation as any).navigate('ProductView', { productId: item.id })}>
      <Image
        source={require('../../assets/images/img03.png')}
        style={styles.magazineThumb}
        resizeMode="cover"
      />
      <View style={styles.magazineCon}>
        <Text style={styles.bestBadge}>BEST</Text>
        <Text style={styles.magazineTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.magazineTags}>{item.tags}</Text>
        <View style={styles.magazineFooter}>
          <Text style={styles.magazinePrice}>{item.price}</Text>
          <View style={styles.magazineMeta}>
            <Text style={styles.magazineMetaText}>{item.date}</Text>
            <View style={styles.iconWithText}>
              <HeartIcon width={14} height={14} />
              <Text style={styles.magazineMetaText}>{item.likes}</Text>
            </View>
            <View style={styles.iconWithText}>
              <CommentIcon width={14} height={14} />
              <Text style={styles.magazineMetaText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPopularProducts = () => (
    <View style={styles.sectionContainer}>
      {renderSectionHeader('가장 인기있는 상품')}
      <View style={styles.magazineList}>
        {POPULAR_PRODUCTS.map(item => renderMagazineProduct(item))}
      </View>
    </View>
  );

  const renderMiddleBanner = () => (
    <View style={styles.middleBannerWrapper}>
      <Image
        source={require('../../assets/images/banner01.png')}
        style={styles.middleBannerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderAllProducts = () => (
    <View style={styles.sectionContainer}>
      {renderSectionHeader('전체 상품 한눈에 보기')}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
            onPress={() => handleTabChange(tab)}
          >
            <Text style={[styles.tabChipText, activeTab === tab && styles.tabChipTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[styles.magazineList, styles.pt12]}>
        {allProducts.map(item => renderMagazineProduct(item))}
      </View>
      {isLoadingMore && (
        <View style={styles.loadingMore}>
          <Spinner size={28} />
          <Text style={styles.loadingMoreText}>전체 상품을 불러오는 중입니다.</Text>
        </View>
      )}
      {!hasMore && (
        <View style={styles.endOfList}>
          <Text style={styles.endOfListText}>모든 상품을 확인했습니다</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderServiceGrid()}
        {renderBanner()}
        {renderRecommendedCompanies()}
        {renderPopularProducts()}
        {renderMiddleBanner()}
        {renderAllProducts()}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => (navigation as any).navigate('ProductUpload')}>
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}> 상품등록</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, backgroundColor: colors.white },
  px20: { paddingHorizontal: 20 },
  contentContainer: { paddingBottom: 100 },
  pt12: { paddingTop: 12 },

  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  logoBox: { width: 90, marginRight: 12, justifyContent: 'center' },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    paddingHorizontal: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.black, padding: 0 },
  searchIcon: { marginLeft: 8 },
  alarmIcon: { width: 34, alignItems: 'flex-end', justifyContent: 'center', marginLeft: 10 },

  serviceGridSection: {
    paddingVertical: 25,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  gridTopRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  gridItemLarge: {
    flex: 1,
    height: 124,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemLargeText: { fontSize: 18, fontWeight: '600', color: colors.white },
  gridTopRightCol: {
    flex: 1,
    gap: 8,
  },
  gridItemSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  gridItemSmallText: { fontSize: 16, fontWeight: '600', color: colors.black },
  gridBottomBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 8,
  },
  gridBottomTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20, color: colors.black },
  gridBottomMenu: { flexDirection: 'row', justifyContent: 'space-between' },
  bottomMenuItem: { flex: 1, alignItems: 'center', gap: 8 },
  bottomMenuText: { fontSize: 12, color: colors.G600, fontWeight: '500' },

  bannerContainer: { height: 222, position: 'relative' },
  bannerImage: { width, height: 222 },
  paginationBox: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(27,27,27,0.5)',
    paddingHorizontal: 10,
    height: 22,
    borderRadius: 30,
    justifyContent: 'center',
  },
  paginationText: { color: colors.white, fontSize: 12 },

  sectionContainer: { paddingVertical: 25 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.black },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 2,
  },
  viewAllText: { fontSize: 13, color: colors.black, lineHeight: 16 },

  companyCard: {
    width: 204,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 5,
    overflow: 'visible',
  },
  companyThumbBox: { position: 'relative' },
  companyBgImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  companyProfileImg: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    zIndex: 5,
  },
  companyCon: { padding: 15, paddingTop: 20, gap: 8 },
  companyName: { fontSize: 15, fontWeight: '600', color: colors.black },
  companyDesc: { fontSize: 13, color: colors.black, lineHeight: 18 },
  companyTags: { fontSize: 12, color: colors.G600 },

  magazineList: { paddingHorizontal: 20, gap: 8 },
  magazineCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  magazineThumb: { width: 120, height: 120 },
  magazineCon: { flex: 1, paddingVertical: 12, paddingHorizontal: 15, gap: 5 },
  bestBadge: { fontSize: 10, fontWeight: '500', color: colors.error },
  magazineTitle: { fontSize: 14, fontWeight: '600', color: colors.black, lineHeight: 18 },
  magazineTags: { fontSize: 12, color: colors.G600 },
  magazineFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  magazinePrice: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  magazineMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  magazineMetaText: { fontSize: 11, color: colors.G600 },
  iconWithText: { flexDirection: 'row', alignItems: 'center', gap: 3 },

  middleBannerWrapper: { paddingVertical: 15, paddingHorizontal: 20 },
  middleBannerImage: { width: '100%', height: 138, borderRadius: 4 },

  tabScrollContainer: { paddingHorizontal: 20, gap: 5 },
  tabChip: {
    height: 40,
    paddingHorizontal: 15,
    minWidth: 65,
    borderRadius: 20,
    backgroundColor: colors.G100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabChipActive: { backgroundColor: colors.primary },
  tabChipText: { fontSize: 14, fontWeight: '500', color: colors.G700 },
  tabChipTextActive: { color: colors.white },

  loadingMore: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 10,
  },
  loadingMoreText: { fontSize: 13, color: colors.G500 },
  endOfList: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },
  endOfListText: { fontSize: 13, color: colors.G500 },

  fab: {
    position: 'absolute',
    bottom: 54,
    right: 16,
    width: 101,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  fabIcon: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.white,
    includeFontPadding: false,
    lineHeight: 24,
  },
  fabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    includeFontPadding: false,
    lineHeight: 17,
  },
});
