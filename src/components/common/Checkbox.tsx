/**
 * 공통 Checkbox 컴포넌트
 * [수정] 이모지 체크마크 제거 → 순수 View 기반 체크마크
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius, spacing, iconSize } from '../../styles/spacing';
import type { CheckboxProps } from '../../types';

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
  size = 'medium',
  style,
  labelStyle,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!checked);
    }
  };

  const boxSize = size === 'small' ? iconSize.sm : iconSize.md;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: boxSize,
            height: boxSize,
            borderRadius: borderRadius.sm,
          },
          checked && styles.checkboxChecked,
          disabled && styles.checkboxDisabled,
        ]}
      >
        {/* [수정] 이모지 대신 순수 View 기반 체크마크 */}
        {checked && (
          <View style={styles.checkmarkContainer}>
            <View style={[styles.checkmarkShort, size === 'small' && styles.checkmarkShortSmall]} />
            <View style={[styles.checkmarkLong, size === 'small' && styles.checkmarkLongSmall]} />
          </View>
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            size === 'small' && styles.labelSmall,
            disabled && styles.labelDisabled,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxDisabled: {
    backgroundColor: colors.borderLight,
    borderColor: colors.borderLight,
  },
  /* [수정] View 기반 체크마크 */
  checkmarkContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkShort: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: colors.white,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: -2.5 }, { translateY: 1 }],
  },
  checkmarkShortSmall: {
    height: 5,
    width: 1.5,
    transform: [{ rotate: '-45deg' }, { translateX: -2 }, { translateY: 0.5 }],
  },
  checkmarkLong: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: colors.white,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: 1.5 }, { translateY: -0.5 }],
  },
  checkmarkLongSmall: {
    height: 8,
    width: 1.5,
    transform: [{ rotate: '45deg' }, { translateX: 1 }, { translateY: -0.5 }],
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  labelSmall: {
    ...typography.bodySmall,
  },
  labelDisabled: {
    color: colors.textTertiary,
  },
});

export default Checkbox;
