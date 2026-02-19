/**
 * 배너 캐러셀 컴포넌트
 * 홈 화면 상단 프로모션 배너 슬라이더
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import SaveIcon from '../../assets/icon/Save.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import type { BannerCarouselProps, Banner } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 180;
const BANNER_PADDING = spacing.lg;
const BANNER_WIDTH = SCREEN_WIDTH - BANNER_PADDING * 2;

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  autoPlay = true,
  interval = 4000,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      scrollViewRef.current?.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    },
    []
  );

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % banners.length;
        scrollToIndex(next);
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, banners.length, interval, scrollToIndex]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < banners.length) {
      setActiveIndex(index);
    }
  };

  const handleScrollBegin = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleScrollEnd = () => {
    if (!autoPlay || banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % banners.length;
        scrollToIndex(next);
        return next;
      });
    }, interval);
  };

  const renderBanner = (banner: Banner, index: number) => {
    const bgColor = banner.backgroundColor || colors.primary;

    return (
      <TouchableOpacity
        key={banner.id}
        activeOpacity={0.9}
        style={[styles.bannerItem, { width: SCREEN_WIDTH }]}
      >
        <View
          style={[
            styles.bannerContent,
            { backgroundColor: bgColor },
          ]}
        >
          <View style={styles.bannerTextArea}>
            <Text style={styles.bannerTitle}>{banner.title}</Text>
            {banner.subtitle && (
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            )}
          </View>
          {/* 배너 이미지 플레이스홀더 */}
          <View style={styles.bannerImagePlaceholder}>
            <SaveIcon width={48} height={48} color="rgba(255,255,255,0.6)" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {banners.map(renderBanner)}
      </ScrollView>

      {/* 페이지 인디케이터 */}
      {banners.length > 1 && (
        <View style={styles.indicatorContainer}>
          <View style={styles.indicatorBadge}>
            <Text style={styles.indicatorText}>
              {activeIndex + 1} / {banners.length}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT + spacing.base,
  },
  bannerItem: {
    paddingHorizontal: BANNER_PADDING,
    justifyContent: 'center',
  },
  bannerContent: {
    height: BANNER_HEIGHT,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  bannerTextArea: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
  },
  bannerImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: spacing.base + spacing.sm,
    right: BANNER_PADDING + spacing.md,
  },
  indicatorBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  indicatorText: {
    ...typography.caption,
    color: colors.white,
  },
});

export default BannerCarousel;
