import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

import MapPinIcon from '../../assets/icon/map-pin.svg';
import ShareIcon from '../../assets/icon/share.svg';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';
import HeartIcon from '../../assets/icon/heart.svg';
import HeartActiveIcon from '../../assets/icon/heart_active.svg';
import StarIcon from '../../assets/icon/star.svg';

import {
  colors,
  PRODUCT_IMGS,
  BANNER_IMG,
  PROFILE_IMG,
  TABS,
  SECTION_KEYS,
  STICKY_HEADER_HEIGHT,
  SERVICE_ITEMS,
  SPEC_ROWS,
  SELLER_INFO,
  SectionKey,
} from './constants';
import { styles } from './ProductViewScreen.styles';
import { ReviewItem } from './components/ReviewItem';
import { ProductCard } from './components/ProductCard';
import { ReportModal } from '../../components/product/ReportModal';
import { CompareToast } from '../../components/common';
import { fontFamily } from '../../styles/typography';
import { SectionHeader } from '../../components/common';
import { ServiceTag } from '../../components/common';
import { RatingBreakdown } from '../../components/common';

const HASH_TAGS = ['#신품급', '#즉시설치', '#빠른대응'];
const SCROLL_ITEMS = [1, 2, 3, 4, 5];
const RECOMMEND_ITEMS = [1, 2, 3, 4];

export const ProductViewScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isBottomLiked, setIsBottomLiked] = useState(false);
  const [reviews, setReviews] = useState([1, 2]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [tabBarScrolled, setTabBarScrolled] = useState(false);
  const headerHeightRef = useRef(56);
  const tabBarYRef = useRef(0);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        title: '아라요 상품 공유',
        message: '아라요에서 중고 기계 상품을 확인해보세요!\nhttps://arayo.co.kr',
      });
    } catch {
      // 공유 취소 또는 오류 — 별도 처리 없음
    }
  }, []);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const sectionRefs = useRef<Record<SectionKey, number>>({
    intro: 0,
    seller: 0,
    recommend: 0,
    review: 0,
  });
  const wrapperYRef = useRef(0);
  const isTabPressScrolling = useRef(false);

  const handleTabPress = (idx: number) => {
    setActiveTab(idx);
    isTabPressScrolling.current = true;
    const sectionY = sectionRefs.current[SECTION_KEYS[idx]] ?? 0;
    scrollViewRef.current?.scrollTo({
      y: wrapperYRef.current + sectionY - STICKY_HEADER_HEIGHT,
      animated: true,
    });
    setTimeout(() => {
      isTabPressScrolling.current = false;
    }, 500);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;

    setHeaderScrolled(scrollY > 280);
    setTabBarScrolled(scrollY >= tabBarYRef.current - headerHeightRef.current);

    if (!isTabPressScrolling.current) {
      const offset = STICKY_HEADER_HEIGHT + 20;
      let currentIdx = 0;
      for (let i = SECTION_KEYS.length - 1; i >= 0; i--) {
        if (scrollY >= wrapperYRef.current + sectionRefs.current[SECTION_KEYS[i]] - offset) {
          currentIdx = i;
          break;
        }
      }
      if (currentIdx !== activeTab) {
        setActiveTab(currentIdx);
      }
    }

    if (layoutMeasurement.height + scrollY >= contentSize.height - 150 && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setReviews(prev => [...prev, prev.length + 1, prev.length + 2]);
        setIsLoadingMore(false);
      }, 800);
    }
  };

  const captureLayout = useCallback(
    (key: SectionKey) => (e: any) => {
      sectionRefs.current[key] = e.nativeEvent.layout.y;
    },
    [],
  );

  const toggleLike = useCallback((key: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleToggleService = () => {
    setIsServiceOpen(prev => !prev);
  };

  const handleToggleBottomLike = () => {
    setIsBottomLiked(prev => !prev);
  };

  const handleNavigateToOrder = () => {
    navigation.navigate('OrderWrite', {
      product: {
        id: '1',
        name: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
        price: 2400000,
        imageUrl: undefined,
      },
    });
  };

  const iconColor = headerScrolled ? '#1B1B1B' : colors.white;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sticky Header — absolute, always on top */}
      <View
        style={[styles.headerOverlay, headerScrolled && styles.headerOverlayScrolled]}
        onLayout={(e) => { headerHeightRef.current = e.nativeEvent.layout.height; }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.overlayBtn}>
          <ChevronLeftIcon width={30} height={30} color={iconColor} />
        </TouchableOpacity>
        <View style={styles.overlayRightGroup}>
          <TouchableOpacity style={styles.overlayBtn} onPress={handleShare}>
            <ShareIcon width={24} height={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayBtn} onPress={() => setMenuVisible(!menuVisible)}>
            <Text style={[styles.moreIcon, { color: iconColor }]}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Tab Bar — shown below the header when scrolled past original tab bar */}
      {tabBarScrolled && (
        <View style={[styles.fixedTabBar, { top: headerHeightRef.current }]}>
          <View style={styles.tabRow}>
            {TABS.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.tabBtn, activeTab === idx && styles.tabBtnActive]}
                onPress={() => handleTabPress(idx)}
              >
                <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        style={styles.flex1}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.slideSection}>


          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {PRODUCT_IMGS.map((img, idx) => (
              <Image key={idx} source={img} style={styles.slideImg} resizeMode="cover" />
            ))}
          </ScrollView>

          <View style={styles.paginationBadge}>
            <Text style={styles.paginationText}>
              <Text style={styles.bold}>1</Text> / 3
            </Text>
          </View>
        </View>

        <View style={styles.px20}>
          <Text style={styles.subject}>접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>10,000,000원</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>채팅 3</Text>
              <Text style={styles.statText}>관심 45</Text>
              <Text style={styles.statText}>조회 63</Text>
            </View>
          </View>

          <View style={styles.profileRow}>
            <Image source={PROFILE_IMG} style={styles.profileImg} resizeMode="cover" />
            <View style={styles.flex1}>
              <Text style={styles.profileName}>주식회사 아라요 기계장터 (대표)</Text>
              <Text style={styles.profileTel}>0501-2345-6789</Text>
            </View>
          </View>

          <View style={styles.specBox}>
            {SPEC_ROWS.map(spec => (
              <View key={spec.label} style={styles.specRow}>
                <Text style={styles.specDt}>{spec.label}</Text>
                <Text style={styles.specDd}>{spec.value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={localStyles.serviceToggle}
            activeOpacity={0.7}
            onPress={handleToggleService}
          >
            <Text style={localStyles.serviceToggleText}>제공 서비스</Text>
            {isServiceOpen ? (
              <ChevronUpIcon width={16} height={16} color={colors.black} />
            ) : (
              <ChevronDownIcon width={16} height={16} color={colors.black} />
            )}
          </TouchableOpacity>

          {isServiceOpen && (
            <View style={styles.serviceGrid}>
              {SERVICE_ITEMS.map((col, colIdx) => (
                <View key={colIdx} style={styles.serviceCol}>
                  {col.map((srv, idx) => (
                    <ServiceTag key={idx} {...srv} />
                  ))}
                </View>
              ))}
            </View>
          )}

          <View style={styles.thinDivider} />

          <View style={styles.infoBoxRow}>
            <View style={styles.infoBoxItem}>
              <View style={styles.rowCenterGap4}>
                <StarIcon width={16} height={16} />
                <Text style={styles.infoBoxText}>
                  4.2 <Text style={styles.textG600}>(리뷰 2건)</Text>
                </Text>
              </View>
            </View>
            <View style={styles.infoBoxDivider} />
            <View style={styles.infoBoxItem}>
              <View style={styles.rowCenterGap4}>
                <MapPinIcon width={14} height={14} color={colors.black} />
                <Text style={styles.infoBoxText}>서울시 송파구</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.px20}>
          <Image source={BANNER_IMG} style={styles.bannerImg} resizeMode="cover" />
        </View>

        <View
          style={styles.tabWrap}
          onLayout={(e) => { tabBarYRef.current = e.nativeEvent.layout.y; }}
        >
          <View style={styles.tabRow}>
            {TABS.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.tabBtn, activeTab === idx && styles.tabBtnActive]}
                onPress={() => handleTabPress(idx)}
              >
                <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          onLayout={e => {
            wrapperYRef.current = e.nativeEvent.layout.y;
          }}
        >
          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('intro')}>
            <Text style={styles.secTitle}>상품소개</Text>
            <View style={styles.hashTagRow}>
              {HASH_TAGS.map(tag => (
                <Text key={tag} style={styles.hashTag}>
                  {tag}
                </Text>
              ))}
            </View>
            <Text style={styles.descText}>
              접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H 판매합니다.{'\n\n'}
              [신품급 상태 / 즉시 설치 가능 / 마지막 재고 1대]{'\n\n'}
              정밀 측정 장비 교체로 인해 래쇼날 CS-3020H 비디오메타 한 대를 정리합니다.{'\n'}
              접촉식 + 비접촉식 겸용 모델이라 다양한 소재·형상의 치수 측정에 활용 가능하며, 실사용 시간이 적어 신품급 상태를 유지하고 있습니다.{'\n\n'}
              *상태 및 특징{'\n'}
              - 신품급 컨디션 (렌즈·XYZ 축·테이블 모두 양호){'\n'}
              - 즉시 설치 가능 — 현장 설치 지원 가능{'\n'}
              - 정확한 반복 측정, 비접촉 측정 속도 우수{'\n'}
              - 접촉식 프로브 포함{'\n\n'}
              현재 보유한 마지막 매물입니다.
            </Text>
            <Text style={styles.timeAgo}>53분 전</Text>
          </View>

          <View style={styles.sectionGap} />

          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('seller')}>
            <Text style={styles.secTitle}>판매자 정보</Text>
            <View style={styles.table}>
              {SELLER_INFO.map((row, idx) => (
                <View
                  key={row.label}
                  style={[styles.tr, idx === SELLER_INFO.length - 1 && styles.trLast]}
                >
                  <Text style={styles.th}>{row.label}</Text>
                  <Text style={[styles.td, row.isLink && styles.textLink]}>{row.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionGap} />

          <View style={styles.pt20}>
            <SectionHeader title="이 판매자의 다른 상품" onViewAll={() => {}} style={styles.px20} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.px20}
            >
              {SCROLL_ITEMS.map(item => (
                <ProductCard
                  key={item}
                  width={194.5}
                  height={140}
                  liked={likedItems.has(`seller-${item}`)}
                  onLike={() => toggleLike(`seller-${item}`)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionGap} />

          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('recommend')}>
            <SectionHeader title="추천 상품" onViewAll={() => {}} />
            <View style={styles.recommendGrid}>
              {RECOMMEND_ITEMS.map(item => (
                <View key={item} style={styles.recommendCard}>
                  <View style={styles.recommendImg}>
                    <Image
                      source={PRODUCT_IMGS[item % 3]}
                      style={StyleSheet.absoluteFill}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.heartBtn}
                      onPress={() => toggleLike(`recommend-${item}`)}
                    >
                      {likedItems.has(`recommend-${item}`) ? (
                        <HeartActiveIcon width={20} height={20} />
                      ) : (
                        <HeartIcon width={20} height={20} color={colors.black} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.bestTag}>BEST</Text>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    온도조절 안정적 · 장시간 운전
                  </Text>
                  <Text style={styles.cardTags}>#누유무 #톱날교체용이</Text>
                  <View style={styles.cardBot}>
                    <Text style={styles.cardPrice}>12,300,000원</Text>
                    <Text style={styles.cardTime}>9분전</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionGap} />

          <View style={styles.pt20}>
            <SectionHeader
              title="가장 많이 비교된 상품"
              onViewAll={() => {}}
              style={styles.px20}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.px20}
            >
              {SCROLL_ITEMS.map(item => (
                <ProductCard
                  key={item}
                  width={271.25}
                  height={180}
                  liked={likedItems.has(`compare-${item}`)}
                  onLike={() => toggleLike(`compare-${item}`)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionGap} />

          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('review')}>
            <View style={styles.reviewHeader}>
              <Text style={styles.secTitleFlat}>리뷰</Text>
              <StarIcon width={26} height={26} />
              <Text style={styles.secTitleFlat}>4.2 (2)</Text>
            </View>

            <View style={styles.blueNoticeBox}>
              <Text style={styles.blueNoticeText}>
                이 판매자와 거래한 <Text style={styles.textBlue}>고객들의 후기</Text>를 확인해보세요.
              </Text>
            </View>

            <RatingBreakdown />

            {reviews.map(revId => (
              <ReviewItem key={revId} id={revId} />
            ))}
            {isLoadingMore && <Text style={styles.loadingText}>리뷰 불러오는 중...</Text>}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnLike} onPress={handleToggleBottomLike}>
          {isBottomLiked ? (
            <HeartActiveIcon width={22} height={22} />
          ) : (
            <HeartIcon width={22} height={22} color={colors.black} />
          )}
          <Text style={styles.btnLikeCount}>25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSafe} onPress={handleNavigateToOrder}>
          <Text style={styles.btnSafeText}>안전결제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnChat}>
          <Text style={styles.btnChatText}>채팅하기</Text>
        </TouchableOpacity>
      </View>

      {/* More Dropdown */}
      {menuVisible && (
        <>
          <Pressable style={moreStyles.overlay} onPress={() => setMenuVisible(false)} />
          <View style={moreStyles.dropdown}>
            <TouchableOpacity
              style={moreStyles.item}
              activeOpacity={0.6}
              onPress={() => {
                setMenuVisible(false);
              }}
            >
              <Text style={moreStyles.itemText}>공유하기</Text>
            </TouchableOpacity>
            <View style={moreStyles.divider} />
            <TouchableOpacity
              style={moreStyles.item}
              activeOpacity={0.6}
              onPress={() => {
                setMenuVisible(false);
                setReportVisible(true);
              }}
            >
              <Text style={moreStyles.itemText}>신고하기</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ReportModal
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        onSubmit={() => {
          setReportVisible(false);
          setToastMessage('신고가 접수되었습니다.');
          setToastVisible(true);
        }}
      />

      <CompareToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

const moreStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  dropdown: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 16,
    right: 20,
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
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.G200,
  },
});

const localStyles = StyleSheet.create({
  serviceToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  serviceToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
});
