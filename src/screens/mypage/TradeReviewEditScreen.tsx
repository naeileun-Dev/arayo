import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import TrashIcon from '../../assets/icon/trash.svg';
import StarIcon from '../../assets/icon/star.svg';
import EmptyStarIcon from '../../assets/icon/empty_star.svg';
import { ConfirmModal } from '../../components/common';
import { CompareToast } from '../../components/common';

const PRODUCT_IMG = require('../../assets/images/img01.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_GAP = 8;
const IMAGE_SIZE = (SCREEN_WIDTH - 40 - IMAGE_GAP * 2) / 3;

const RATINGS = [
  { label: '별로에요', score: 1 },
  { label: '그저그래요', score: 2 },
  { label: '괜찮아요', score: 3 },
  { label: '좋아요', score: 4 },
  { label: '최고에요', score: 5 },
];

const renderStars = (count: number) =>
  Array.from({ length: 5 }, (_, i) =>
    i < count
      ? <StarIcon key={i} width={18} height={18} color="#FBBF24" />
      : <EmptyStarIcon key={i} width={18} height={18} color={colors.G300} />,
  );

export const TradeReviewEditScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedRating, setSelectedRating] = useState(4);
  const [reviewText, setReviewText] = useState(
    '문의 단계부터 응대가 빠르고, 제품 상태와 사양에 대해 상세하게 설명해 주셔서 신뢰가 갔습니다. 중고 장비 특성상 궁금한 점이 많았는데, 추가 요청 자료나 사진도 바로 공유해 주셔서 검토에 도움이 됐습니다.\n\n설치 가능 일정과 인수 절차에 대해서도 미리 안내해 주었고, 실제 인수 과정에서도 약속된 내용대로 진행되었습니다. 전반적으로 커뮤니케이션이 원활해 거래 과정에서 불필요한 스트레스가 없었습니다.',
  );
  const [images] = useState([1, 2, 3, 4, 5]);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
        <Text style={styles.headerTitle}>거래후기 수정</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 상품 정보 */}
        <Text style={styles.sectionTitle}>상품 정보</Text>
        <Image source={PRODUCT_IMG} style={styles.productThumb} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>상품명</Text>
          <Text style={styles.infoValue}>접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>상품금액</Text>
          <View style={styles.priceRow}>
            <Text style={styles.infoValue}>4,000,000원</Text>
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
        <Text style={styles.subTitle}>평점</Text>

        {RATINGS.map((rating) => (
          <TouchableOpacity
            key={rating.score}
            style={[
              styles.ratingOption,
              selectedRating === rating.score && styles.ratingOptionSelected,
            ]}
            activeOpacity={0.7}
            onPress={() => setSelectedRating(rating.score)}
          >
            <Text style={styles.ratingLabel}>{rating.label}</Text>
            <View style={styles.starsRow}>{renderStars(rating.score)}</View>
          </TouchableOpacity>
        ))}

        {/* 경험 입력 */}
        <View style={styles.textAreaHeader}>
          <Text style={styles.subTitle}>따뜻한 거래 경험을 알려주세요!</Text>
          <Text style={styles.charCount}>(0/2,000자)</Text>
        </View>
        <View style={styles.textAreaBox}>
          <TextInput
            style={styles.textArea}
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            textAlignVertical="top"
            maxLength={2000}
          />
        </View>

        {/* 이미지 */}
        <View style={styles.imageHeader}>
          <Text style={styles.imageTitle}>이미지</Text>
          <Text style={styles.imageCount}>({images.length}/5)</Text>
        </View>
        <View style={styles.formatBadge}>
          <Text style={styles.formatBadgeText}>•  최대 100MB까지 업로드 가능해요.</Text>
          <Text style={styles.formatBadgeText}>•  지원 형식 : PNG, JPG</Text>
        </View>
        <View style={styles.imageGrid}>
          {images.map((_, idx) => (
            <View key={idx} style={styles.imageItem}>
              <Image source={PRODUCT_IMG} style={styles.imageThumb} />
              <TouchableOpacity style={styles.deleteBtn}>
                <TrashIcon width={16} height={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.7}
          onPress={() => setCancelVisible(true)}
        >
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.7}
          onPress={() => {
            setToastMessage('거래후기가 수정되었습니다.');
            setToastVisible(true);
          }}
        >
          <Text style={styles.submitText}>수정</Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={cancelVisible}
        title="취소하기"
        message="취소하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="확인"
        onClose={() => setCancelVisible(false)}
        onConfirm={() => {
          setCancelVisible(false);
          navigation.goBack();
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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.base,
  },
  productThumb: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
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
    marginVertical: spacing.lg,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  ratingOption: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  ratingOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(219, 0, 37, 0.03)',
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
  },
  textAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  charCount: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G400,
  },
  textAreaBox: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    minHeight: 160,
    marginTop: spacing.sm,
  },
  textArea: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 20,
    padding: 0,
    minHeight: 140,
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  imageTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  imageCount: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#B1B1B1',
  },
  formatBadge: {
    backgroundColor: '#F3F6FF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    gap: 4,
  },
  formatBadgeText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
    color: '#626262',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: IMAGE_GAP,
  },
  imageItem: {
    position: 'relative',
  },
  imageThumb: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: borderRadius.sm,
  },
  deleteBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  submitButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
});
