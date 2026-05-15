import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image, 
  Modal,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { ConfirmModal } from '../../components/common';
import StarIcon from '../../assets/icon/star.svg';

const PRODUCT_IMG = require('../../assets/images/img01.png');
const PROFILE_IMG = require('../../assets/images/user01.png');

const REVIEW_POINTS = [
  '시간 약속을 잘 지켜요.',
  '설비 상태가 설명한 것과 같아요.',
  '친절하고 매너가 좋아요.',
  '좋은 설비를 저렴하게 판매해요.',
];

const REVIEW_TEXT =
  '문의 단계부터 응대가 빠르고, 제품 상태와 사양에 대해 상세하게 설명해 주셔서 신뢰가 갔습니다. 중고 장비 특성상 궁금한 점이 많았는데, 추가 요청 자료나 사진도 바로 공유해 주셔서 검토에 도움이 됐습니다.\n\n설치 가능 일정과 인수 절차에 대해서도 미리 안내해 주었고, 실제 인수 과정에서도 약속된 내용대로 진행되었습니다. 전반적으로 커뮤니케이션이 원활해 거래 과정에서 불필요한 스트레스가 없었습니다.';

export const TradeReviewDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);

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
        <Text style={styles.headerTitle}>거래후기 상세</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      {menuVisible && (
        <>
          <Modal visible={menuVisible} transparent animationType="slide" onRequestClose={() => setMenuVisible(false)}>
            <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
              <View style={styles.menuContainer}>
                <View style={styles.moreSheetHandle} />
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('TradeReviewEdit' as any);
                  }}
                >
                  <Text style={styles.menuItemText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => {
                    setMenuVisible(false);
                    setCancelVisible(true);
                  }}
                >
                  <Text style={styles.menuItemText}>보낸 거래후기 취소하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreSheetCancel}
                  onPress={() => setMenuVisible(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moreSheetCancelText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 상품 정보 */}
        <Text style={styles.sectionTitle}>상품 정보</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>상품명</Text>
          <Text style={styles.infoValue}>접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>상품금액</Text>
          <View style={styles.priceRow}>
            <Text style={[styles.infoValue, { flex: 0 }]}>4,000,000원</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>제안가능</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주문일자</Text>
          <Text style={styles.infoValue}>2025.07.21</Text>
        </View>

        <View style={styles.separator} />

        {/* 리뷰 내용 */}
        <Text style={styles.sectionTitle}>리뷰 내용</Text>

        <View style={styles.reviewerRow}>
          <Image source={PROFILE_IMG} style={styles.reviewerImg} />
          <Text style={styles.reviewerName}>김샘플</Text>
        </View>

        <View style={styles.reviewCard}>
          <View style={styles.scoreRow}>
            <StarIcon width={18} height={18} color="#FBBF24" style={{ marginRight: 4 }} />
            <Text style={styles.scoreText}>4</Text>
          </View>

          {REVIEW_POINTS.map((point, idx) => (
            <View key={idx} style={styles.pointRow}>
              <Text style={styles.pointDot}>•</Text>
              <Text style={styles.pointText}>{point}</Text>
            </View>
          ))}

          <View style={styles.reviewImages}>
            {[1, 2, 3].map((_, idx) => (
              <Image key={idx} source={PRODUCT_IMG} style={styles.reviewImg} />
            ))}
          </View>

          <Text style={styles.reviewText}>{REVIEW_TEXT}</Text>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={cancelVisible}
        title="취소"
        message="취소하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="확인"
        onClose={() => setCancelVisible(false)}
        onConfirm={() => {
          setCancelVisible(false);
          navigation.goBack();
        }}
      />
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
  menuDropdown: {
    position: 'absolute',
    top: 52,
    right: screenPadding.horizontal,
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 100,
    zIndex: 100,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.G200,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    width: 70,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#B1B1B1',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#7E7E7E',
  },
  priceRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: 'rgba(219, 0, 37, 0.08)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.G200,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },
  reviewerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  reviewerImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  reviewerName: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    padding: spacing.base,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  starIcon: {
    fontSize: 18,
    color: '#FBBF24',
    marginRight: 4,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  pointDot: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 6,
  },
  pointText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#7E7E7E',
    flex: 1,
  },
  reviewImages: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.base,
    marginBottom: spacing.base,
  },
  reviewImg: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: borderRadius.sm,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 22,
  },
   // Menu Modal
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom:30,
  },
  moreSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.G300,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  moreSheetCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  moreSheetCancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G500,
  },
});
