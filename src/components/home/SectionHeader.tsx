/**
 * 섹션 헤더 컴포넌트
 * 홈 화면의 각 섹션 타이틀 + 더보기
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import type { SectionHeaderProps } from '../../types';

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onMore,
  moreText = '더보기 >',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {onMore && (
        <TouchableOpacity
          onPress={onMore}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.moreText}>{moreText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  titleArea: {
    flex: 1,
  },
  title: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textTertiary,
    marginTop: 2,
  },
  moreText: {
    ...typography.bodySmall,
    color: colors.textTertiary,
  },
});

export default SectionHeader;
