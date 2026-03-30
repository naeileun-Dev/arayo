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

export interface FabSpeedDialItem {
  label: string;
  icon: React.ReactNode;
  navigateTo: string;
}

interface Props {
  title: string;
  tabs?: string[];
  fabLabel: string;
  fabNavigateTo: string;
  detailNavigateTo: string;
  sampleData: InquiryListItemData[];
  hideBanner?: boolean;
  hideSort?: boolean;
  hideSearch?: boolean;
  hideFab?: boolean;
  fabSpeedDial?: FabSpeedDialItem[];
}

export const InquiryListScreen: React.FC<Props> = ({
  title,
  tabs,
  fabLabel,
  fabNavigateTo,
  detailNavigateTo,
  sampleData,
  hideBanner = false,
  hideSort = false,
  hideSearch = false,
  hideFab = false,
  fabSpeedDial,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(tabs?.[0] ?? '전체');
  const [sortType] = useState<InquirySortType>('최신순');
  const [isLoadingMore] = useState(true);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

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
        onSearch={hideSearch ? undefined : () => navigation.navigate('Search')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!hideBanner && (
          <View style={styles.bannerWrapper}>
            <View style={styles.bannerImage} />
          </View>
        )}

        {hideSort ? (
          <InquiryTabSort
            tabs={tabs}
            activeTab={activeTab}
            sortType={sortType}
            onTabChange={handleTabChange}
            onSortPress={() => {}}
            hideSortDropdown
          />
        ) : (
          <InquiryTabSort
            tabs={tabs}
            activeTab={activeTab}
            sortType={sortType}
            onTabChange={handleTabChange}
            onSortPress={() => {}}
          />
        )}

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

      {!hideFab && fabSpeedDial ? (
        <View style={styles.speedDialContainer} pointerEvents="box-none">
          {speedDialOpen && (
            <>
              {fabSpeedDial.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.speedDialItem}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSpeedDialOpen(false);
                    (navigation as any).navigate(item.navigateTo);
                  }}
                >
                  <View style={styles.speedDialCircle}>
                    <View style={styles.speedDialIcon}>{item.icon}</View>
                    <Text style={styles.speedDialLabel}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
          <TouchableOpacity
            style={[styles.fabCircle, speedDialOpen && styles.fabCircleOpen]}
            activeOpacity={0.85}
            onPress={() => setSpeedDialOpen(v => !v)}
          >
            <Text style={styles.fabCirclePlus}>{speedDialOpen ? '×' : '+'}</Text>
          </TouchableOpacity>
        </View>
      ) : !hideFab ? (
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={() => (navigation as any).navigate(fabNavigateTo)}
        >
          <Text style={styles.fabPlus}>+</Text>
          <Text style={styles.fabLabel}>{fabLabel}</Text>
        </TouchableOpacity>
      ) : null}
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
  listContainer: {
    flex: 0,
  },
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

  speedDialContainer: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    alignItems: 'center',
    zIndex: 10,
  },
  fabCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
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
  fabCircleOpen: {
    backgroundColor: '#DB0025',
  },
  fabCirclePlus: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    lineHeight: 34,
    includeFontPadding: false,
  },
  speedDialItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  speedDialCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  speedDialIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedDialLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1B1B1B',
  },
});

