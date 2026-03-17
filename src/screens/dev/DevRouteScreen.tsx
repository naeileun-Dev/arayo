import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';

interface RouteGroup {
  title: string;
  routes: { name: string; label: string; params?: any }[];
}

const ROUTE_GROUPS: RouteGroup[] = [
  {
    title: '메인',
    routes: [
      { name: 'Main', label: '메인 탭 (홈/카테고리/메뉴/채팅/마이페이지)' },
      { name: 'Search', label: '검색' },
      { name: 'Notification', label: '알림' },
      { name: 'ServiceIntroduce', label: '서비스 소개' },
    ],
  },
  {
    title: '인증',
    routes: [
      { name: 'Auth', label: '로그인 / 회원가입' },
    ],
  },
  {
    title: '상품',
    routes: [
      { name: 'ProductView', label: '상품 상세', params: { productId: '1' } },
      { name: 'ProductUpload', label: '상품 등록' },
      { name: 'CategoryList', label: '카테고리 목록', params: { category: '공작기계', subCategory: 'CNC 선반' } },
      { name: 'CompareProducts', label: '상품 비교하기' },
    ],
  },
  {
    title: '견적 문의',
    routes: [
      { name: 'EstimateList', label: '견적 문의 목록' },
      { name: 'EstimateUpload', label: '견적 문의 등록' },
      { name: 'EstimateUpload', label: '견적 문의 수정 (edit)', params: { mode: 'edit' } },
      { name: 'EstimateDetail', label: '견적 답변 상세 (요청중)', params: { id: '1', status: 'ing' } },
      { name: 'EstimateDetail', label: '견적 답변 상세 (요청완료)', params: { id: '2', status: 'complete' } },
      { name: 'EstimateDetail', label: '견적 답변 상세 (만료)', params: { id: '3', status: 'exp' } },
      { name: 'EstimateReplyList', label: '견적 답변 내역' },
      { name: 'EstimateReplyWrite', label: '견적 답변 등록' },
      { name: 'EstimateReplyWrite', label: '견적 답변 수정 (edit)', params: { mode: 'edit' } },
      { name: 'ReceivedEstimate', label: '받은 견적 확인' },
    ],
  },
  {
    title: '임가공',
    routes: [
      { name: 'ProcessingList', label: '임가공 견적 문의 목록' },
      { name: 'ProcessingUpload', label: '임가공 의뢰 등록' },
      { name: 'ProcessingUpload', label: '임가공 의뢰 수정 (edit)', params: { mode: 'edit' } },
      { name: 'ProcessingDetail', label: '임가공 의뢰 상세 (의뢰중)', params: { id: '1', status: 'ing' } },
      { name: 'ProcessingDetail', label: '임가공 의뢰 상세 (의뢰완료)', params: { id: '2', status: 'complete' } },
      { name: 'ProcessingDetail', label: '임가공 의뢰 상세 (만료)', params: { id: '3', status: 'exp' } },
      { name: 'ProcessingReplyWrite', label: '임가공 답변 등록' },
      { name: 'ProcessingReplyWrite', label: '임가공 답변 수정 (edit)', params: { mode: 'edit' } },
    ],
  },
  {
    title: '고철 처리',
    routes: [
      { name: 'ScrapList', label: '고철 처리 목록' },
      { name: 'ScrapUpload', label: '고철처리 등록' },
      { name: 'ScrapDetail', label: '고철 처리 상세 (의뢰중)', params: { id: '1', status: 'ing' } },
      { name: 'ScrapDetail', label: '고철 처리 상세 (의뢰완료)', params: { id: '2', status: 'complete' } },
      { name: 'ScrapDetail', label: '고철 처리 상세 (만료)', params: { id: '3', status: 'exp' } },
      { name: 'ScrapReplyWrite', label: '고철처리 답변 등록' },
      { name: 'ScrapReplyWrite', label: '고철처리 답변 수정 (edit)', params: { mode: 'edit' } },
    ],
  },
  {
    title: '거래',
    routes: [
      { name: 'PurchaseList', label: '구매 내역' },
      { name: 'SalesList', label: '판매 내역' },
      { name: 'OrderDetail', label: '주문 상세' },
      { name: 'OrderWrite', label: '주문하기', params: { product: { id: '1', name: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H', price: 2400000 } } },
      { name: 'OrderComplete', label: '주문 완료', params: { orderInfo: { accountHolder: '주식회사 수성코리아', bankName: '국민은행', accountNumber: '123456789', totalAmount: 2400000, sellerPhone: '0501-2345-6789' } } },
      { name: 'FavoriteList', label: '관심목록' },
      { name: 'FavoriteList', label: '관심목록 (빈 상태)', params: { initialProducts: [] } },
      { name: 'TradeReview', label: '거래 후기' },
      { name: 'ChatList', label: '채팅내역' },
      { name: 'ChatRoom', label: '채팅방 (일반회원)', params: { chatId: '1', userType: 'personal' } },
      { name: 'ChatRoom', label: '채팅방 (기업회원)', params: { chatId: '2', userType: 'business' } },
      { name: 'ChatRoom', label: '채팅방 (안전결제-입금전)', params: { chatId: '3', chatContext: 'payment_before', userType: 'personal' } },
      { name: 'ChatRoom', label: '채팅방 (안전결제-입금후)', params: { chatId: '4', chatContext: 'payment_after', userType: 'personal' } },
    ],
  },
  {
    title: '마이페이지',
    routes: [
      { name: 'Profile', label: '프로필' },
      { name: 'ProfileEdit', label: '프로필 수정' },
      { name: 'PasswordReset', label: '비밀번호 변경' },
      { name: 'BusinessUpgrade', label: '사업자 업그레이드' },
      { name: 'BusinessUpgradeForm', label: '사업자 업그레이드 폼', params: { plan: 'general' } },
      { name: 'BusinessUpgradeFormNormal', label: '일반 사업자 전환' },
      { name: 'BusinessUpgradeFormGold', label: '골드 사업자 전환' },
    ],
  },
  {
    title: '1:1 문의',
    routes: [
      { name: 'InquiryList', label: '1:1 문의 목록' },
      { name: 'InquiryWrite', label: '1:1 문의 등록' },
    ],
  },
  {
    title: '브랜드관',
    routes: [
      { name: 'BrandHome', label: '브랜드관 메인' },
      { name: 'BrandDetail', label: '브랜드관 상세 (메인)', params: { brandId: '1' } },
      { name: 'BrandAbout', label: '브랜드관 회사소개', params: { brandId: '1' } },
      { name: 'BrandNotice', label: '브랜드관 공지사항', params: { brandId: '1' } },
      { name: 'BrandNoticeWrite', label: '브랜드관 공지사항 등록', params: { brandId: '1' } },
      { name: 'BrandNoticeWrite', label: '브랜드관 공지사항 수정', params: { mode: 'edit', brandId: '1' } },
      { name: 'BrandProducts', label: '브랜드관 제품소개', params: { brandId: '1' } },
      { name: 'BrandProducts', label: '브랜드관 제품소개 (빈 상태)', params: { brandId: '1', empty: true } },
      { name: 'BrandProductDetail', label: '브랜드관 상품 상세', params: { brandId: '1', productId: '1' } },
      { name: 'BrandContact', label: '브랜드관 문의하기', params: { brandId: '1' } },
      { name: 'BrandWrite', label: '브랜드관 등록' },
      { name: 'BrandWrite', label: '브랜드관 수정 (edit)', params: { mode: 'edit', brandId: '1' } },
    ],
  },
  {
    title: '기타',
    routes: [
      { name: 'Terms', label: '이용약관' },
      { name: 'Privacy', label: '개인정보처리방침' },
      { name: 'FAQ', label: 'FAQ' },
      { name: 'Notice', label: '공지사항' },
      { name: 'IndustryNews', label: '산업소식' },
      { name: 'IndustryNewsDetail', label: '산업소식 상세', params: { news: { id: '1', title: '[현장] 지금 제조 현장에서 중고 기계가 주목받는 이유', date: '2025.12.12' } } },
    ],
  },
];

export const DevRouteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={st.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={st.header}>
        <Text style={st.headerTitle}>Dev Route Map</Text>
        <Text style={st.headerSub}>페이지별 퍼블리싱 확인용</Text>
      </View>

      <ScrollView style={st.scroll} contentContainerStyle={st.scrollContent} showsVerticalScrollIndicator={false}>
        {ROUTE_GROUPS.map((group) => (
          <View key={group.title} style={st.group}>
            <Text style={st.groupTitle}>{group.title}</Text>
            {group.routes.map((route, idx) => (
              <TouchableOpacity
                key={`${route.name}-${idx}`}
                style={st.routeItem}
                activeOpacity={0.6}
                onPress={() => navigation.navigate(route.name as any, route.params)}
              >
                <View style={st.routeDot} />
                <View style={st.routeInfo}>
                  <Text style={st.routeLabel}>{route.label}</Text>
                  <Text style={st.routeName}>{route.name}{route.params ? ` ${JSON.stringify(route.params)}` : ''}</Text>
                </View>
                <Text style={st.routeArrow}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: colors.G200,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.black },
  headerSub: { fontSize: 12, color: colors.G500, marginTop: 4 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  group: { marginBottom: 24 },
  groupTitle: {
    fontSize: 13, fontWeight: '700', color: colors.primary,
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: 8, paddingBottom: 6,
    borderBottomWidth: 1, borderBottomColor: colors.G100,
  },
  routeItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: colors.G100,
  },
  routeDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: colors.G400, marginRight: 12,
  },
  routeInfo: { flex: 1 },
  routeLabel: { fontSize: 14, fontWeight: '500', color: colors.black },
  routeName: { fontSize: 11, color: colors.G500, marginTop: 2 },
  routeArrow: { fontSize: 14, color: colors.G400, marginLeft: 8 },
});

