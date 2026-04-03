import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native';
import KakaoLoginIcon from '../../assets/icon/kakao_login.svg';
import NaverLoginIcon from '../../assets/icon/naver_login.svg';
import GoogleLoginIcon from '../../assets/icon/google_login.svg';
import AppleLoginIcon from '../../assets/icon/apple_login.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius, spacing } from '../../styles/spacing';
import type { SocialLoginButtonProps, SocialProvider } from '../../types';

const SOCIAL_ICONS: Record<SocialProvider, React.FC<any>> = {
  kakao: KakaoLoginIcon,
  naver: NaverLoginIcon,
  google: GoogleLoginIcon,
  apple: AppleLoginIcon,
};

const SOCIAL_COLORS: Record<SocialProvider, { bg: string; border?: string }> = {
  kakao: { bg: colors.kakao },
  naver: { bg: colors.naver },
  google: { bg: colors.white, border: colors.googleBorder },
  apple: { bg: colors.apple },
};

const SOCIAL_LABELS: Record<SocialProvider, string> = {
  kakao: '카카오 로그인',
  naver: '네이버 로그인',
  google: '구글 로그인',
  apple: '애플 로그인',
};

const BUTTON_STYLES: Record<SocialProvider, ViewStyle> = {
  kakao: { backgroundColor: colors.kakao },
  naver: { backgroundColor: colors.naver },
  google: { backgroundColor: colors.google, borderWidth: 1, borderColor: colors.googleBorder },
  apple: { backgroundColor: colors.apple },
};

const TEXT_COLORS: Record<SocialProvider, string> = {
  kakao: colors.kakaoText,
  naver: colors.white,
  google: colors.textPrimary,
  apple: colors.white,
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  variant = 'icon',
  disabled = false,
  style,
}) => {
  const label = SOCIAL_LABELS[provider];
  const colorConfig = SOCIAL_COLORS[provider];
  const IconComponent = SOCIAL_ICONS[provider];

  if (variant === 'icon') {
    const iconContainerStyle = [
      styles.iconContainer,
      { backgroundColor: colorConfig.bg },
      colorConfig.border && { borderWidth: 1, borderColor: colorConfig.border },
    ];

    return (
      <TouchableOpacity
        style={[styles.iconButton, disabled && styles.disabled, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={1}
      >
        <View style={iconContainerStyle}>
          <IconComponent width={56} height={56} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.fullButton, BUTTON_STYLES[provider], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.fullButtonContent}>
        <View style={styles.fullButtonIconContainer}>
          <IconComponent width={24} height={24} />
        </View>
        <Text style={[styles.fullButtonText, { color: TEXT_COLORS[provider] }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 10,
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
  fullButtonIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  fullButtonText: {
    ...typography.button,
  },
  disabled: {
    opacity: 0.5,
  },
});
