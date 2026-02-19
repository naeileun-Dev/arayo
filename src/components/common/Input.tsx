/**
 * 공통 Input 컴포넌트
 */

import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import EyeIcon from '../../assets/icon/eye.svg';
import EyeClosedIcon from '../../assets/icon/eye-closed.svg';
import { colors } from '../../styles/colors';
import { typography, fontFamily } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import type { InputProps } from '../../types';

const Input = forwardRef<TextInput, InputProps & TextInputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      error,
      hint,
      required = false,
      secureTextEntry = false,
      disabled = false,
      multiline = false,
      leftIcon,
      rightIcon,
      inputStyle,
      containerStyle,
      keyboardType = 'default',
      autoCapitalize = 'none',
      maxLength,
      onBlur,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const inputContainerStyles = [
      styles.inputContainer,
      isFocused && styles.inputContainerFocused,
      error && styles.inputContainerError,
      disabled && styles.inputContainerDisabled,
    ];

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            {required && <Text style={styles.required}>*</Text>}
          </View>
        )}

        <View style={inputContainerStyles}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIcon && styles.inputWithLeftIcon,
              (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
              multiline && styles.inputMultiline,
              inputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.textPlaceholder}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            multiline={multiline}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            {...rest}
          />

          {secureTextEntry && (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={togglePasswordVisibility}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isPasswordVisible ? (
                <EyeIcon width={20} height={20} color={colors.textTertiary} />
              ) : (
                <EyeClosedIcon width={20} height={20} color={colors.textTertiary} />
              )}
            </TouchableOpacity>
          )}

          {rightIcon && !secureTextEntry && (
            <View style={styles.rightIcon}>{rightIcon}</View>
          )}
        </View>

        {error && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {hint && !error && (
          <View style={styles.messageContainer}>
            <Text style={styles.hintText}>{hint}</Text>
          </View>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
  },
  required: {
    ...typography.label,
    color: colors.error,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    paddingHorizontal: 12,
  },
  inputContainerFocused: {
    borderColor: 'rgba(0,0,0,0.65)',
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputContainerDisabled: {
    backgroundColor: colors.G200,
    color: colors.G500,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: spacing.md,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  messageContainer: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
  },
  hintText: {
    ...typography.bodySmall,
    color: colors.textTertiary,
  },
});

export default Input;
