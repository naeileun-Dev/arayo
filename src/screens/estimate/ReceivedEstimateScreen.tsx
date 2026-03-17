import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { QuoteCard } from './components/QuoteCard';
import { QuoteItem } from './components/quoteTypes';
import type { RootStackParamList } from '../../types';

type QuoteType = 'estimate' | 'processing' | 'scrap';

const createDefaultQuote = (id: string): QuoteItem => ({
  id,
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
    '문의 주신 스마트기기 부품 임가공 건에 대해\n아래와 같이 검토 결과를 안내드립니다.\n\n요청하신 제품 용도(로봇·드론·IoT·스마트기기)와\n가공 조건을 기준으로 소재 특성, 정밀도 요구 수준,\n생산 수량 등을 종합적으로 확인하였으며,\n당사 보유 설비 및 가공 공정을 통해 안정적인 제작이 가능하다고 판단됩니다.',
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
});

const DEFAULT_QUOTES: QuoteItem[] = [
  createDefaultQuote('1'),
  createDefaultQuote('2'),
  createDefaultQuote('3'),
];

const createScrapQuote = (id: string, contactName: string, phone: string, price: string, priceTag: string | undefined, description: string): QuoteItem => ({
  id,
  title: '',
  state: 'used',
  contactName,
  phone,
  priceLabel: '견적 금액',
  price,
  priceTag,
  manufacturer: '',
  modelName: '',
  manufactureDate: '',
  location: '',
  warrantyPeriod: '',
  equipmentType: '',
  description,
  services: [],
});

const SCRAP_QUOTES: QuoteItem[] = [
  createScrapQuote('1', '김샘플', '010-1234-5678', '500,000원', '협의가능', '문의 주신 고철 처리 건에 대해 아래와 같이 검토 결과를 안내드립니다.\n당사 차량으로 수거 가능하며, 현장 확인 후 최종 금액 조정 가능합니다.'),
  createScrapQuote('2', '홍길동', '010-9876-5432', '450,000원', undefined, '고철 매입 가능합니다. 수거 일정 협의 후 진행하겠습니다.'),
];

const createProcessingQuote = (id: string, contactName: string, phone: string, price: string, priceTag: string | undefined, description: string, services: QuoteItem['services']): QuoteItem => ({
  id,
  title: '',
  state: 'used',
  contactName,
  phone,
  priceLabel: '견적 금액',
  price,
  priceTag,
  manufacturer: '',
  modelName: '',
  manufactureDate: '',
  location: '',
  warrantyPeriod: '',
  equipmentType: '',
  description,
  services,
});

const PROCESSING_QUOTES: QuoteItem[] = [
  createProcessingQuote('1', '김샘플', '010-1234-5678', '1,000,000원', '협의가능', '문의 주신 스마트기기 부품 임가공 건에 대해 아래와 같이 검토 결과를 안내드립니다.\n요청하신 제품 용도와 가공 조건을 기준으로 소재 특성, 정밀도 요구 수준을 확인하였습니다.', [
    { key: 'sangchado', label: '상차도', isActive: true },
    { key: 'dochakdo', label: '도착도', isActive: false },
    { key: 'install', label: '설치', isActive: false },
    { key: 'testdrive', label: '시운전/교육', isActive: true },
    { key: 'inspection', label: '점검완료', isActive: false },
    { key: 'installment', label: '할부 가능', isActive: false },
    { key: 'nego', label: '네고 가능', isActive: true },
    { key: 'taxinvoice', label: '세금계산서 발행', isActive: true },
  ]),
  createProcessingQuote('2', '홍길동', '010-9876-5432', '850,000원', undefined, '임가공 가능합니다. 납기 일정 협의 후 진행하겠습니다.', [
    { key: 'sangchado', label: '상차도', isActive: true },
    { key: 'dochakdo', label: '도착도', isActive: true },
    { key: 'install', label: '설치', isActive: false },
    { key: 'testdrive', label: '시운전/교육', isActive: false },
    { key: 'inspection', label: '점검완료', isActive: true },
    { key: 'installment', label: '할부 가능', isActive: false },
    { key: 'nego', label: '네고 가능', isActive: false },
    { key: 'taxinvoice', label: '세금계산서 발행', isActive: true },
  ]),
];

export const ReceivedEstimateScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ReceivedEstimate'>>();
  const type: QuoteType = route.params?.type ?? 'estimate';

  const [expandMap, setExpandMap] = useState<Record<string, boolean>>({});
  const [contactMap, setContactMap] = useState<Record<string, boolean>>({});

  const toggleExpand = useCallback(
    (id: string) => setExpandMap((p) => ({ ...p, [id]: !p[id] })),
    [],
  );
  const toggleContact = useCallback(
    (id: string) => setContactMap((p) => ({ ...p, [id]: !p[id] })),
    [],
  );

  const getTitle = () => {
    if (type === 'scrap') return `받은 견적 (${SCRAP_QUOTES.length})`;
    if (type === 'processing') return `받은 견적 (${PROCESSING_QUOTES.length})`;
    return `받은견적 (${DEFAULT_QUOTES.length})`;
  };

  const renderContent = () => {
    if (type === 'scrap') {
      return SCRAP_QUOTES.map((q) => (
        <QuoteCard
          key={q.id}
          item={q}
          variant="scrap"
          expanded={!!expandMap[q.id]}
          onExpand={() => toggleExpand(q.id)}
          contactOpen={!!contactMap[q.id]}
          onToggleContact={() => toggleContact(q.id)}
        />
      ));
    }

    if (type === 'processing') {
      return PROCESSING_QUOTES.map((q) => (
        <QuoteCard
          key={q.id}
          item={q}
          variant="processing"
          expanded={!!expandMap[q.id]}
          onExpand={() => toggleExpand(q.id)}
          contactOpen={!!contactMap[q.id]}
          onToggleContact={() => toggleContact(q.id)}
        />
      ));
    }

    return DEFAULT_QUOTES.map((q) => (
      <QuoteCard
        key={q.id}
        item={q}
        expanded={!!expandMap[q.id]}
        onExpand={() => toggleExpand(q.id)}
        contactOpen={!!contactMap[q.id]}
        onToggleContact={() => toggleContact(q.id)}
      />
    ));
  };

  return (
    <View style={styles.root}>
      <Header
        title={getTitle()}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { flex: 1 },
  scrollInner: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
});

