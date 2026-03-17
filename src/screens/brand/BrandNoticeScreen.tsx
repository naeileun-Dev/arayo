import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';
import PhoneIcon from '../../assets/icon/phone.svg';
import { BrandHeader } from './components/BrandHeader';
import type { RootStackParamList } from '../../types';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PADDING_LR = 20;

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

const MOCK_NOTICES: NoticeItem[] = [
  {
    id: '1',
    title: '영업시간 변경 안내',
    date: '2024.01.01',
    content: `2026년부터 영업시간이 변경되었습니다.
• 기존 = 9:00AM ~ 6:00PM
• 변경 = 10:00AM ~ 7:00PM`,
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 2),
    title: '스마트 기계의 공지사항',
    date: '2024.01.01',
    content: '공지사항 내용이 들어갑니다. 자세한 내용은 상세 페이지에서 확인해 주세요.',
  })),
];

export const BrandNoticeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandNotice'>>();
  const brandId = route.params?.brandId || '1';

  const [expandedId, setExpandedId] = useState<string | null>(MOCK_NOTICES[0]?.id || null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} currentPage="notice" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>공지사항</Text>
          <Text style={styles.sectionTitleEn}>Announcement</Text>
        </View>

        {/* Notice List */}
        <View style={styles.noticeList}>
          {MOCK_NOTICES.map((notice) => {
            const isExpanded = expandedId === notice.id;
            return (
              <View key={notice.id} style={styles.noticeItem}>
                <TouchableOpacity
                  style={styles.noticeHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(notice.id)}
                >
                  <View style={styles.noticeHeaderLeft}>
                    <Text
                      style={[styles.noticeTitle, isExpanded && styles.noticeTitleActive]}
                      numberOfLines={isExpanded ? undefined : 1}
                    >
                      {notice.title}
                    </Text>
                  </View>
                  <View style={styles.noticeHeaderRight}>
                    <Text style={styles.noticeDate}>{notice.date}</Text>
                    {isExpanded ? (
                      <ChevronUpIcon width={18} height={18} color={colors.black} />
                    ) : (
                      <ChevronDownIcon width={18} height={18} color={colors.black} />
                    )}
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.noticeBody}>
                    <View style={styles.noticeContent}>
                      <Text style={styles.noticeContentText}>{notice.content}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

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
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingHorizontal: PADDING_LR,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  sectionTitleEn: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G400,
  },
  noticeList: {
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  noticeItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: PADDING_LR,
    paddingVertical: 16,
  },
  noticeHeaderLeft: {
    flex: 1,
    paddingRight: 16,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    lineHeight: 22,
  },
  noticeTitleActive: {
    fontWeight: '600',
  },
  noticeHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noticeDate: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.G500,
  },
  noticeBody: {
    paddingHorizontal: PADDING_LR,
    paddingBottom: 16,
  },
  noticeContent: {
    backgroundColor: colors.G100,
    padding: 16,
    borderRadius: 4,
  },
  noticeContentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G700,
    lineHeight: 22,
  },
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G500,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: PADDING_LR,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});

