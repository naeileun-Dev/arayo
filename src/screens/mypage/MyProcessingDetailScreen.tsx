import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
import ChevronRightIcon from '../../assets/icon/chevron-right.svg';
import ShareIcon from '../../assets/icon/share.svg';
import { Button, ConfirmModal } from '../../components/common';
import { GuestAuthModal } from '../../components/common/GuestAuthModal';
import { SelectBuyerModal } from '../../components/trade/SelectBuyerModal';

export const MyProcessingDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectBuyerVisible, setSelectBuyerVisible] = useState(false);
  const [guestAuthVisible, setGuestAuthVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={st.container}>
      <View style={st.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={st.headerTitle}>견적 문의 상세</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={st.scroll} contentContainerStyle={st.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={st.statusRow}>
          <Text style={st.statusText}>의뢰중</Text>
          <Text style={st.dateText}>25.06.15</Text>
        </View>
        <Text style={st.titleText}>[SW 개발 / IT 서비스] 스마트기기 부품 임가공 문의</Text>

        <View style={st.separator} />

        <Text style={st.sectionTitle}>문의 내용</Text>
        <View style={st.infoRow}>
          <Text style={st.infoLabel}>제조 서비스</Text>
          <View style={st.breadcrumbRow}>
            <Text style={st.infoValue}>제품개발/부품제조</Text>
            <ChevronRightIcon width={14} height={14} color={colors.G400} />
            <Text style={st.infoValueSub}>원스톱 제품개발</Text>
          </View>
        </View>
        <View style={st.infoRow}><Text style={st.infoLabel}>양산 계획</Text><Text style={st.infoValue}>양산 계획 있음</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>제품 용도</Text><Text style={st.infoValue}>자동차/운송</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>납기 희망일자</Text><Text style={st.infoValue}>2025.08.08</Text></View>
        <View style={st.infoRow}>
          <Text style={st.infoLabel}>추정 예산</Text>
          <View style={st.priceRow}>
            <Text style={st.infoValue}>4,000,000원</Text>
            <View style={st.tagBadge}><Text style={st.tagBadgeText}>제안가능</Text></View>
          </View>
        </View>

        <Text style={st.bodyText}>안녕하세요 스마트기기 부품 임가공 문의 드립니다.{'\n'}확인 후 답변 부탁드립니다. ^^</Text>

        <View style={st.fileItem}>
          <Text style={st.fileName}>도면.pdf</Text>
          <View style={{ transform: [{ rotate: '180deg' }] }}><ShareIcon width={20} height={20} color={colors.G500} /></View>
        </View>
        <View style={st.fileItem}>
          <Text style={st.fileName}>도면.pdf</Text>
          <View style={{ transform: [{ rotate: '180deg' }] }}><ShareIcon width={20} height={20} color={colors.G500} /></View>
        </View>

        <View style={st.separator} />

        <Text style={st.sectionTitle}>구매자 정보</Text>
        <View style={st.infoRow}><Text style={st.infoLabel}>이름</Text><Text style={st.blurredText}>김샘플</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>휴대폰 번호</Text><Text style={st.blurredText}>010-1234-5678</Text></View>

        <TouchableOpacity style={st.guestManageBtn} activeOpacity={0.7} onPress={() => setGuestAuthVisible(true)}>
          <Text style={st.guestManageText}>비회원 문의 관리하기</Text>
        </TouchableOpacity>
        <Text style={st.guestHint}>비회원으로 작성한 글이에요.{'\n'}작성할 때 입력한 비밀번호로 내용을 수정할 수 있어요.</Text>
      </ScrollView>

      <View style={st.bottomBar}>
        <Button title="의뢰 요청하기" onPress={() => setSelectBuyerVisible(true)} style={st.mainButton} />
        <TouchableOpacity style={st.moreButton} activeOpacity={0.7} onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={st.moreIcon}>···</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <>
          <Pressable style={st.menuOverlay} onPress={() => setMenuVisible(false)} />
          <View style={st.menuDropdown}>
            <TouchableOpacity style={st.menuItem} activeOpacity={0.6} onPress={() => { setMenuVisible(false); navigation.navigate('ReceivedEstimate' as any); }}>
              <Text style={st.menuItemText}>받은 견적 확인하기</Text>
            </TouchableOpacity>
            <View style={st.menuDivider} />
            <TouchableOpacity style={st.menuItem} activeOpacity={0.6} onPress={() => { setMenuVisible(false); navigation.navigate('ProcessingUpload', { mode: 'edit' }); }}>
              <Text style={st.menuItemText}>수정</Text>
            </TouchableOpacity>
            <View style={st.menuDivider} />
            <TouchableOpacity style={st.menuItem} activeOpacity={0.6} onPress={() => { setMenuVisible(false); setDeleteVisible(true); }}>
              <Text style={st.menuItemText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <SelectBuyerModal visible={selectBuyerVisible} onClose={() => setSelectBuyerVisible(false)} onSelect={() => setSelectBuyerVisible(false)} />
      <GuestAuthModal visible={guestAuthVisible} onClose={() => setGuestAuthVisible(false)} onConfirm={() => setGuestAuthVisible(false)} />
      <ConfirmModal visible={deleteVisible} title="삭제하기" message="삭제하시겠습니까?" cancelLabel="취소" confirmLabel="확인" onClose={() => setDeleteVisible(false)} onConfirm={() => { setDeleteVisible(false); navigation.goBack(); }} />
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: screenPadding.horizontal, height: 52 },
  headerTitle: { fontSize: 16, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.textPrimary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: screenPadding.horizontal, paddingBottom: 20 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.base, marginBottom: spacing.sm },
  statusText: { fontSize: 14, fontFamily: fontFamily.bold, fontWeight: '700', color: colors.primary },
  dateText: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G500 },
  titleText: { fontSize: 15, fontFamily: fontFamily.medium, fontWeight: '500', color: colors.textPrimary, lineHeight: 22, marginBottom: spacing.base },
  separator: { height: 1, backgroundColor: colors.G200, marginVertical: spacing.lg },
  sectionTitle: { fontSize: 16, fontFamily: fontFamily.bold, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.base },
  infoRow: { flexDirection: 'row', marginBottom: spacing.sm },
  infoLabel: { width: 90, fontSize: 14, fontFamily: fontFamily.medium, fontWeight: '500', color: '#B1B1B1' },
  infoValue: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary },
  infoValueSub: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G500 },
  breadcrumbRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  priceRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  tagBadge: { backgroundColor: 'rgba(219, 0, 37, 0.08)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  tagBadgeText: { fontSize: 11, fontFamily: fontFamily.medium, fontWeight: '500', color: colors.primary },
  bodyText: { fontSize: 14, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary, lineHeight: 22, marginTop: spacing.base, marginBottom: spacing.base },
  fileItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.base, paddingVertical: 14, borderWidth: 1, borderColor: colors.G200, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  fileName: { fontSize: 14, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary },
  blurredText: { flex: 1, fontSize: 14, fontFamily: fontFamily.medium, fontWeight: '500' as const, color: 'transparent', textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
  guestManageBtn: { borderWidth: 1, borderColor: colors.G300, borderRadius: borderRadius.md, height: 48, alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg, marginBottom: spacing.md },
  guestManageText: { fontSize: 14, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.textPrimary },
  guestHint: { fontSize: 14, fontFamily: fontFamily.regular, fontWeight: '400', color: '#7E7E7E', textAlign: 'center', lineHeight: 20 },
  bottomBar: { flexDirection: 'row', paddingHorizontal: screenPadding.horizontal, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.G200, gap: spacing.sm },
  mainButton: { flex: 1 },
  moreButton: { width: 52, height: 52, borderWidth: 1, borderColor: colors.G300, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
  moreIcon: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  menuOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 },
  menuDropdown: { position: 'absolute', bottom: 70, right: screenPadding.horizontal, backgroundColor: colors.white, borderRadius: 8, minWidth: 100, zIndex: 100, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.15, shadowRadius: 8 }, android: { elevation: 8 } }) },
  menuItem: { paddingHorizontal: spacing.lg, paddingVertical: 14 },
  menuItemText: { fontSize: 15, fontFamily: fontFamily.medium, fontWeight: '500', color: colors.textPrimary },
  menuDivider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.G200 },
});
