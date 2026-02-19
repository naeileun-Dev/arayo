import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 사용할 아이콘들 (프로젝트 경로에 맞게 가져옵니다)
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import SearchIcon from '../../assets/icon/Search.svg';

// 스타일 시스템
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

// HTML을 기반으로 한 초기 데이터 구성
const INITIAL_RECENT_SEARCHES = ['집진기', '공작기계', '산업용 로봇', '판금', '물류자동화', '3D 프린터', '스마트팩토리', '전기 드릴', '측정기기'];
const RECOMMENDED_SEARCHES = ['집진기', '공작기계', '산업용 로봇', '판금', '물류자동화', '3D 프린터', '스마트팩토리', '전기 드릴', '측정기기'];
const POPULAR_SEARCHES = ['중고기계', '공구', '부품', '구인/구직', '기타', '집진기', '산업용 로봇', '판금', '스마트팩토리', '3D 프린트'];

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  // 검색 실행 (엔터 키 또는 검색 아이콘 클릭 시)
  const handleSearch = () => {
    if (searchText.trim().length < 2) {
      Alert.alert('알림', '검색어는 두글자 이상 입력하십시오.');
      return;
    }
    console.log('검색 실행:', searchText);
    // TODO: 검색 결과 화면으로 이동 로직 추가
  };

  // 최근 검색어 모두 삭제
  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  // 태그(칩) 렌더링 - 가로 스크롤
  const renderTags = (tags: string[], isRecent: boolean = false) => {
    if (isRecent && tags.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>최근 검색어가 없습니다.</Text>
        </View>
      );
    }
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagScrollContainer}
      >
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => setSearchText(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. 커스텀 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>검색</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. 검색 입력 필드 */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력해 주세요..."
              placeholderTextColor={colors.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <SearchIcon width={20} height={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. 최근 검색어 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 검색어</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={handleClearRecent}>
                <Text style={styles.clearText}>모두 삭제</Text>
              </TouchableOpacity>
            )}
          </View>
          {renderTags(recentSearches, true)}
        </View>

        {/* 4. 추천 검색어 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>추천 검색어</Text>
          </View>
          {renderTags(RECOMMENDED_SEARCHES)}
        </View>

        {/* 5. 인기 검색어 */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>인기 검색어</Text>
          </View>
          <View style={styles.popularContainer}>
            {POPULAR_SEARCHES.map((keyword, index) => (
              <TouchableOpacity key={index} style={styles.popularItem}>
                <Text style={[styles.popularIndex, index < 3 && styles.popularIndexRed]}>
                  {index + 1}.
                </Text>
                <Text style={styles.popularText}>{keyword}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 0,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 24, // backButton과 동일한 너비를 주어 중앙 정렬 보정
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing['2xl'],
  },
  searchSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    height: '100%',
    padding: 0, // 안드로이드 기본 패딩 제거
  },
  searchButton: {
    padding: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  lastSection: {
    marginBottom: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  clearText: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  tagScrollContainer: {
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  tag: {
    backgroundColor: colors.backgroundGray,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  emptyContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
  },
  popularContainer: {
    gap: 8,
    paddingHorizontal: spacing.md,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.G100,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  popularIndex: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
    width: 28,
  },
  popularIndexRed: {
    color: colors.primary,
  },
  popularText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
});
