/**
 * 카테고리 칩 컴포넌트
 * 가로 스크롤 필터 칩 (전체, CNC선반, 머시닝센터 등)
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import type { CategoryChipsProps, CategoryChip } from '../../types';

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  activeId,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect?.(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default CategoryChips;
