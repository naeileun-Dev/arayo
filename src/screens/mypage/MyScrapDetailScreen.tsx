import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { Button, ConfirmModal } from '../../components/common';
import { GuestAuthModal } from '../../components/common/GuestAuthModal';
import { SelectBuyerModal } from '../../components/trade/SelectBuyerModal';

const PRODUCT_IMG = require('../../assets/images/img01.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMG_GAP = 8;
const THUMB_SIZE = (SCREEN_WIDTH - screenPadding.horizontal * 2 - IMG_GAP * 2) / 3;

export const MyScrapDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectBuyerVisible, setSelectBuyerVisible] = useState(false);
  const [guestAuthVisible, setGuestAuthVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [imagesExpanded, setImagesExpanded] = useState(false);

  const images = [PRODUCT_IMG, PRODUCT_IMG, PRODUCT_IMG];

  return (
    <SafeAreaView style={st.container}>
      <View style={st.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={st.headerTitle}>고철 처리 상세</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={st.scroll} contentContainerStyle={st.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={st.statusRow}>
          <Text style={st.statusText}>의뢰중</Text>
          <Text style={st.dateText}>25.06.15</Text>
        </View>
        <Text style={st.titleText}>안녕하세요, 고철 처리 의뢰합니다.</Text>

        <View style={st.separator} />

        <Text style={st.sectionTitle}>문의 내용</Text>
        <View style={st.infoRow}><Text style={st.infoLabel}>처리 종류</Text><Text style={st.infoValue}>고철(생철,중량)</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>차량 진입</Text><Text style={st.infoValue}>1톤 트럭 가능</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>작업 공간</Text><Text style={st.infoValue}>실내</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>고철 위치</Text><Text style={st.infoValue}>12345 서울 특별시 강서구 양천로 532, 302호</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>고철 양</Text><Text style={st.infoValue}>0.5톤</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>엘리베이터</Text><Text style={st.infoValue}>있음</Text></View>
        <View style={st.infoRow}><Text style={st.infoLabel}>희망 처리일</Text><Text style={st.infoValue}>2025.08.08</Text></View>

        <Text style={st.bodyText}>안녕하세요 고철 처리 문의 드립니다. 확인 후 답변 부탁드립니다. ^^</Text>

        {/* Images - clickable to expand inline */}
        {imagesExpanded ? (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setImagesExpanded(false)}>
            <View style={st.imageExpandedCol}>
              {images.map((img, idx) => (
                <Image key={idx} source={img} style={st.imageExpanded} resizeMode="cover" />
              ))}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setImagesExpanded(true)}>
            <View style={st.imageRow}>
              {images.map((img, idx) => (
                <Image key={idx} source={img} style={st.imageThumb} />
              ))}
            </View>
          </TouchableOpacity>
        )}

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
        <Button title="의뢰 요청 완료" onPress={() => setSelectBuyerVisible(true)} style={st.mainButton} />
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
            <TouchableOpacity style={st.menuItem} activeOpacity={0.6} onPress={() => { setMenuVisible(false); navigation.navigate('ScrapUpload', { mode: 'edit' }); }}>
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
  infoValue: { flex: 1, fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary },
  bodyText: { fontSize: 14, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary, lineHeight: 22, marginTop: spacing.base, marginBottom: spacing.base },
  imageRow: { flexDirection: 'row', gap: IMG_GAP },
  imageThumb: { width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: borderRadius.sm },
  imageExpandedCol: { gap: spacing.sm },
  imageExpanded: { width: '100%', aspectRatio: 1, borderRadius: borderRadius.sm },
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
