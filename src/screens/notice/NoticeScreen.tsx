import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';

// 안드로이드에서 LayoutAnimation 활성화
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

// Mock Data
const MOCK_NOTICES: NoticeItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  title: '[서비스 점검 안내]\n12월 18일(수) 새벽 시스템 점검',
  date: '2024.01.01',
  content: `안정적인 서비스 제공을 위해 시스템 점검이 진행될 예정입니다.

• 점검 일시: 12월 18일(수) 01:00 ~ 04:00
• 점검 내용: 서버 안정화 및 성능 개선
• 영향 범위: 점검 시간 중 서비스 이용 일시 중단

이용에 불편을 드려 죄송하며, 더 나은 서비스로 보답하겠습니다.`,
}));

interface NoticeScreenProps {
  notices?: NoticeItem[];
  isLoading?: boolean;
}

export const NoticeScreen: React.FC<NoticeScreenProps> = ({
  notices = MOCK_NOTICES,
  isLoading = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [expandedId, setExpandedId] = useState<string | null>(notices[0]?.id || null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공지사항</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 섹션 타이틀 */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>공지사항</Text>
          <Text style={styles.sectionDesc}>
            아라요 기계장터의 최신 소식과 주요 공지를 한눈에 확인하세요.
          </Text>
        </View>

        {/* 공지사항 리스트 */}
        <View style={styles.noticeList}>
          {notices.map((notice) => {
            const isExpanded = expandedId === notice.id;
            return (
              <View key={notice.id} style={styles.noticeItem}>
                <TouchableOpacity
                  style={styles.noticeHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(notice.id)}
                >
                  <View style={styles.noticeHeaderLeft}>
                    <Text style={[styles.noticeTitle, isExpanded && styles.noticeTitleActive]}>
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

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G600,
    lineHeight: 20,
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
});

