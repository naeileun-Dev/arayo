import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MapPinIcon from '../../assets/icon/map-pin.svg';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
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
  RATING_BARS,
  SectionKey,
} from './constants';
import { styles } from './ProductViewScreen.styles';
import ReviewItem from './components/ReviewItem';
import ProductCard from './components/ProductCard';

/** 서비스 제공 항목 태그 */
const ServiceTag = ({ name, on, Icon }: { name: string; on: boolean; Icon: React.FC<any> }) => (
  <View style={styles.serviceItem}>
    <View style={[styles.serviceIconWrap, on && styles.serviceIconWrapOn]}>
      <Icon width={16} height={16} color={on ? colors.white : colors.G500} />
    </View>
    <Text style={[styles.serviceText, on && styles.serviceTextOn]}>{name}</Text>
  </View>
);

/** 섹션 헤더 (제목 + 전체보기) */
const SectionHeader = ({ title, onViewAll }: { title: string; onViewAll?: () => void }) => (
  <View style={styles.secHead}>
    <Text style={styles.secTitleFlat}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>전체보기</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function ProductViewScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isBottomLiked, setIsBottomLiked] = useState(false);
  const [reviews, setReviews] = useState([1, 2]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 각 섹션의 Y 좌표 (탭-스크롤 동기화)
  const sectionRefs = useRef<Record<SectionKey, number>>({ intro: 0, seller: 0, recommend: 0, review: 0 });
  const wrapperYRef = useRef(0);
  const isTabPressScrolling = useRef(false);

  // 탭 클릭 → 해당 섹션으로 스크롤
  const handleTabPress = (idx: number) => {
    setActiveTab(idx);
    isTabPressScrolling.current = true;
    const sectionY = sectionRefs.current[SECTION_KEYS[idx]] ?? 0;
    scrollViewRef.current?.scrollTo({ y: wrapperYRef.current + sectionY - STICKY_HEADER_HEIGHT, animated: true });
    setTimeout(() => { isTabPressScrolling.current = false; }, 500);
  };

  // 스크롤 위치에 따라 활성 탭 변경 + 무한 스크롤
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;

    if (!isTabPressScrolling.current) {
      const offset = STICKY_HEADER_HEIGHT + 20;
      let currentIdx = 0;
      for (let i = SECTION_KEYS.length - 1; i >= 0; i--) {
        if (scrollY >= wrapperYRef.current + sectionRefs.current[SECTION_KEYS[i]] - offset) {
          currentIdx = i;
          break;
        }
      }
      if (currentIdx !== activeTab) setActiveTab(currentIdx);
    }

    // 리뷰 무한 스크롤
    if (layoutMeasurement.height + scrollY >= contentSize.height - 150 && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setReviews(prev => [...prev, prev.length + 1, prev.length + 2]);
        setIsLoadingMore(false);
      }, 800);
    }
  };

  const captureLayout = useCallback(
    (key: SectionKey) => (e: any) => { sectionRefs.current[key] = e.nativeEvent.layout.y; },
    [],
  );

  const toggleLike = useCallback((key: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.flex1}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[3]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 이미지 슬라이더 */}
        <View style={styles.slideSection}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.overlayBtn}>
              <ChevronLeftIcon width={30} height={30} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlayBtn}>
              <Text style={styles.moreIcon}>⋮</Text>
            </TouchableOpacity>
          </View>

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

        {/* 상품 정보 */}
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

          {/* 판매자 프로필 */}
          <View style={styles.profileRow}>
            <Image source={PROFILE_IMG} style={styles.profileImg} resizeMode="cover" />
            <View style={styles.flex1}>
              <Text style={styles.profileName}>주식회사 아라요 기계장터 (대표)</Text>
              <Text style={styles.profileTel}>0501-2345-6789</Text>
            </View>
          </View>

          {/* 스펙 테이블 */}
          <View style={styles.specBox}>
            {SPEC_ROWS.map((spec) => (
              <View key={spec.label} style={styles.specRow}>
                <Text style={styles.specDt}>{spec.label}</Text>
                <Text style={styles.specDd}>{spec.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.thinDivider} />

          {/* 서비스 제공 항목 */}
          <View style={styles.serviceGrid}>
            {SERVICE_ITEMS.map((col, colIdx) => (
              <View key={colIdx} style={styles.serviceCol}>
                {col.map((srv, idx) => (
                  <ServiceTag key={idx} {...srv} />
                ))}
              </View>
            ))}
          </View>

          {/* 별점 / 지역 */}
          <View style={styles.infoBoxRow}>
            <View style={styles.infoBoxItem}>
              <View style={styles.rowCenterGap4}>
                <StarIcon width={16} height={16} />
                <Text style={styles.infoBoxText}>4.2 <Text style={styles.textG600}>(리뷰 2건)</Text></Text>
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

        {/* 배너 */}
        <View style={styles.px20}>
          <Image source={BANNER_IMG} style={styles.bannerImg} resizeMode="cover" />
        </View>

        {/* 탭 (Sticky) */}
        <View style={styles.tabWrap}>
          <View style={styles.tabRow}>
            {TABS.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.tabBtn, activeTab === idx && styles.tabBtnActive]}
                onPress={() => handleTabPress(idx)}
              >
                <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 섹션 컨텐츠 */}
        <View onLayout={(e) => { wrapperYRef.current = e.nativeEvent.layout.y; }}>

          {/* 상품소개 */}
          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('intro')}>
            <Text style={styles.secTitle}>상품소개</Text>
            <View style={styles.hashTagRow}>
              {['#신품급', '#즉시설치', '#빠른대응'].map((tag) => (
                <Text key={tag} style={styles.hashTag}>{tag}</Text>
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

          {/* 판매자 정보 */}
          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('seller')}>
            <Text style={styles.secTitle}>판매자 정보</Text>
            <View style={styles.table}>
              {SELLER_INFO.map((row, idx) => (
                <View key={row.label} style={[styles.tr, idx === SELLER_INFO.length - 1 && styles.trLast]}>
                  <Text style={styles.th}>{row.label}</Text>
                  <Text style={[styles.td, row.isLink && styles.textLink]}>{row.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionGap} />

          {/* 판매자 다른 상품 */}
          <View style={styles.pt20}>
            <View style={[styles.secHead, styles.px20]}>
              <Text style={styles.secTitleFlat}>이 판매자의 다른 상품</Text>
              <TouchableOpacity><Text style={styles.viewAll}>전체보기</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.px20}>
              {[1, 2, 3, 4, 5].map((item) => (
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

          {/* 추천 상품 (2열 그리드) */}
          <View style={[styles.px20, styles.pt20]} onLayout={captureLayout('recommend')}>
            <SectionHeader title="추천 상품" onViewAll={() => {}} />
            <View style={styles.recommendGrid}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.recommendCard}>
                  <View style={styles.recommendImg}>
                    <Image source={PRODUCT_IMGS[item % 3]} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    <TouchableOpacity style={styles.heartBtn} onPress={() => toggleLike(`recommend-${item}`)}>
                      {likedItems.has(`recommend-${item}`)
                        ? <HeartActiveIcon width={20} height={20} />
                        : <HeartIcon width={20} height={20} color={colors.black} />
                      }
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.bestTag}>BEST</Text>
                  <Text style={styles.cardTitle} numberOfLines={1}>온도조절 안정적 · 장시간 운전</Text>
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

          {/* 비교 상품 */}
          <View style={styles.pt20}>
            <View style={[styles.secHead, styles.px20]}>
              <Text style={styles.secTitleFlat}>가장 많이 비교된 상품</Text>
              <TouchableOpacity><Text style={styles.viewAll}>전체보기</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.px20}>
              {[1, 2, 3, 4, 5].map((item) => (
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

          {/* 리뷰 */}
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

            {/* 평점 통계 */}
            <View style={styles.ratingBox}>
              <View style={styles.ratingLeft}>
                <Text style={styles.ratingLabel}>사용자 총 평점</Text>
                <StarIcon width={40} height={40} style={styles.ratingStarBig} />
                <Text style={styles.ratingScore}>4.5<Text style={styles.ratingScoreSub}>/5</Text></Text>
              </View>
              <View style={styles.ratingRight}>
                <Text style={[styles.ratingLabel, { marginBottom: 10 }]}>평점 비율</Text>
                <View style={styles.chartWrap}>
                  {RATING_BARS.map((col, idx) => (
                    <View key={idx} style={styles.chartCol}>
                      <View style={styles.chartTrack}>
                        <View style={[styles.chartFill, { height: col.pct as any, backgroundColor: col.active ? colors.primary : colors.G300 }]} />
                      </View>
                      <Text style={styles.chartLabel}>{col.score}점</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* 리뷰 목록 */}
            {reviews.map((revId) => (
              <ReviewItem key={revId} id={revId} />
            ))}
            {isLoadingMore && (
              <Text style={styles.loadingText}>리뷰 불러오는 중...</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* 하단 고정 바 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnLike} onPress={() => setIsBottomLiked(!isBottomLiked)}>
          {isBottomLiked
            ? <HeartActiveIcon width={22} height={22} />
            : <HeartIcon width={22} height={22} color={colors.black} />
          }
          <Text style={styles.btnLikeCount}>25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSafe}>
          <Text style={styles.btnSafeText}>안전결제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnChat}>
          <Text style={styles.btnChatText}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
