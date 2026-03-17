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
import { componentHeight, spacing } from '../../styles/spacing';
import type { ButtonProps } from '../../types';

const MEDIUM_HEIGHT = 50;
const MEDIUM_PADDING = 15;

export const Button: React.FC<ButtonProps> = ({
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

  const loaderColor = (variant === 'primary' || variant === 'danger')
    ? colors.white
    : colors.primary;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} size="small" />
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
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.transparent,
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

  small: {
    height: componentHeight.buttonSmall,
    paddingHorizontal: spacing.base,
  },
  smallText: {
    ...typography.buttonSmall,
  },

  medium: {
    height: MEDIUM_HEIGHT,
    paddingHorizontal: MEDIUM_PADDING,
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
