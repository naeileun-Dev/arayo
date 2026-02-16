/**
 * 소셜 로그인 버튼 컴포넌트
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius, spacing } from '../../styles/spacing';
import type { SocialLoginButtonProps, SocialProvider } from '../../types';

// 소셜 로그인 아이콘
const SocialIcons: Record<SocialProvider, React.FC> = {
  kakao: () => (
    <View style={[styles.iconContainer, { backgroundColor: colors.kakao }]}>
      <Text style={[styles.iconText, { color: colors.kakaoText }]}>K</Text>
    </View>
  ),
  naver: () => (
    <View style={[styles.iconContainer, { backgroundColor: colors.naver }]}>
      <Text style={[styles.iconText, { color: colors.naverText }]}>N</Text>
    </View>
  ),
  google: () => (
    <View style={[styles.iconContainer, styles.googleIcon]}>
      <Text style={[styles.iconText, { color: '#4285F4' }]}>G</Text>
    </View>
  ),
  apple: () => (
    <View style={[styles.iconContainer, { backgroundColor: colors.apple }]}>
      <Text style={[styles.iconText, { color: colors.appleText }]}>🍎</Text>
    </View>
  ),
};

const SocialLabels: Record<SocialProvider, string> = {
  kakao: '카카오 로그인',
  naver: '네이버 로그인',
  google: '구글 로그인',
  apple: '애플 로그인',
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  variant = 'icon',
  disabled = false,
  style,
}) => {
  const IconComponent = SocialIcons[provider];
  const label = SocialLabels[provider];

  if (variant === 'icon') {
    return (
      <TouchableOpacity
        style={[styles.iconButton, disabled && styles.disabled, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <IconComponent />
        <Text style={styles.iconLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  // Full width button
  const getButtonStyle = () => {
    switch (provider) {
      case 'kakao':
        return { backgroundColor: colors.kakao };
      case 'naver':
        return { backgroundColor: colors.naver };
      case 'google':
        return {
          backgroundColor: colors.google,
          borderWidth: 1,
          borderColor: colors.googleBorder,
        };
      case 'apple':
        return { backgroundColor: colors.apple };
      default:
        return {};
    }
  };

  const getTextStyle = () => {
    switch (provider) {
      case 'kakao':
        return { color: colors.kakaoText };
      case 'naver':
      case 'apple':
        return { color: colors.white };
      case 'google':
        return { color: colors.textPrimary };
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.fullButton,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.fullButtonContent}>
        <View style={styles.fullButtonIcon}>
          <IconComponent />
        </View>
        <Text style={[styles.fullButtonText, getTextStyle()]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    width: 72,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.googleBorder,
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  fullButton: {
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  fullButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullButtonIcon: {
    marginRight: spacing.md,
  },
  fullButtonText: {
    ...typography.button,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default SocialLoginButton;
