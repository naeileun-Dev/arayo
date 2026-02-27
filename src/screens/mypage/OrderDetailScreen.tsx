import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { colors as COLORS } from '../../styles/colors';
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeftIcon width={24} height={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>주문 상세</Text>
        <View style={styles.headerRight} />
      </View>

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

        {/* ── 입금 계좌 정보 ── */}
        <View style={styles.section}>
          <SectionTitle title="입금 계좌 정보" />
          <View style={styles.bbox}>
            <View style={styles.bboxRow}>
              <Text style={styles.bboxDt}>입금계좌</Text>
              <Text style={styles.bboxDd}>주식회사 수성코리아</Text>
            </View>
            <View style={styles.bboxRow}>
              <Text style={styles.bboxDt}>은행명</Text>
              <Text style={styles.bboxDd}>국민은행</Text>
            </View>
            <View style={styles.bboxRow}>
              <Text style={styles.bboxDt}>계좌번호</Text>
              <Text style={styles.bboxDd}>110-123-456789</Text>
            </View>
          </View>
        </View>

        {/* ── 가격 ── */}
        <View style={styles.section}>
          <SectionTitle title="가격" />
          <View style={styles.priceWrap}>
            {/* 총 결제금액 (파란 배경) */}
            <View style={styles.priceTotalRow}>
              <Text style={styles.priceTotalLabel}>총 결제금액</Text>
              <Text style={styles.priceTotalValue}>2,400,000 원</Text>
            </View>
            {/* 상세 내역 */}
            <View style={styles.priceDetailWrap}>
              <View style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>상품금액</Text>
                <Text style={styles.priceDetailValue}>0 원</Text>
              </View>
              <View style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>
                  서비스 수수료{' '}
                  <Text style={styles.lineThrough}>(3.5%)</Text>
                  {' '}무료(오픈 이벤트)
                </Text>
                <Text style={styles.priceDetailValue}>-0 원</Text>
              </View>
              <View style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>부가가치세 (10%)</Text>
                <Text style={styles.priceDetailValue}>-0 원</Text>
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

  // ── 헤더 ──
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  headerRight: {
    width: 36,
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

  // ── bbox (입금계좌) ──
  bbox: {
    marginHorizontal: 15,
    marginTop: 12,
    padding: 16,
    borderRadius: 4,
    backgroundColor: COLORS.black,
  },
  bboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  bboxDt: {
    fontSize: 13,
    color: COLORS.G300,
    letterSpacing: -0.2,
  },
  bboxDd: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  // ── 가격 섹션 ──
  priceWrap: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.G200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  priceTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.G100,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  priceTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  priceTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  priceDetailWrap: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
  },
  priceDetailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  priceDetailLabel: {
    flex: 1,
    fontSize: 13,
    color: COLORS.G600,
    letterSpacing: -0.2,
    lineHeight: 18,
    paddingRight: 8,
  },
  priceDetailValue: {
    fontSize: 13,
    color: COLORS.G600,
    letterSpacing: -0.2,
    fontWeight: '500',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: COLORS.G400,
  },

  bottomPad: {
    height: 40,
  },
});