import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import NotificationItem from './components/NotificationItem';

const MoreVerticalIcon = () => (
  <View style={styles.moreIconContainer}>
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
  </View>
);

const INITIAL_NOTIS = Array(6).fill(null).map((_, index) => ({
  id: String(index + 1),
  subject: '아라요 기계장터',
  message: '거래가 정상적으로 완료되었습니다.',
  date: '11월 27일',
}));

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  
  // 알림 목록 상태
  const [notifications, setNotifications] = useState(INITIAL_NOTIS);
  // 선택된 체크박스 상태 관리 (id 배열)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // 헤더 우측 '더보기(삭제)' 메뉴 열림 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 체크박스 토글 핸들러
  const toggleCheck = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 선택 삭제 핸들러
  const handleDeleteSelected = () => {
    setNotifications(prev => prev.filter(noti => !selectedIds.includes(noti.id)));
    setSelectedIds([]);
    setIsMenuOpen(false);
  };

  // 전체 삭제 핸들러
  const handleDeleteAll = () => {
    setNotifications([]);
    setSelectedIds([]);
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. 헤더 영역 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>알림</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreVerticalIcon />
          </TouchableOpacity>

          {/* 더보기 토글 메뉴 (전체 삭제 / 삭제) */}
          {isMenuOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleDeleteAll}>
                <Text style={styles.dropdownText}>전체 삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleDeleteSelected}>
                <Text style={styles.dropdownText}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* 2. 본문 영역 (알림 리스트) */}
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={1} 
        onPress={() => setIsMenuOpen(false)} // 여백 클릭 시 더보기 메뉴 닫힘
      >
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length > 0 ? (
            <View style={styles.notiList}>
              {notifications.map((noti) => (
                <NotificationItem
                  key={noti.id}
                  id={noti.id}
                  subject={noti.subject}
                  message={noti.message}
                  date={noti.date}
                  isChecked={selectedIds.includes(noti.id)}
                  onToggleCheck={toggleCheck}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>알림이 없습니다.</Text>
            </View>
          )}
        </ScrollView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- 스타일 시트 ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // 헤더 스타일
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    zIndex: 10, // 드롭다운 메뉴가 리스트 위로 올라오도록 설정
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
    width: 40,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
    position: 'relative',
  },
  moreButton: {
    padding: spacing.xs,
  },
  moreIconContainer: {
    flexDirection: 'column',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  moreIconDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dropdownText: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  
  // 리스트 컨테이너
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing['4xl'],
  },
  notiList: {
    flexDirection: 'column',
  },

  // 알림 없을 때
  emptyContainer: {
    paddingTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
  },
});