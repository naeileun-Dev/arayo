import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { CompareCard, CompareItem } from './components/CompareCard';
import type { RootStackParamList } from '../../types';

type CompareProductsRouteProp = RouteProp<RootStackParamList, 'CompareProducts'>;

// ─────────────────────────────────────────────────
// Default Mock Data
// ─────────────────────────────────────────────────
const createDefaultCompareItem = (id: string): CompareItem => ({
  id,
  companyName: '아라요 기계장터',
  state: 'used',
  contactName: '김샘플',
  phone: '010-1234-5678',
  price: '40,500,000원',
  priceTag: '협의가능',
  manufacturer: '화천기계',
  modelName: 'CS-3020H',
  manufactureDate: '2006년 07월',
  location: '경기 안산',
  warrantyPeriod: '2006년 07월',
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

const DEFAULT_ITEMS: CompareItem[] = [
  createDefaultCompareItem('1'),
  createDefaultCompareItem('2'),
  createDefaultCompareItem('3'),
  createDefaultCompareItem('4'),
  createDefaultCompareItem('5'),
  createDefaultCompareItem('6'),
];

// ─────────────────────────────────────────────────
// Main Screen Component
// ─────────────────────────────────────────────────
interface CompareProductsScreenProps {
  items?: CompareItem[];
  onChat?: (itemId: string) => void;
  onCall?: (itemId: string) => void;
  onMessage?: (itemId: string) => void;
}

export const CompareProductsScreen: React.FC<CompareProductsScreenProps> = ({
  items = DEFAULT_ITEMS,
  onChat,
  onCall,
  onMessage,
}) => {
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>비교하기 ({items.length})</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <CompareCard
            key={item.id}
            item={item}
            expanded={!!expandMap[item.id]}
            onExpand={() => toggleExpand(item.id)}
            contactOpen={!!contactMap[item.id]}
            onToggleContact={() => toggleContact(item.id)}
            onChat={() => onChat?.(item.id)}
            onCall={() => onCall?.(item.id)}
            onMessage={() => onMessage?.(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  closeBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '300',
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 25,
  },
});

