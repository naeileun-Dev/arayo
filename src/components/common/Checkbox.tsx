import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius } from '../../styles/spacing';
import type { CheckboxProps } from '../../types';

const CHECKBOX_SIZE = {
  small: 16,
  medium: 20,
} as const;

const CHECKMARK_SIZE = {
  small: { width: 4, height: 7, borderWidth: 1.5 },
  medium: { width: 5, height: 10, borderWidth: 2 },
} as const;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
  size = 'medium',
  variant = 'checkbox',
  activeColor,
  labelColor,
  style,
  labelStyle,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!checked);
    }
  };

  const boxSize = CHECKBOX_SIZE[size];
  const isRadio = variant === 'radio';
  const checkedColor = activeColor ?? colors.primary;
  const checkmarkDimensions = CHECKMARK_SIZE[size];

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          isRadio
            ? [styles.radioBox, { width: boxSize, height: boxSize }]
            : [styles.checkbox, { width: boxSize, height: boxSize, borderRadius: borderRadius.sm }],
          checked && { backgroundColor: checkedColor, borderColor: checkedColor },
          disabled && styles.checkboxDisabled,
        ]}
      >
        {checked && !isRadio && (
          <View
            style={[
              styles.checkmark,
              {
                width: checkmarkDimensions.width,
                height: checkmarkDimensions.height,
                borderBottomWidth: checkmarkDimensions.borderWidth,
                borderRightWidth: checkmarkDimensions.borderWidth,
              },
            ]}
          />
        )}
        {checked && isRadio && <View style={styles.radioInner} />}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            size === 'small' && styles.labelSmall,
            disabled && styles.labelDisabled,
            labelColor ? { color: labelColor } : null,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.G400,
    backgroundColor: colors.white,
  },
  radioBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.G200,
    backgroundColor: colors.white,
  },
  checkboxDisabled: {
    borderColor: colors.borderLight,
    backgroundColor: colors.borderLight,
  },
  checkmark: {
    borderColor: colors.white,
    transform: [{ rotate: '45deg' }, { translateY: -1 }],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  label: {
    ...typography.body,
    marginLeft: 0,
    color: colors.textPrimary,
  },
  labelSmall: {
    fontSize: 12,
  },
  labelDisabled: {
    color: colors.textTertiary,
  },
});
