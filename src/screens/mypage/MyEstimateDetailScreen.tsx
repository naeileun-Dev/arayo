import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { Button, ConfirmModal } from '../../components/common';
import { GuestAuthModal } from '../../components/common/GuestAuthModal';
import { EstimateSelectBuyerModal } from '../../components/estimate/EstimateSelectBuyerModal';

const PRODUCT_IMG = require('../../assets/images/img01.png');
export const MyEstimateDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [guestAuthVisible, setGuestAuthVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectBuyerVisible, setSelectBuyerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const images = [PRODUCT_IMG, PRODUCT_IMG, PRODUCT_IMG];


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
        <Text style={styles.headerTitle}>견적 문의 상세</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status & Date */}
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>견적 요청 중</Text>
          <Text style={styles.dateText}>25.06.15</Text>
        </View>
        <Text style={styles.titleText}>안녕하세요. CNC 선반 견적 문의 드립니다.</Text>

        <View style={styles.separator} />

        {/* 문의 내용 */}
        <Text style={styles.sectionTitle}>문의 내용</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>제품명</Text>
          <Text style={styles.infoValue}>[신품] CNC 선반</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>구매자 위치</Text>
          <Text style={styles.infoValue}>서울 강서구</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>제품 구분</Text>
          <Text style={styles.infoValue}>공작기계 CNC 선반</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>희망가격</Text>
          <View style={styles.priceRow}>
            <Text style={styles.infoValue}>4,000,000원</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>제안가능</Text>
            </View>
          </View>
        </View>

        <Text style={styles.bodyText}>
          안녕하세요 견적문의 드립니다. 확인 후 답변 부탁드립니다. ^^
        </Text>

        {/* Images - clickable to expand inline */}
        {imagesExpanded ? (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setImagesExpanded(false)}>
            <View style={styles.imageExpandedCol}>
              {images.map((img, idx) => (
                <Image key={idx} source={img} style={styles.imageExpanded} resizeMode="cover" />
              ))}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setImagesExpanded(true)}>
            <View style={styles.imageRow}>
              {images.map((img, idx) => (
                <Image key={idx} source={img} style={styles.imageThumb} />
              ))}
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        {/* 구매자 정보 (blurred for guest) */}
        <Text style={styles.sectionTitle}>구매자 정보</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.blurredText}>김샘플</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>휴대폰 번호</Text>
          <Text style={styles.blurredText}>010-1234-5678</Text>
        </View>

        {/* Guest manage button */}
        <TouchableOpacity
          style={styles.guestManageBtn}
          activeOpacity={0.7}
          onPress={() => setGuestAuthVisible(true)}
        >
          <Text style={styles.guestManageText}>비회원 문의 관리하기</Text>
        </TouchableOpacity>
        <Text style={styles.guestHint}>
          비회원으로 작성한 글이에요.{'\n'}작성할 때 입력한 비밀번호로 내용을 수정할 수 있어요.
        </Text>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="견적 요청 완료"
          onPress={() => setSelectBuyerVisible(true)}
          style={styles.mainButton}
        />
        <TouchableOpacity
          style={styles.moreButton}
          activeOpacity={0.7}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Text style={styles.moreIcon}>···</Text>
        </TouchableOpacity>
      </View>

      {/* More dropdown */}
      {menuVisible && (
        <>
          <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.6}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('ReceivedEstimate');
              }}
            >
              <Text style={styles.menuItemText}>받은 견적 확인하기</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.6}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('EstimateUpload', { mode: 'edit' });
              }}
            >
              <Text style={styles.menuItemText}>문의글 수정</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.6}
              onPress={() => {
                setMenuVisible(false);
                setDeleteVisible(true);
              }}
            >
              <Text style={styles.menuItemText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Guest Auth Modal */}
      <GuestAuthModal
        visible={guestAuthVisible}
        onClose={() => setGuestAuthVisible(false)}
        onConfirm={() => setGuestAuthVisible(false)}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        visible={deleteVisible}
        title="삭제하기"
        message="삭제하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="확인"
        onClose={() => setDeleteVisible(false)}
        onConfirm={() => {
          setDeleteVisible(false);
          navigation.goBack();
        }}
      />

      {/* Select Buyer Modal */}
      <EstimateSelectBuyerModal
        visible={selectBuyerVisible}
        onClose={() => setSelectBuyerVisible(false)}
        onSelect={() => setSelectBuyerVisible(false)}
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.system100,
  },
  dateText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G500,
  },
  titleText: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.base,
  },
  separator: {
    height: 1,
    backgroundColor: colors.G200,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    width: 90,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#B1B1B1',
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
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
  bodyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: spacing.base,
    marginBottom: spacing.base,
  },
  imageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  imageThumb: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: borderRadius.sm,
  },
  imageExpandedCol: {
    gap: spacing.sm,
  },
  imageExpanded: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadius.sm,
  },
  blurredText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  guestManageBtn: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  guestManageText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  guestHint: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#7E7E7E',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    gap: spacing.sm,
  },
  mainButton: {
    flex: 1,
  },
  moreButton: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
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
    bottom: 70,
    right: screenPadding.horizontal,
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 100,
    zIndex: 100,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
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
