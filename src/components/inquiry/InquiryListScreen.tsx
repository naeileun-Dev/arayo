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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors } from '../../styles/colors';
import CurveArrowIcon from '../../assets/icon/curve_arrow.svg';
import { InquiryListItemData, InquirySortType } from './types';
import { InquiryHeader } from './InquiryHeader';
import { InquiryTabSort } from './InquiryTabSort';
import { InquiryListItem } from './InquiryListItem';

interface Props {
  title: string;
  tabs?: string[];
  fabLabel: string;
  fabNavigateTo: string;
  detailNavigateTo: string;
  sampleData: InquiryListItemData[];
}

export const InquiryListScreen: React.FC<Props> = ({
  title,
  tabs,
  fabLabel,
  fabNavigateTo,
  detailNavigateTo,
  sampleData,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('전체');
  const [sortType] = useState<InquirySortType>('최신순');
  const [isLoadingMore] = useState(true);

  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  const handleItemPress = useCallback((id: string) => {
    const found = sampleData.find((d) => d.id === id);
    (navigation as any).navigate(detailNavigateTo, { id, status: found?.status ?? 'ing' });
  }, [navigation, detailNavigateTo, sampleData]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <InquiryHeader
        title={title}
        onBack={() => navigation.goBack()}
        onSearch={() => navigation.navigate('Search')}
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
        <InquiryTabSort
          tabs={tabs}
          activeTab={activeTab}
          sortType={sortType}
          onTabChange={handleTabChange}
          onSortPress={() => {}}
        />

        {/* 목록 */}
        <View style={styles.listContainer}>
          {sampleData.map((item, index) => (
            <InquiryListItem
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
        onPress={() => (navigation as any).navigate(fabNavigateTo)}
      >
        <Text style={styles.fabPlus}>+</Text>
        <Text style={styles.fabLabel}>{fabLabel}</Text>
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
  listContainer: {},
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

