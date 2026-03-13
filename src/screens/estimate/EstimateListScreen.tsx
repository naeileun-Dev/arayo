import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import CurveArrowIcon from '../../assets/icon/curve_arrow.svg';
import { EstimateListItemData, TabType, SortType } from './types';
import EstimateHeader from './components/EstimateHeader';
import EstimateTabSort from './components/EstimateTabSort';
import EstimateListItem from './components/EstimateListItem';

// ─────────────────────────────────────────────────
// Sample Data
// ─────────────────────────────────────────────────
const SAMPLE_DATA: EstimateListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '요청중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '5',
    status: 'ing',
    statusLabel: '요청중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '요청중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '11',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '12',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
];

// ─────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────
const EstimateListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('전체');
  const [sortType] = useState<SortType>('최신순');
  const [isLoadingMore] = useState(true);

  const handleTabChange = useCallback((tab: TabType) => setActiveTab(tab), []);

  const handleItemPress = useCallback((id: string) => {
    (navigation as any).navigate('EstimateDetail', { id });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <EstimateHeader
        onBack={() => navigation.goBack()}
        onSearch={() => (navigation as any).navigate('Search')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 배너 */}
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerImage} />
        </View>

        {/* 탭 + 정렬 */}
        <EstimateTabSort
          activeTab={activeTab}
          sortType={sortType}
          onTabChange={handleTabChange}
          onSortPress={() => {}}
        />

        {/* 견적 목록 */}
        <View style={styles.estimateList}>
          {SAMPLE_DATA.map((item, index) => (
            <EstimateListItem
              key={item.id}
              item={item}
              isFirst={index === 0}
              onPress={handleItemPress}
              subRowIcon={<CurveArrowIcon width={16} height={16} color={colors.G600} />}
            />
          ))}
        </View>

        {isLoadingMore && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingLabel}>목록을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 플로팅 버튼 */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => (navigation as any).navigate('EstimateUpload')}
      >
        <Text style={styles.fabPlus}>+</Text>
        <Text style={styles.fabLabel}>견적문의</Text>
      </TouchableOpacity>
    </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bottomSpacer: {
    height: 100,
  },
  bannerWrapper: {
    marginTop: 10,
    marginBottom: 25,
  },
  bannerImage: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    backgroundColor: colors.G200,
  },
  estimateList: {},
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 15,
  },
  loadingLabel: {
    fontSize: 14,
    color: colors.G500,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 40,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
    }),
  },
  fabPlus: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.white,
    marginRight: 7,
  },
  fabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
});

export default EstimateListScreen;
