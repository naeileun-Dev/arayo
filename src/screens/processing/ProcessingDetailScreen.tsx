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
import { BottomButtonBar } from '../../components/common';
import { QuoteCard } from '../estimate/components/QuoteCard';
import { QuoteItem } from '../estimate/components/quoteTypes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;
const IMAGE_GAP = 5;
const IMAGE_COUNT = 3;
const IMAGE_SIZE =
  (SCREEN_WIDTH - PADDING_LR * 2 - IMAGE_GAP * (IMAGE_COUNT - 1)) / IMAGE_COUNT;

type ProcessingStatus = 'ing' | 'complete' | 'exp';

interface InfoRow {
  label: string;
  value: string;
  tag?: string;
}

const STATE_CONFIG: Record<ProcessingStatus, { label: string; color: string }> = {
  ing: { label: '의뢰중', color: colors.system100 },
  complete: { label: '의뢰완료', color: colors.green },
  exp: { label: '만료', color: colors.G500 },
};

export const ProcessingDetailScreen: React.FC<{ route?: { params?: { id?: string; status?: ProcessingStatus } } }> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const status: ProcessingStatus = route?.params?.status ?? 'ing';
  const stateInfo = STATE_CONFIG[status];

  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isSentQuoteVisible, setIsSentQuoteVisible] = useState(false);
  const [sentQuoteExpanded, setSentQuoteExpanded] = useState(false);

  const inquiryData = {
    state: stateInfo.label,
    date: '25.06.15',
    subject: '스마트기기 부품 임가공 문의',
    content: '임가공 문의드립니다. 확인 후 답변 부탁드립니다. ^^',
    images: [1, 2, 3],
  };

  const sentQuote: QuoteItem = {
    id: 'sent-1',
    title: '스마트기기 부품 임가공',
    state: 'used',
    contactName: '김샘플',
    phone: '010-1234-5678',
    priceLabel: '견적 금액',
    price: '1,000,000원',
    priceTag: '협의가능',
    manufacturer: '-',
    modelName: '-',
    manufactureDate: '-',
    location: '경기 안산',
    warrantyPeriod: '-',
    equipmentType: '완제품/위탁생산',
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
    { label: '프로젝트명', value: '스마트기기 부품 임가공 문의' },
    { label: '납기 희망일자', value: '미상' },
    { label: '제조 분류', value: '완제품/위탁생산' },
    { label: '제조 서비스', value: '기계/ 장비/ 생산설비/ 시스템' },
    { label: '제품 용도', value: '로봇/드론/IOT/스마트기기' },
    { label: '추정 예산', value: '1,000,000원', tag: '비공개' },
  ];

  const writerInfo: InfoRow[] = [
    { label: '담당자명', value: '홍길동' },
    { label: '휴대폰 번호', value: '010-1234-5678' },
  ];

  const renderInfoRow = (item: InfoRow, index: number, list: InfoRow[]) => (
    <View
      key={index}
      style={[
        s.infoRow,
        index < list.length - 1 && { marginBottom: 10 },
      ]}
    >
      <Text style={s.infoLabel}>{item.label}</Text>
      <View style={s.infoValueContainer}>
        <Text style={s.infoValue}>{item.value}</Text>
        {item.tag && <InfoTag text={item.tag} variant="red" />}
      </View>
    </View>
  );

  const renderImageGrid = () => (
    <View style={s.imageGrid}>
      {inquiryData.images.map((_, index) => (
        <View
          key={index}
          style={[
            s.imagePlaceholder,
            index < inquiryData.images.length - 1 && { marginRight: IMAGE_GAP },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <Header title="임가공 의뢰 상세" onBack={() => navigation.goBack()} />

      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.section}>
          <View style={s.inquiryHead}>
            <View style={s.headTopRow}>
              <Text style={[s.stateText, { color: stateInfo.color }]}>{inquiryData.state}</Text>
              <Text style={s.dateText}>{inquiryData.date}</Text>
            </View>
            <Text style={s.subjectText}>{inquiryData.subject}</Text>
          </View>

          <View style={s.infoSection}>
            <Text style={s.sectionTitle}>의뢰 내용</Text>
            {inquiryInfo.map((item, index) =>
              renderInfoRow(item, index, inquiryInfo),
            )}
          </View>

          <Text style={s.contentText}>{inquiryData.content}</Text>

          {renderImageGrid()}

          <View style={s.divider} />

          <View style={s.infoSection}>
            <Text style={s.sectionTitle}>작성자 정보</Text>
            {writerInfo.map((item, index) =>
              renderInfoRow(item, index, writerInfo),
            )}
          </View>
        </View>
      </ScrollView>

      {/* 하단 고정 바 */}
      <View style={s.bottomFloating}>
        {status === 'ing' && (
          <BottomButtonBar
            buttons={[
              { label: '보낸 견적 확인하기', variant: 'outline', onPress: () => setIsSentQuoteVisible(true) },
              { label: '견적 등록하기', onPress: () => navigation.navigate('ProcessingReplyWrite') },
            ]}
          />
        )}

        {status === 'complete' && (
          <>
            {isMoreVisible && (
              <View style={s.moreMenu}>
                <TouchableOpacity
                  style={s.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    navigation.navigate('ReceivedEstimate', { type: 'processing' });
                  }}
                >
                  <Text style={s.moreMenuText}>받은 견적 확인하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.moreMenuItem}
                  onPress={() => {
                    setIsMoreVisible(false);
                    navigation.navigate('ProcessingUpload', { mode: 'edit' });
                  }}
                >
                  <Text style={s.moreMenuText}>의뢰글 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.moreMenuItem}>
                  <Text style={s.moreMenuText}>삭제</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={s.bottomInner}>
              <TouchableOpacity
                style={s.completeButton}
                activeOpacity={0.8}
                onPress={() => setIsMoreVisible(false)}
              >
                <Text style={s.completeButtonText}>의뢰 완료</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.moreButton}
                onPress={() => setIsMoreVisible((prev) => !prev)}
                activeOpacity={0.7}
              >
                <Text style={s.moreButtonIcon}>•••</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {status === 'exp' && (
          <BottomButtonBar
            buttons={[
              { label: '받은 견적 확인하기', variant: 'outline', onPress: () => navigation.navigate('ReceivedEstimate', { type: 'processing' }) },
              { label: '재등록하기', onPress: () => navigation.navigate('ProcessingUpload') },
            ]}
          />
        )}
      </View>

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
        <View style={s.sentQuoteOverlay}>
          <View style={s.sentQuoteContainer}>
            <View style={s.sentQuoteHeader}>
              <Text style={s.sentQuoteTitle}>보낸 견적</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsSentQuoteVisible(false);
                  setSentQuoteExpanded(false);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={s.sentQuoteCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={s.sentQuoteBody}
              contentContainerStyle={s.sentQuoteBodyContent}
              showsVerticalScrollIndicator={false}
            >
              <QuoteCard
                item={sentQuote}
                expanded={sentQuoteExpanded}
                onExpand={() => setSentQuoteExpanded(true)}
                hideAction
              />
            </ScrollView>

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
                    navigation.navigate('ProcessingReplyWrite', { mode: 'edit' });
                  },
                },
              ]}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  section: { paddingHorizontal: PADDING_LR },
  inquiryHead: {
    paddingBottom: 20, marginBottom: 20,
    borderBottomWidth: 1, borderBottomColor: colors.G200,
  },
  headTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stateText: { fontSize: 14, fontWeight: '600' },
  dateText: { fontSize: 12, color: colors.G400, marginLeft: 'auto' },
  subjectText: { fontSize: 16, fontWeight: '600', color: colors.black, lineHeight: 22 },
  infoSection: {},
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.black, marginBottom: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start' },
  infoLabel: { width: 100, fontSize: 14, fontWeight: '500', color: colors.G400, lineHeight: 21 },
  infoValueContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  infoValue: { fontSize: 14, color: colors.G600, lineHeight: 21 },
  contentText: { fontSize: 14, color: colors.black, lineHeight: 20, paddingTop: 15, paddingBottom: 15 },
  imageGrid: { flexDirection: 'row' },
  imagePlaceholder: { width: IMAGE_SIZE, aspectRatio: 1, borderRadius: 4, backgroundColor: colors.G200 },
  divider: { height: 1, backgroundColor: colors.G200, marginTop: 20, marginBottom: 20 },
  bottomFloating: { position: 'relative' },
  bottomInner: {
    height: 90, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 8 },
    }),
  },
  completeButton: {
    flex: 1, height: 50, backgroundColor: colors.primary,
    borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  completeButtonText: { fontSize: 14, fontWeight: '500', color: colors.white },
  moreButton: {
    width: 50, height: 50, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.G300, borderRadius: 4,
    justifyContent: 'center', alignItems: 'center',
  },
  moreButtonIcon: { fontSize: 19, fontWeight: '600', color: colors.black, letterSpacing: 2 },
  moreMenu: {
    position: 'absolute', bottom: 85, right: 15, left: 15,
    backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6, paddingVertical: 8, paddingHorizontal: 15, zIndex: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
      android: { elevation: 4 },
    }),
  },
  moreMenuItem: { height: 36, justifyContent: 'center', alignItems: 'center' },
  moreMenuText: { fontSize: 14, fontWeight: '500', color: colors.black },
  sentQuoteOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 40,
  },
  sentQuoteContainer: {
    width: '100%', maxHeight: '100%', backgroundColor: colors.white, borderRadius: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 9 },
      android: { elevation: 10 },
    }),
  },
  sentQuoteHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 22, paddingTop: 22, paddingBottom: 15,
  },
  sentQuoteTitle: { fontSize: 16, fontWeight: '600', color: colors.black },
  sentQuoteCloseIcon: { fontSize: 14, fontWeight: '400', color: colors.black },
  sentQuoteBody: { paddingHorizontal: 22, flexGrow: 0, flexShrink: 1 },
  sentQuoteBodyContent: { paddingBottom: 10 },
});

