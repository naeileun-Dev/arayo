/**
 * 약관 동의 아이템 컴포넌트
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Checkbox from '../common/Checkbox';
import type { AgreementItemProps } from '../../types';

const AgreementItem: React.FC<AgreementItemProps> = ({
  checked,
  onToggle,
  label,
  required = false,
  onViewDetail,
  isAllAgree = false,
  style,
}) => {
  if (isAllAgree) {
    return (
      <TouchableOpacity
        style={[styles.allAgreeContainer, style]}
        onPress={() => onToggle(!checked)}
        activeOpacity={0.7}
      >
        <Checkbox checked={checked} onToggle={onToggle} />
        <Text style={styles.allAgreeLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.checkboxArea}
        onPress={() => onToggle(!checked)}
        activeOpacity={0.7}
      >
        <Checkbox checked={checked} onToggle={onToggle} size="small" />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>(필수)</Text>}
          {!required && <Text style={styles.optional}>(선택)</Text>}
        </View>
      </TouchableOpacity>

      {onViewDetail && (
        <TouchableOpacity
          style={styles.detailButton}
          onPress={onViewDetail}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.detailText}>보기</Text>
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
    paddingVertical: spacing.sm,
  },
  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
    flex: 1,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
  },
  required: {
    ...typography.body,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  optional: {
    ...typography.body,
    color: colors.textTertiary,
    marginLeft: spacing.xs,
  },
  detailButton: {
    paddingHorizontal: spacing.sm,
  },
  detailText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  allAgreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  allAgreeLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
});

export default AgreementItem;
