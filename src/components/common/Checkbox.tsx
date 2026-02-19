/**
 * 공통 Checkbox 컴포넌트
 * [수정] 이모지 체크마크 제거 → 순수 View 기반 체크마크
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius } from '../../styles/spacing';
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

  const boxSize = size === 'small' ? 16 : 20;

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
        {checked && (
          <View
            style={[
              styles.checkmark,
              size === 'small' && styles.checkmarkSmall,
            ]}
          />
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
    gap: 7,
  },
  checkbox: {
    borderWidth: 1.5,
    borderColor: colors.G400,
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
  /* border 기반 체크마크 (L자 회전) */
  checkmark: {
    width: 5,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    transform: [{ rotate: '45deg' }, { translateY: -1 }],
  },
  checkmarkSmall: {
    width: 4,
    height: 7,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    transform: [{ rotate: '45deg' }, { translateY: -1 }],
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: 0,
  },
  labelSmall: {
    fontSize: 12,
  },
  labelDisabled: {
    color: colors.textTertiary,
  },
});

export default Checkbox;
