import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import type { RootStackParamList } from '../../types';

const TABS = ['전체', '답변 완료', '답변 대기'];

interface InquiryItem {
  id: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'completed';
  answer?: string;
  answerDate?: string;
}

// Mock Data
const MOCK_INQUIRIES: InquiryItem[] = [
  {
    id: '1',
    title: '알림이 오지 않는 것 같아요',
    content: '안녕하세요.\n문의 답변이 왔다고 알림이 뜨는데, 실제로 메시지가 보이지 않습니다.\n확인해 주실 수 있을까요?',
    date: '25.06.15',
    status: 'pending',
  },
  {
    id: '2',
    title: '이미지 업로드 오류 문의드립니다',
    content: '상품 등록 중 이미지 업로드가 되지 않아 문의드립니다.\n파일 용량은 제한 내인데도 오류가 발생합니다.\n확인 부탁드립니다.',
    date: '25.06.15',
    status: 'completed',
    answer: `안녕하세요, 아라요 기계장터입니다.
이용 중 불편을 드려 죄송합니다.

말씀해 주신 이미지 업로드 오류는 사용 환경이나 파일 형식에 따라 간헐적으로 발생할 수 있습니다. 먼저 이미지 파일이 JPG 또는 PNG 형식이며, 파일 용량이 100MB 이하인지 다시 한 번 확인 부탁드립니다.

이후에도 동일한 문제가 발생한다면,
사용 중인 기기(PC/모바일)와 브라우저 또는 앱 버전,
그리고 오류가 발생한 화면 캡처를 함께 보내주시면 빠르게 확인해 드리겠습니다.

확인되는 대로 최대한 빠르게 도와드리겠습니다.
감사합니다.`,
    answerDate: '25.06.15',
  },
  {
    id: '3',
    title: '알림이 오지 않는 것 같아요',
    content: '안녕하세요.\n문의 답변이 왔다고 알림이 뜨는데, 실제로 메시지가 보이지 않습니다.\n확인해 주실 수 있을까요?',
    date: '25.06.15',
    status: 'pending',
  },
];

interface InquiryListScreenProps {
  inquiries?: InquiryItem[];
  isLoading?: boolean;
}

export const InquiryListScreen: React.FC<InquiryListScreenProps> = ({
  inquiries = MOCK_INQUIRIES,
  isLoading = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(0);

  const filteredInquiries = inquiries.filter((item) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return item.status === 'completed';
    if (activeTab === 2) return item.status === 'pending';
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1:1 문의</Text>
        <View style={styles.iconButton} />
      </View>

      {/* 탭 */}
      <View style={styles.tabContainer}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === index && styles.tabItemActive]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 문의 목록 */}
        <View style={styles.inquiryList}>
          {filteredInquiries.map((item) => (
            <View key={item.id} style={styles.inquiryItem}>
              {/* 질문 */}
              <View style={styles.questionSection}>
                <View style={styles.questionHeader}>
                  <Text style={styles.qMark}>Q.</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      item.status === 'completed' ? styles.statusCompleted : styles.statusPending,
                    ]}
                  >
                    {item.status === 'completed' ? '답변 완료' : '답변 대기'}
                  </Text>
                </View>
                <Text style={styles.questionTitle}>{item.title}</Text>
                <Text style={styles.questionContent}>{item.content}</Text>
                <Text style={styles.questionDate}>{item.date}</Text>
              </View>

              {/* 답변 */}
              {item.status === 'completed' && item.answer && (
                <View style={styles.answerSection}>
                  <Text style={styles.answerContent}>{item.answer}</Text>
                  <Text style={styles.answerDate}>{item.answerDate}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G500,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  inquiryList: {
    paddingTop: 10,
  },
  inquiryItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  questionSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  qMark: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusCompleted: {
    color: colors.primary,
  },
  statusPending: {
    color: colors.G500,
  },
  questionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  questionContent: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G700,
    lineHeight: 22,
    marginBottom: 8,
  },
  questionDate: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.G500,
  },
  answerSection: {
    backgroundColor: colors.G100,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 4,
  },
  answerContent: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G700,
    lineHeight: 22,
    marginBottom: 8,
  },
  answerDate: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.G500,
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
  bottomSpacer: {
    height: 40,
  },
});

