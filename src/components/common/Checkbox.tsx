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

  const boxSize = size === 'small' ? 16 : 20;
  const isRadio = variant === 'radio';

  const checkedBg = activeColor || colors.primary;
  const checkedBorder = activeColor || colors.primary;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          isRadio ? [styles.radioBox, { width: boxSize, height: boxSize }] : [styles.checkbox, { width: boxSize, height: boxSize, borderRadius: borderRadius.sm }],
          checked && { backgroundColor: checkedBg, borderColor: checkedBorder },
          disabled && styles.checkboxDisabled,
        ]}
      >
        {checked && !isRadio && (
          <View style={[styles.checkmark, size === 'small' && styles.checkmarkSmall]} />
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
    borderWidth: 1.5,
    borderColor: colors.G400,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBox: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDisabled: {
    backgroundColor: colors.borderLight,
    borderColor: colors.borderLight,
  },
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
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
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
