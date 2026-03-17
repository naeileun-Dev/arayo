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
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import LinearGradient from 'react-native-linear-gradient';
import { BottomButtonBar } from '../../components/common';
import type { RootStackParamList } from '../../types';

const userImage = require('../../assets/images/user01.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;
const IMAGE_GAP = 5;
const IMAGE_COUNT = 3;
const IMAGE_SIZE =
  (SCREEN_WIDTH - PADDING_LR * 2 - IMAGE_GAP * (IMAGE_COUNT - 1)) / IMAGE_COUNT;

const PARTNER_COLLAPSED_HEIGHT = 240;

interface InfoRow {
  label: string;
  value: string;
  tag?: string;
}

interface GridItem {
  label: string;
  value: string;
}

interface PartnerData {
  id: string;
  name: string;
  tags: { text: string; type: 'red' | 'blue' }[];
  gridInfo: GridItem[];
}

type ScrapStatus = 'ing' | 'complete' | 'exp';

const STATE_CONFIG: Record<ScrapStatus, { label: string; color: string }> = {
  ing: { label: '의뢰중', color: colors.system100 },
  complete: { label: '의뢰완료', color: colors.green },
  exp: { label: '만료', color: colors.G500 },
};

export const ScrapDetailScreen: React.FC<{ route?: { params?: { id?: string; status?: ScrapStatus } } }> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const status: ScrapStatus = route?.params?.status ?? 'ing';
  const stateInfo = STATE_CONFIG[status];

  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isPartnerModalVisible, setIsPartnerModalVisible] = useState(false);
  const [isSentQuoteVisible, setIsSentQuoteVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [expandedPartners, setExpandedPartners] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedPartners((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const inquiryData = {
    state: stateInfo.label,
    date: '25.06.15',
    subject: '안녕하세요. 고철 처리 문의 드립니다.',
    content: '안녕하세요 고철처리 문의 드립니다. 확인 후 답변 부탁드립니다. ^^',
    images: [1, 2, 3],
  };

  const inquiryInfo: InfoRow[] = [
    { label: '처리 종류', value: '고철 매입' },
    { label: '차량 진입', value: '가능' },
    { label: '작업 공간', value: '충분' },
    { label: '고철 위치', value: '1층' },
    { label: '고철 양', value: '1톤 이상' },
    { label: '엘리베이터', value: '있음' },
    { label: '희망 처리일', value: '2025.06.20' },
  ];

  const buyerInfo: InfoRow[] = [
    { label: '이름', value: '김샘플' },
    { label: '휴대폰 번호', value: '010-1234-5678' },
  ];

  const partners: PartnerData[] = [
    {
      id: 'partner1',
      name: '김샘플',
      tags: [
        { text: '가격제안가능', type: 'red' },
        { text: '9분전 대화', type: 'blue' },
      ],
      gridInfo: [
        { label: '담당자명', value: '김샘플' },
        { label: '상호명', value: '샘플상사' },
        { label: '휴대폰번호', value: '010-1234-5678' },
        { label: '매입 금액', value: '500,000원' },
      ],
    },
    {
      id: 'partner2',
      name: '홍길동',
      tags: [{ text: '9분전 대화', type: 'blue' }],
      gridInfo: [
        { label: '담당자명', value: '홍길동' },
        { label: '상호명', value: '홍상사' },
        { label: '휴대폰번호', value: '010-9876-5432' },
        { label: '매입 금액', value: '450,000원' },
      ],
    },
  ];

  const sentQuote = {
    price: '500,000원',
    priceNegotiable: true,
    description: '문의 주신 고철 처리 건에 대해\n아래와 같이 검토 결과를 안내드립니다.',
    contactName: '김샘플',
    companyName: '샘플상사',
    phone: '010-1234-5678',
  };

  const renderInfoRow = (item: InfoRow, index: number, list: InfoRow[]) => (
    <View
      key={index}
      style={[styles.infoRow, index < list.length - 1 && { marginBottom: 10 }]}
    >
      <Text style={styles.infoLabel}>{item.label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={styles.infoValue}>{item.value}</Text>
        {item.tag && <InfoTag text={item.tag} variant="red" />}
      </View>
    </View>
  );

  const renderImageGrid = () => (
    <View style={styles.imageGrid}>
      {inquiryData.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.imagePlaceholder,
            index < inquiryData.images.length - 1 && { marginRight: IMAGE_GAP },
          ]}
        />
      ))}
    </View>
  );

  const renderTag = (text: string, type: 'red' | 'blue', index: number) => (
    <InfoTag key={index} text={text} variant={type} />
  );

  const renderGridInfo = (gridInfo: GridItem[]) => {
    const leftItems: GridItem[] = [];
    const rightItems: GridItem[] = [];
    gridInfo.forEach((item, i) => {
      if (i % 2 === 0) leftItems.push(item);
      else rightItems.push(item);
    });

    const rowCount = Math.max(leftItems.length, rightItems.length);
    const rows: (GridItem | null)[][] = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push([leftItems[i] ?? null, rightItems[i] ?? null]);
    }

    return (
      <View style={styles.gridContainer}>
        {rows.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {row.map((cell, colIdx) => (
              <View key={colIdx} style={styles.gridCell}>
                {cell ? (
                  <>
                    <Text style={styles.gridLabel}>{cell.label}</Text>
                    <Text style={styles.gridValue}>{cell.value}</Text>
                  </>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderPartnerItem = (partner: PartnerData) => {
    const isSelected = selectedPartner === partner.id;
    const isExpanded = expandedPartners.has(partner.id);

    return (
      <View key={partner.id} style={styles.partnerItemWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedPartner(partner.id)}
          style={[
            styles.lBox,
            isSelected && styles.lBoxSelected,
            !isExpanded && { maxHeight: PARTNER_COLLAPSED_HEIGHT, overflow: 'hidden' },
          ]}
        >
          <View style={styles.partnerProfile}>
            <Image source={userImage} style={styles.partnerAvatar} />
            <View style={styles.partnerInfoWrap}>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <View style={styles.partnerTagRow}>
                {partner.tags.map((t, i) => renderTag(t.text, t.type, i))}
              </View>
            </View>
          </View>
          <View style={styles.gridMarginTop}>{renderGridInfo(partner.gridInfo)}</View>
        </TouchableOpacity>

        {!isExpanded && (
          <TouchableOpacity
            style={styles.expandButton}
            activeOpacity={0.8}
            onPress={() => toggleExpand(partner.id)}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,1)']}
              locations={[0, 0.5, 1]}
              style={styles.expandGradient}
            >
              <View style={styles.expandContent}>
                <Text style={styles.expandText}>더보기</Text>
                <ChevronDownIcon width={12} height={12} color="#1B1B1B" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderPartnerModal = () => (
    <Modal
      visible={isPartnerModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsPartnerModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>어느분과 거래 하셨나요 ?</Text>
            <TouchableOpacity
              onPress={() => {
                setIsPartnerModalVisible(false);
                setSelectedPartner(null);
                setExpandedPartners(new Set());
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[styles.lBox, selectedPartner === 'none' && styles.lBoxSelected]}
              activeOpacity={0.7}
              onPress={() => setSelectedPartner('none')}
            >
              <Text style={styles.noneOptionText}>나와 거래한 판매자/구매자가 없어요</Text>
            </TouchableOpacity>
            {partners.map((p) => renderPartnerItem(p))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalSubmitButton, !selectedPartner && styles.modalSubmitButtonDisabled]}
              activeOpacity={0.8}
              onPress={() => {
                if (selectedPartner) {
                  setIsPartnerModalVisible(false);
                }
              }}
              disabled={!selectedPartner}
            >
              <Text style={[styles.modalSubmitText, !selectedPartner && styles.modalSubmitTextDisabled]}>
                선택하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderSentQuoteModal = () => (
    <Modal
      visible={isSentQuoteVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsSentQuoteVisible(false)}
    >
      <View style={styles.sentQuoteOverlay}>
        <View style={styles.sentQuoteContainer}>
          <View style={styles.sentQuoteHeader}>
            <Text style={styles.sentQuoteTitle}>보낸 답변</Text>
            <TouchableOpacity
              onPress={() => setIsSentQuoteVisible(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.sentQuoteCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.sentQuoteBody}
            contentContainerStyle={styles.sentQuoteBodyContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.quoteCard}>
              <View style={styles.quoteSection}>
                <Text style={styles.quoteSectionTitle}>상세 소개</Text>
                <Text style={styles.quoteDescription}>{sentQuote.description}</Text>
              </View>

              <View style={styles.quoteDivider} />

              <View style={styles.quoteSection}>
                <Text style={styles.quoteSectionTitle}>가격</Text>
                <View style={styles.quotePriceRow}>
                  <Text style={styles.quotePriceLabel}>매입 금액</Text>
                  <View style={styles.quotePriceValueWrap}>
                    <Text style={styles.quotePriceValue}>{sentQuote.price}</Text>
                    {sentQuote.priceNegotiable && (
                      <InfoTag text="협의가능" variant="red" />
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.quoteDivider} />

              <View style={styles.quoteSection}>
                <Text style={styles.quoteSectionTitle}>판매자 정보</Text>
                <View style={styles.quoteInfoRow}>
                  <Text style={styles.quoteInfoLabel}>담당자명</Text>
                  <Text style={styles.quoteInfoValue}>{sentQuote.contactName}</Text>
                </View>
                <View style={styles.quoteInfoRow}>
                  <Text style={styles.quoteInfoLabel}>상호명</Text>
                  <Text style={styles.quoteInfoValue}>{sentQuote.companyName}</Text>
                </View>
                <View style={styles.quoteInfoRow}>
                  <Text style={styles.quoteInfoLabel}>휴대폰 번호</Text>
                  <Text style={styles.quoteInfoValue}>{sentQuote.phone}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <BottomButtonBar
            buttons={[
              { label: '삭제하기', variant: 'outline', onPress: () => setIsSentQuoteVisible(false) },
              {
                label: '수정하기',
                onPress: () => {
                  setIsSentQuoteVisible(false);
                  navigation.navigate('ScrapReplyWrite', { mode: 'edit' });
                },
              },
            ]}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="고철 처리 상세" onBack={() => navigation.goBack()} />

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
            {inquiryInfo.map((item, index) => renderInfoRow(item, index, inquiryInfo))}
          </View>

          <Text style={styles.contentText}>{inquiryData.content}</Text>

          {renderImageGrid()}

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>구매자 정보</Text>
            {buyerInfo.map((item, index) => renderInfoRow(item, index, buyerInfo))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomFloating}>
        {status === 'ing' && (
          <BottomButtonBar
            buttons={[
              { label: '받은 견적 확인하기', variant: 'outline', onPress: () => navigation.navigate('ReceivedEstimate', { type: 'scrap' }) },
              { label: '답변 등록하기', onPress: () => navigation.navigate('ScrapReplyWrite', {}) },
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
                    navigation.navigate('ReceivedEstimate', { type: 'scrap' });
                  }}
                >
                  <Text style={styles.moreMenuText}>받은 견적 확인하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    navigation.navigate('ScrapUpload');
                  }}
                >
                  <Text style={styles.moreMenuText}>문의글 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreMenuItem}>
                  <Text style={styles.moreMenuText}>삭제</Text>
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
                <Text style={styles.completeButtonText}>의뢰 완료</Text>
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
              { label: '받은 견적 확인하기', variant: 'outline', onPress: () => navigation.navigate('ReceivedEstimate', { type: 'scrap' }) },
              { label: '재등록하기', onPress: () => navigation.navigate('ScrapUpload') },
            ]}
          />
        )}
      </View>

      {renderPartnerModal()}
      {renderSentQuoteModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.G200,
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
      android: { elevation: 8 },
    }),
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
      android: { elevation: 4 },
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
      android: { elevation: 10 },
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
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1B1B',
  },
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
  modalBodyContent: {
    gap: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  modalFooter: {
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 22,
  },
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
  noneOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.G600,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  partnerItemWrapper: {
    position: 'relative',
  },
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
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  partnerTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
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
  modalSubmitButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: colors.G100,
  },
  modalSubmitText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  modalSubmitTextDisabled: {
    color: colors.G500,
  },
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
      android: { elevation: 10 },
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
  quoteCard: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 8,
    padding: 16,
  },
  quoteSection: {
    paddingVertical: 10,
  },
  quoteSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 10,
  },
  quoteDescription: {
    fontSize: 14,
    color: colors.G600,
    lineHeight: 20,
  },
  quoteDivider: {
    height: 1,
    backgroundColor: colors.G200,
  },
  quotePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotePriceLabel: {
    fontSize: 14,
    color: colors.G400,
  },
  quotePriceValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quotePriceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  quoteInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quoteInfoLabel: {
    width: 90,
    fontSize: 14,
    color: colors.G400,
  },
  quoteInfoValue: {
    fontSize: 14,
    color: colors.G600,
  },
});

