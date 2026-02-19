/**
 * 추천 기업 카드 컴포넌트
 * 홈 화면 추천 기업 섹션의 가로 스크롤 카드
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import LayoutGridIcon from '../../assets/icon/layout-grid.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius, shadows } from '../../styles/spacing';
import type { CompanyCardProps, RecommendedCompany } from '../../types';

// 개별 카드
const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress?.(company)}
      activeOpacity={0.8}
    >
      {/* 이미지 플레이스홀더 */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <LayoutGridIcon width={36} height={36} color={colors.textTertiary} />
        </View>
        {company.isAd && (
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>AD</Text>
          </View>
        )}
        {company.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{company.badge}</Text>
          </View>
        )}
      </View>

      {/* 기업명 */}
      <Text style={styles.companyName} numberOfLines={1}>
        {company.name}
      </Text>
    </TouchableOpacity>
  );
};

// 추천 기업 가로 스크롤 리스트
interface CompanyListProps {
  companies: RecommendedCompany[];
  onPress?: (company: RecommendedCompany) => void;
}

export const CompanyCardList: React.FC<CompanyListProps> = ({
  companies,
  onPress,
}) => {
  return (
    <FlatList
      data={companies}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CompanyCard company={item} onPress={onPress} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  separator: {
    width: spacing.md,
  },
  card: {
    width: 140,
    alignItems: 'center',
  },
  imageContainer: {
    width: 140,
    height: 100,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.backgroundGray,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  adBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
  },
  adBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
  },
  companyName: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default CompanyCard;
