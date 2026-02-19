/**
 * 공통 버튼 컴포넌트
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius, componentHeight, spacing } from '../../styles/spacing';
import type { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    disabled && styles[`${variant}Disabled` as keyof typeof styles],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    disabled && styles[`${variant}DisabledText` as keyof typeof styles],
    textStyle,
  ];

  const getLoaderColor = (): string => {
    if (variant === 'primary' || variant === 'danger') {
      return colors.white;
    }
    return colors.primary;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
  },
  primaryDisabled: {
    backgroundColor: colors.G100,
  },
  primaryDisabledText: {
    color: colors.G500,
  },

  secondary: {
    backgroundColor: colors.secondary,
  },
  secondaryText: {
    color: colors.white,
  },
  secondaryDisabled: {
    backgroundColor: colors.borderLight,
  },
  secondaryDisabledText: {
    color: colors.textTertiary,
  },

  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  outlineText: {
    color: colors.textPrimary,
  },
  outlineDisabled: {
    borderColor: colors.borderLight,
  },
  outlineDisabledText: {
    color: colors.textTertiary,
  },

  ghost: {
    backgroundColor: colors.transparent,
  },
  ghostText: {
    color: colors.primary,
  },
  ghostDisabled: {},
  ghostDisabledText: {
    color: colors.textTertiary,
  },

  danger: {
    backgroundColor: colors.error,
  },
  dangerText: {
    color: colors.white,
  },
  dangerDisabled: {
    backgroundColor: colors.borderLight,
  },
  dangerDisabledText: {
    color: colors.textTertiary,
  },

  // Sizes
  small: {
    height: componentHeight.buttonSmall,
    paddingHorizontal: spacing.base,
  },
  smallText: {
    ...typography.buttonSmall,
  },

  medium: {
    height: 50,
    paddingHorizontal: 15,
  },
  mediumText: {
    ...typography.button,
    fontSize: 15,
  },

  large: {
    height: componentHeight.buttonLarge,
    paddingHorizontal: spacing.xl,
  },
  largeText: {
    ...typography.button,
    fontSize: 18,
  },

  disabled: {
    opacity: 1,
  },
  disabledText: {},
});

export default Button;
