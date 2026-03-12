import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CheckIcon from '../../assets/icon/check.svg';
import { colors as COLORS } from '../../styles/colors';
import Header from '../../components/common/Header';
import ReviewModal, { ReviewModalType } from '../../components/common/ReviewModal';
import SectionTitle from './components/SectionTitle';
import TableRow from './components/TableRow';

const PRODUCT_IMG = require('../../assets/images/img03.png');
export default function OrderDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [reviewModal, setReviewModal] = useState<{ visible: boolean; type: ReviewModalType }>({
    visible: true,
    type: 'intro',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="주문 상세" onBack={() => navigation.goBack()} />

      {/* ── 본문 ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── 주문자 정보 ── */}
        <View style={[styles.section, { marginTop: 0 }]}>
          <SectionTitle title="주문자 정보" />
          <View style={styles.tableWrap}>
            <TableRow label="주문 상태" value="입금대기" bold />
            <TableRow label="주문 날짜" value="2025.04.21" />
            <TableRow label="이름" value="김샘플" />
            <TableRow label="휴대폰 번호" value="010-1234-5678" />
            <TableRow label="사업장 주소지" value="(12345) 서울특별시 강서구 양천로 532 3층" />
            <TableRow label="요청사항" value="미리 연락 부탁드립니다." />
          </View>
        </View>

        {/* ── 주문상품 정보 ── */}
        <View style={styles.section}>
          <SectionTitle title="주문상품 정보" />
          <View style={styles.productInfoWrap}>
            <View style={styles.productLabel}>
              <Text style={styles.productLabelText}>상품명</Text>
            </View>
            <View style={styles.productContent}>
              <View style={styles.buyItem}>
                <View style={styles.buyItemImgWrap}>
                  <Image source={PRODUCT_IMG} style={styles.buyItemImg} />
                </View>
                <View style={styles.buyItemCon}>
                  <Text style={styles.buyItemSubject} numberOfLines={2}>
                    접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.productLabel}>
              <Text style={styles.productLabelText}>상품가격</Text>
            </View>
            <View style={styles.productContent}>
              <Text style={styles.productPrice}>2,400,000원</Text>
            </View>
          </View>
          {/* 후기 버튼 */}
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => setReviewModal({ visible: true, type: 'intro' })}
            activeOpacity={0.8}
          >
            <Text style={styles.btnOutlineText}>후기 보내기/받은 후기 보기/보낸 후기 보기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 안전결제 입금 안내 ── */}
        <View style={styles.section}>
          <SectionTitle title="안전결제 입금 안내" />
          <View style={styles.depositTable}>
            <View style={styles.depositRow}>
              <View style={styles.depositLabelWrap}>
                <CheckIcon width={16} height={16} color={COLORS.green} />
                <Text style={styles.depositLabel}>은행명</Text>
              </View>
              <Text style={styles.depositValue}>국민은행</Text>
            </View>
            <View style={styles.depositRow}>
              <View style={styles.depositLabelWrap}>
                <CheckIcon width={16} height={16} color={COLORS.green} />
                <Text style={styles.depositLabel}>예금주</Text>
              </View>
              <Text style={styles.depositValue}>주식회사 수성코리아</Text>
            </View>
            <View style={styles.depositRow}>
              <View style={styles.depositLabelWrap}>
                <CheckIcon width={16} height={16} color={COLORS.green} />
                <Text style={styles.depositLabel}>계좌번호</Text>
              </View>
              <Text style={styles.depositValue}>110-123-456789</Text>
            </View>
            <View style={styles.depositRow}>
              <View style={styles.depositLabelWrap}>
                <CheckIcon width={16} height={16} color={COLORS.green} />
                <Text style={styles.depositLabel}>결제금액</Text>
              </View>
              <Text style={styles.depositValue}>2,640,000</Text>
            </View>
            <View style={styles.depositFeeWrap}>
              <View style={styles.depositFeeRow}>
                <Text style={styles.depositFeeLabel}>안전결제 수수료 (3.5%) → 무료</Text>
                <Text style={styles.depositFeeValue}>72,000 원</Text>
              </View>
              <View style={styles.depositFeeRow}>
                <Text style={styles.depositFeeLabel}>부가가치세(10%)</Text>
                <Text style={styles.depositFeeValue}>2,400,000 원</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* ── 후기 모달 ── */}
      <ReviewModal
        visible={reviewModal.visible}
        type={reviewModal.type}
        onClose={() => setReviewModal({ visible: false, type: null })}
        onChangeType={(type) => setReviewModal({ visible: true, type })}
      />
    </SafeAreaView>
  );
}

// ─── 스타일 ──────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ── 스크롤 ──
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingTop: 15,
    paddingBottom: 20,
  },

  // ── 섹션 ──
  section: {
    paddingBottom: 0,
    marginTop: 20,
  },
  // ── 테이블 (주문자 정보) ──
  tableWrap: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.G200,
  },
  // ── 주문상품 정보 ──
  productInfoWrap: {
    marginHorizontal: 15,
  },
  productLabel: {
    backgroundColor: COLORS.G100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  productLabelText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.G600,
    letterSpacing: -0.2,
  },
  productContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    letterSpacing: -0.2,
  },

  // ── buyItem ──
  buyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buyItemImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.G200,
  },
  buyItemImg: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  buyItemCon: {
    flex: 1,
  },
  buyItemSubject: {
    fontSize: 13,
    color: COLORS.black,
    lineHeight: 18,
    letterSpacing: -0.2,
  },

  // ── 버튼 ──
  btnOutline: {
    marginHorizontal: 15,
    marginTop: 10,
    height: 46,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  btnOutlineText: {
    fontSize: 13,
    color: COLORS.white,
    letterSpacing: -0.3,
    fontWeight: '600',
  },

  // ── 안전결제 입금 안내 (테이블) ──
  depositTable: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.G200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  depositRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  depositLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    gap: 6,
  },
  depositLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.G600,
    letterSpacing: -0.2,
  },
  depositValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
    letterSpacing: -0.2,
  },
  // ── 수수료 영역 ──
  depositFeeWrap: {
    backgroundColor: COLORS.G100,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  depositFeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositFeeLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.G600,
    letterSpacing: -0.2,
  },
  depositFeeValue: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.G600,
    letterSpacing: -0.2,
  },

  bottomPad: {
    height: 40,
  },
});