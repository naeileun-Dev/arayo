import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 프로젝트 아이콘 (없을 경우를 대비해 아래에 CheckIcon 직접 구현)
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';

// 스타일 시스템 (프로젝트 환경에 맞춤)
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

// --- 아이콘 컴포넌트 ---
// 1. 헤더 우측 더보기(세로 점 3개) 아이콘
const MoreVerticalIcon = () => (
  <View style={styles.moreIconContainer}>
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
  </View>
);

// 2. 체크박스 내부 체크 마크 (일반적인 체크 아이콘)
const CheckIcon = ({ color, size = 14 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.6,
        height: size * 0.35,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '-45deg' }, { translateY: -1 }],
      }}
    />
  </View>
);

// --- 알림 목업 데이터 (alram.html 내용 반영) ---
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
              {notifications.map((noti) => {
                const isChecked = selectedIds.includes(noti.id);

                return (
                  <View key={noti.id} style={styles.item}>
                    {/* 2-1. 체크박스 */}
                    <TouchableOpacity 
                      style={[styles.checkboxWrap, isChecked && styles.checkboxWrapChecked]}
                      onPress={() => toggleCheck(noti.id)}
                      activeOpacity={0.8}
                    >
                      {isChecked && <CheckIcon color={colors.white} />}
                    </TouchableOpacity>

                    {/* 2-2. 썸네일 이미지 */}
                    <View style={styles.thumb}>
                      <Image source={require('../../assets/images/profileImg.png')} style={styles.thumbImage} />
                    </View>

                    {/* 2-3. 제목 및 내용 */}
                    <View style={styles.con}>
                      <Text style={styles.subject}>{noti.subject}</Text>
                      <Text style={styles.msg} numberOfLines={1} ellipsizeMode="tail">
                        {noti.message}
                      </Text>
                    </View>

                    {/* 2-4. 날짜 (우측 중간) */}
                    <View style={styles.dateWrap}>
                      <Text style={styles.date}>{noti.date}</Text>
                    </View>
                  </View>
                );
              })}
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
  
  // 개별 리스트 아이템 (HTML의 .item과 동일)
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  
  // 체크박스 (HTML의 .checkbox-wrap)
  checkboxWrap: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: colors.white,
  },
  checkboxWrapChecked: {
    backgroundColor: colors.primary, // 체크 시 브랜드 컬러
    borderColor: colors.primary,
  },
  
  // 썸네일 (HTML의 .thumb)
  thumb: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // HTML의 data-radius="12" 반영
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: colors.backgroundGray,
  },
  
  // 내용 (HTML의 .con)
  con: {
    flex: 1,
    justifyContent: 'center',
  },
  subject: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 6,
  },
  dateWrap: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  date: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  msg: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.textPrimary,
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