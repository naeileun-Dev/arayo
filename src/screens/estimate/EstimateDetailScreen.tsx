import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  Modal,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { InfoTag } from '../../components/common';
import { BottomButtonBar, SelectPartnerModal, ConfirmModal, ImageViewerModal } from '../../components/common';
import { GuestAuthModal } from '../../components/common/GuestAuthModal';
import { QuoteCard } from './components/QuoteCard';
import { QuoteItem } from './components/quoteTypes';

const productImage = require('../../assets/images/img01.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;
const IMAGE_GAP = 5;
const IMAGE_COUNT = 3;
const IMAGE_SIZE =
  (SCREEN_WIDTH - PADDING_LR * 2 - IMAGE_GAP * (IMAGE_COUNT - 1)) / IMAGE_COUNT;

interface InfoRow {
  label: string;
  value: string;
  tag?: string;
}

type EstimateStatus = 'ing' | 'complete' | 'exp';

const STATE_CONFIG: Record<EstimateStatus, { label: string; color: string }> = {
  ing: { label: '견적 요청 중', color: colors.system100 },
  complete: { label: '요청 완료', color: colors.green },
  exp: { label: '만료', color: colors.G500 },
};

export const EstimateDetailScreen: React.FC<{ route?: { params?: { id?: string; status?: EstimateStatus } } }> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const status: EstimateStatus = route?.params?.status ?? 'ing';
  const stateInfo = STATE_CONFIG[status];

  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isPartnerModalVisible, setIsPartnerModalVisible] = useState(false);
  const [isSentQuoteVisible, setIsSentQuoteVisible] = useState(false);
  const [sentQuoteExpanded, setSentQuoteExpanded] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isGuestAuthVisible, setIsGuestAuthVisible] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  const inquiryData = {
    state: stateInfo.label,
    date: '25.06.15',
    subject: '안녕하세요. CNC 선반 견적 문의 드립니다.',
    content: '안녕하세요 견적문의 드립니다. 확인 후 답변 부탁드립니다. ^^',
    images: [productImage, productImage, productImage],
  };

  const sentQuote: QuoteItem = {
    id: 'sent-1',
    title: '접촉+비접촉 겸용 래쇼날',
    state: 'used',
    contactName: '김샘플',
    phone: '010-1234-5678',
    priceLabel: '견적 금액',
    price: '40,500,000원',
    priceTag: '협의가능',
    manufacturer: '화천기계',
    modelName: 'CS-3020H',
    manufactureDate: '2006년 07월',
    location: '경기 안산',
    warrantyPeriod: '2006년 07월',
    equipmentType: '공작기계 CNC 선반',
    description:
      '문의 주신 스마트기기 부품 임가공 건에 대해\n아래와 같이 검토 결과를 안내드립니다.',
    services: [
      { key: 'custom-made', label: '주문제작', isActive: false },
      { key: 'as', label: 'A/S 가능', isActive: false },
      { key: 'loading', label: '상차도', isActive: true },
      { key: 'arrival', label: '도착도', isActive: false },
      { key: 'install', label: '설치', isActive: false },
      { key: 'drive-training', label: '시운전/교육', isActive: true },
      { key: 'tax-invoice', label: '세금계산서 발행', isActive: false },
      { key: 'installment', label: '할부가능', isActive: false },
    ],
  };

  const inquiryInfo: InfoRow[] = [
    { label: '제품명', value: '[신품] CNC 선반' },
    { label: '구매자 위치', value: '서울 강서구' },
    { label: '제품 구분', value: '공작기계 CNC 선반' },
    { label: '희망가격', value: '4,000,000원', tag: '제안가능' },
  ];

  const buyerInfo: InfoRow[] = [
    { label: '이름', value: '김샘플' },
    { label: '휴대폰 번호', value: '010-1234-5678' },
  ];

  // ─── 화면 렌더링 ───

  const renderInfoRow = (item: InfoRow, index: number, list: InfoRow[]) => (
    <View
      key={index}
      style={[
        styles.infoRow,
        index < list.length - 1 && { marginBottom: 10 },
      ]}
    >
      <Text style={styles.infoLabel}>{item.label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={styles.infoValue}>{item.value}</Text>
        {item.tag && (
          <InfoTag text={item.tag} variant="red" />
        )}
      </View>
    </View>
  );

  const renderImageGrid = () => (
    <View style={styles.imageGrid}>
      {inquiryData.images.map((img, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setImageViewerIndex(index);
            setImageViewerVisible(true);
          }}
        >
          <Image
            source={img}
            style={[
              styles.imagePlaceholder,
              index < inquiryData.images.length - 1 && {
                marginRight: IMAGE_GAP,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  // renderPartnerModal → SelectPartnerModal 컴포넌트로 대체

  // ─── 메인 렌더 ───

  return (
    <SafeAreaView style={styles.container}>
      <Header title="견적 문의 상세" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.inquiryHead}>
            <View style={styles.headTopRow}>
              <Text style={[styles.stateText, { color: stateInfo.color }]}>{inquiryData.state}</Text>
              <Text style={styles.dateText}>{inquiryData.date}</Text>
            </View>
            <Text style={styles.subjectText}>{inquiryData.subject}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>문의 내용</Text>
            {inquiryInfo.map((item, index) =>
              renderInfoRow(item, index, inquiryInfo),
            )}
          </View>

          <Text style={styles.contentText}>{inquiryData.content}</Text>

          {renderImageGrid()}

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>구매자 정보</Text>
            {buyerInfo.map((item, index) =>
              renderInfoRow(item, index, buyerInfo),
            )}
          </View>
        </View>
      </ScrollView>

      {/* 하단 고정 바 */}
      <View style={styles.bottomFloating}>
        {status === 'ing' && (
          <BottomButtonBar
            buttons={[
              { label: '보낸 견적 확인하기', variant: 'outline', onPress: () => setIsSentQuoteVisible(true) },
              { label: '견적 등록하기', onPress: () => navigation.navigate('EstimateReplyWrite') },
            ]}
          />
        )}

        {status === 'complete' && (
          <>
            {isMoreVisible && (
              <View style={styles.moreMenu}>
                <TouchableOpacity
                  style={styles.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    navigation.navigate('ReceivedEstimate');
                  }}
                >
                  <Text style={styles.moreMenuText}>받은 견적 확인하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    navigation.navigate('EstimateUpload', { mode: 'edit' });
                  }}
                >
                  <Text style={styles.moreMenuText}>문의글 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    setIsDeleteVisible(true);
                  }}
                >
                  <Text style={styles.moreMenuText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    setIsGuestAuthVisible(true);
                  }}
                >
                  <Text style={styles.moreMenuText}>비회원 인증</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.bottomInner}>
              <TouchableOpacity
                style={styles.completeButton}
                activeOpacity={0.8}
                onPress={() => {
                  setIsMoreVisible(false);
                  setIsPartnerModalVisible(true);
                }}
              >
                <Text style={styles.completeButtonText}>견적 요청 완료</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setIsMoreVisible((prev) => !prev)}
                activeOpacity={0.7}
              >
                <Text style={styles.moreButtonIcon}>•••</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {status === 'exp' && (
          <BottomButtonBar
            buttons={[
              { label: '받은 견적 확인하기', variant: 'outline', onPress: () => navigation.navigate('ReceivedEstimate') },
              { label: '재등록하기', onPress: () => navigation.navigate('EstimateUpload') },
            ]}
          />
        )}
      </View>

      <SelectPartnerModal
        visible={isPartnerModalVisible}
        onClose={() => setIsPartnerModalVisible(false)}
        onSelect={() => setIsPartnerModalVisible(false)}
      />

      {/* 보낸 견적 확인 모달 */}
      <Modal
        visible={isSentQuoteVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsSentQuoteVisible(false);
          setSentQuoteExpanded(false);
        }}
      >
        <View style={styles.sentQuoteOverlay}>
          <View style={styles.sentQuoteContainer}>
            {/* 헤더 */}
            <View style={styles.sentQuoteHeader}>
              <Text style={styles.sentQuoteTitle}>보낸 견적</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsSentQuoteVisible(false);
                  setSentQuoteExpanded(false);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.sentQuoteCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 카드 */}
            <ScrollView
              style={styles.sentQuoteBody}
              contentContainerStyle={styles.sentQuoteBodyContent}
              showsVerticalScrollIndicator={false}
            >
              <QuoteCard
                item={sentQuote}
                expanded={sentQuoteExpanded}
                onExpand={() => setSentQuoteExpanded(true)}
                hideAction
              />
            </ScrollView>

            {/* 하단 버튼 */}
            <BottomButtonBar
              buttons={[
                {
                  label: '삭제하기',
                  variant: 'outline',
                  onPress: () => {
                    setIsSentQuoteVisible(false);
                    setSentQuoteExpanded(false);
                  },
                },
                {
                  label: '수정하기',
                  onPress: () => {
                    setIsSentQuoteVisible(false);
                    setSentQuoteExpanded(false);
                    navigation.navigate('EstimateReplyWrite', { mode: 'edit' });
                  },
                },
              ]}
            />
          </View>
        </View>
      </Modal>

      <ConfirmModal
        visible={isDeleteVisible}
        title="삭제하기"
        message="해당 견적 문의를 삭제하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="삭제"
        onClose={() => setIsDeleteVisible(false)}
        onConfirm={() => {
          setIsDeleteVisible(false);
          navigation.goBack();
        }}
      />

      <GuestAuthModal
        visible={isGuestAuthVisible}
        onClose={() => setIsGuestAuthVisible(false)}
        onConfirm={() => {
          setIsGuestAuthVisible(false);
        }}
      />

      <ImageViewerModal
        visible={imageViewerVisible}
        images={inquiryData.images}
        initialIndex={imageViewerIndex}
        onClose={() => setImageViewerVisible(false)}
      />
    </SafeAreaView>
  );
};

/* ═══════════════════════════════════════════════════
   StyleSheet
   모든 수치는 CSS 원본 기준 — 주석에 출처 표기
   ═══════════════════════════════════════════════════ */

const styles = StyleSheet.create({
  /* ── 기존 화면 스타일 (변경 없음) ── */
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: PADDING_LR,
  },
  inquiryHead: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  headTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.system100,
  },
  dateText: {
    fontSize: 12,
    color: colors.G400,
    marginLeft: 'auto',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 22,
  },
  infoSection: {},
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: 90,
    fontSize: 14,
    fontWeight: '500',
    color: colors.G400,
    lineHeight: 21,
  },
  infoValueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoValue: {
    fontSize: 14,
    color: colors.G600,
    lineHeight: 21,
  },
  contentText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  imageGrid: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: IMAGE_SIZE,
    aspectRatio: 1,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.G200,
    marginTop: 20,
    marginBottom: 20,
  },
  bottomFloating: {
    position: 'relative',
  },
  bottomInner: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  outlineButton: {
    flex: 1,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  completeButton: {
    flex: 1,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  moreButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonIcon: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.black,
    letterSpacing: 2,
  },
  moreMenu: {
    position: 'absolute',
    bottom: 85,
    right: 15,
    left: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  moreMenuItem: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreMenuText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },

  /* ══════════════════════════════════════════════════
     모달
     CSS:
       ._layer_popup { padding:40px 20px }
       .popInner { border-radius:8px; padding:22px; box-shadow }
       .popCon-header { font-size:18px; font-weight:500; margin-bottom:20px }
       .popCon-body { font-size:14px; line-height:1.5em }
       .popCon-btnSet { margin-top:15px; --btn-height:50px; --btn-font-size:14px }
     ══════════════════════════════════════════════════ */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 22,
    marginBottom: 20,
  },
  // font-size:18px; font-weight:500(--semi-bold)
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  // .popClose:before font-size:14px
  modalCloseIcon: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1B1B1B',
  },
  modalBody: {
    paddingHorizontal: 22,
    flexGrow: 0,
    flexShrink: 1,
  },
  // CSS: .flex.column.gap5.mt10.fs14
  modalBodyContent: {
    gap: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  // CSS: .popCon-btnSet { margin-top:15px }
  modalFooter: {
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 22,
  },

  /* ══════════════════════════════════════════════════
     Lbox (선택 박스 — 라디오 동그라미 없음, 보더색으로 선택 표시)
     CSS:
       .Lbox { background:#fff; padding:15px; border:1px solid var(--G200); border-radius:4px }
       .radio-custom[box].checked .Lbox { border-color:var(--mainColor) }
     ══════════════════════════════════════════════════ */
  lBox: {
    backgroundColor: colors.white,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 4,
  },
  lBoxSelected: {
    borderColor: colors.primary,
  },

  // CSS: .color-G600 → #7E7E7E
  noneOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.G600,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  /* ══════════════════════════════════════════════════
     파트너 아이템
     CSS: .partner-item { position:relative }
     ══════════════════════════════════════════════════ */
  partnerItemWrapper: {
    position: 'relative',
  },

  // CSS: .tradePartner { width:100%; display:flex; align-items:stretch; gap:10px }
  partnerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  partnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  partnerInfoWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  // CSS: .tradePartner .con .name { font-size:14px; font-weight:var(--bold) } → 600
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  // CSS: .tradePartner .con .tagSet { margin-top:auto }
  partnerTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },

  /* ── 2열 그리드 ──
     CSS: dl[data-dl-style="grid"][data-dl-cols="2"] {
       font-size:14px; grid-template-columns:repeat(2,1fr);
       column-gap:14px; row-gap:3px;
     }
     dt { color:var(--G600) } → #7E7E7E
  */
  gridMarginTop: {
    marginTop: 10,
  },
  gridContainer: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 14,
  },
  gridCell: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.G600,
    lineHeight: 18,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
  },

  /* ── 더보기 버튼 ──
     CSS:
       .partner-item.item.short button.itemExpand {
         position:absolute; bottom:1px; left:1px; z-index:2;
         width:calc(100% - 2px); height:90px; border-radius:5px;
         display:flex; align-items:flex-end; justify-content:center;
         padding-bottom:15px;
         background:linear-gradient(transparent 0%, white 90%);
       }
       :after { content:'\e93b'; font-family:'myfont'; font-size:12px }
  */
  expandButton: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 1,
    height: 70,
    borderRadius: 5,
    zIndex: 2,
    overflow: 'hidden',
  },
  expandGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  expandContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1B1B1B',
  },

  /* ── 모달 하단 버튼 ──
     CSS: ._btn { height:50px; background:var(--mainColor); color:#fff; border-radius:4px;
                  font-size:14px; font-weight:500 }
          ._btn[disabled] { background:var(--G100)!important; color:var(--G500)!important }
  */
  modalSubmitButton: {
    height: 50,
    backgroundColor: '#DB0025', // --mainColor
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#F7F7F7', // --G100
  },
  modalSubmitText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  modalSubmitTextDisabled: {
    color: '#9E9E9E', // --G500
  },

  /* ── 보낸 견적 확인 모달 ── */
  sentQuoteOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sentQuoteContainer: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  sentQuoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 15,
  },
  sentQuoteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  sentQuoteCloseIcon: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  sentQuoteBody: {
    paddingHorizontal: 22,
    flexGrow: 0,
    flexShrink: 1,
  },
  sentQuoteBodyContent: {
    paddingBottom: 10,
  },
  sentQuoteFooter: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 22,
    gap: 10,
  },
  sentQuoteDeleteBtn: {
    flex: 1,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentQuoteDeleteText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  sentQuoteEditBtn: {
    flex: 1,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentQuoteEditText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
});

