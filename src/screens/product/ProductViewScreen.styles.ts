import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // 레이아웃
  safeArea: { flex: 1, backgroundColor: colors.white },
  flex1: { flex: 1 },
  contentContainer: { paddingBottom: 100 },
  px20: { paddingHorizontal: 20 },
  pt20: { paddingTop: 20 },
  bold: { fontWeight: 'bold' },
  textG600: { color: colors.G600 },
  textBlue: { color: colors.blue },
  textLink: { color: colors.blue },
  thinDivider: { height: 1, backgroundColor: colors.G200, marginVertical: 20 },
  sectionGap: { height: 8, backgroundColor: colors.white },

  // 유틸 row
  rowCenterGap4: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowCenterGap4mt4: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  rowEndGap6: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  rowCenter: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },

  // 이미지 슬라이더
  slideSection: { height: 339, position: 'relative', backgroundColor: colors.white },
  headerOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 20,
    left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  overlayBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  moreIcon: { fontSize: 24, color: colors.white },
  slideImg: { width: SCREEN_WIDTH, height: 339 },
  paginationBadge: {
    position: 'absolute', bottom: 16, right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20,
  },
  paginationText: { color: colors.white, fontSize: 13 },

  // 상품 기본 정보
  subject: { fontSize: 18, fontWeight: 'bold', color: colors.black, lineHeight: 26, marginTop: 20, marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  price: { fontSize: 22, fontWeight: 'bold', color: colors.black },
  statsRow: { flexDirection: 'row', gap: 8 },
  statText: { fontSize: 13, color: colors.G600 },

  // 판매자 프로필
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImg: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  profileName: { fontSize: 15, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  profileTel: { fontSize: 14, color: colors.G600 },

  // 스펙 테이블
  specBox: { gap: 8 },
  specRow: { flexDirection: 'row' },
  specDt: { width: 70, fontSize: 14, color: colors.G600 },
  specDd: { flex: 1, fontSize: 14, color: colors.black },

  // 서비스 태그 그리드
  serviceGrid: { flexDirection: 'row', marginBottom: 20, gap: 12 },
  serviceCol: { flex: 1, gap: 10 },
  serviceItem: { flexDirection: 'row', alignItems: 'center' },
  serviceIconWrap: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.G200,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  serviceIconWrapOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  serviceText: { fontSize: 13, color: colors.G500 },
  serviceTextOn: { color: colors.primary, fontWeight: 'bold' },

  // 별점/지역 정보 박스
  infoBoxRow: { flexDirection: 'row', borderWidth: 1, borderColor: colors.G200, borderRadius: 6, marginBottom: 10, overflow: 'hidden' },
  infoBoxItem: { flex: 1, padding: 14, alignItems: 'center', justifyContent: 'center' },
  infoBoxDivider: { width: 1, backgroundColor: colors.G200 },
  infoBoxText: { fontSize: 13, color: colors.black, fontWeight: '500' },

  // 배너
  bannerImg: { width: '100%', height: 80, borderRadius: 6 },

  // Sticky 탭
  tabWrap: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.G200 },
  tabRow: { flexDirection: 'row', width: SCREEN_WIDTH },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnActive: { borderBottomColor: colors.primary },
  tabText: { fontSize: 14, color: colors.G500 },
  tabTextActive: { color: colors.primary, fontWeight: 'bold' },

  // 섹션 헤더
  secTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 15 },
  secTitleFlat: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  secHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  viewAll: { fontSize: 13, color: colors.G600 },

  // 상품소개 탭
  hashTagRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  hashTag: { fontSize: 14, color: colors.G600 },
  descText: { fontSize: 14, lineHeight: 22, color: colors.black, marginBottom: 20 },
  timeAgo: { fontSize: 12, color: colors.G400, textAlign: 'right' },

  // 판매자 정보 테이블
  table: { borderTopWidth: 1, borderTopColor: colors.G200 },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.G200, paddingVertical: 14 },
  trLast: { borderBottomWidth: 0 },
  th: { width: 125, fontSize: 14, color: colors.black, fontWeight: '500' },
  td: { flex: 1, fontSize: 14, color: colors.black },

  // 상품 카드 공통
  heartBtn: { position: 'absolute', bottom: 8, right: 8, width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 14, color: colors.black, marginBottom: 4 },
  cardTags: { fontSize: 12, color: colors.G500, marginBottom: 8 },
  cardBot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 15, fontWeight: 'bold', color: colors.black },
  cardTime: { fontSize: 12, color: colors.G400 },

  // 추천 상품 2열 그리드
  recommendGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recommendCard: { width: '48%', marginBottom: 16 },
  recommendImg: { width: '100%', aspectRatio: 1.3, borderRadius: 8, marginBottom: 8, position: 'relative', overflow: 'hidden' },
  bestTag: { fontSize: 11, fontWeight: 'bold', color: colors.red, marginBottom: 4 },

  // 리뷰 섹션
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 15 },
  blueNoticeBox: { backgroundColor: '#F0F6FF', padding: 18, borderRadius: 6, marginBottom: 16 },
  blueNoticeText: { fontSize: 14, color: colors.black },

  // 평점 통계
  ratingBox: { flexDirection: 'row', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 20, marginBottom: 25, borderWidth: 1, borderColor: colors.G200 },
  ratingLeft: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: colors.G200, paddingRight: 16 },
  ratingLabel: { fontSize: 13, color: colors.G600, fontWeight: '500' },
  ratingStarBig: { marginTop: 6, marginBottom: 2 },
  ratingScore: { fontSize: 24, fontWeight: 'bold', color: colors.black },
  ratingScoreSub: { fontSize: 14, color: colors.G400, fontWeight: 'normal' },
  ratingRight: { flex: 1, paddingLeft: 16 },
  chartWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 70 },
  chartCol: { alignItems: 'center', width: 24 },
  chartTrack: { width: 8, height: 50, backgroundColor: colors.G200, borderRadius: 4, justifyContent: 'flex-end' },
  chartFill: { width: '100%', borderRadius: 4 },
  chartLabel: { fontSize: 11, fontWeight: 'bold', color: colors.black, marginTop: 6 },

  // 리뷰 아이템
  reviewItem: { paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.G200, marginBottom: 20 },
  reProfileImg: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  reName: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  reDate: { fontSize: 12, color: '#7E7E7E' },
  reStarScore: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  reInfoRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  reInfoChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.G100, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6 },
  reInfoDt: { fontSize: 12, color: colors.G600 },
  reInfoDd: { fontSize: 12, color: colors.black, fontWeight: '500' },
  reImgScroll: { marginBottom: 14 },
  reAttachedImg: { width: 122.35, height: 122.35, borderRadius: 6, marginRight: 10 },
  reContentText: { fontSize: 14, lineHeight: 22, color: colors.black, marginBottom: 8 },
  moreBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 4 },
  moreBtnText: { fontSize: 13, color: '#7E7E7E' },
  chevronUp: { transform: [{ rotate: '180deg' }] },
  loadingText: { textAlign: 'center', padding: 20, color: colors.G600 },

  // 하단 플로팅 바
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    padding: 16, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: colors.white,
    borderTopWidth: 1, borderTopColor: colors.G200, gap: 8,
  },
  btnLike: { width: 60, height: 50, borderWidth: 1, borderColor: colors.G300, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  btnLikeCount: { fontSize: 11, color: colors.black, marginTop: 2 },
  btnSafe: { flex: 1, height: 50, backgroundColor: colors.G100, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  btnSafeText: { fontSize: 15, fontWeight: 'bold', color: colors.black },
  btnChat: { flex: 1.5, height: 50, backgroundColor: colors.primary, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  btnChatText: { fontSize: 15, fontWeight: 'bold', color: colors.white },
});
