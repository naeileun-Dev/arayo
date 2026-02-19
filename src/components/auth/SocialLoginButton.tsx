/**
 * 소셜 로그인 버튼 컴포넌트
 * [수정] 이모지 아이콘 전부 제거 → 빈 원형 플레이스홀더
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import KakaoLoginIcon from '../../assets/icon/kakao_login.svg';
import NaverLoginIcon from '../../assets/icon/naver_login.svg';
import GoogleLoginIcon from '../../assets/icon/google_login.svg';
import AppleLoginIcon from '../../assets/icon/apple_login.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { borderRadius, spacing } from '../../styles/spacing';
import type { SocialLoginButtonProps, SocialProvider } from '../../types';

const SocialIcons: Record<SocialProvider, React.FC<any>> = {
  kakao: KakaoLoginIcon,
  naver: NaverLoginIcon,
  google: GoogleLoginIcon,
  apple: AppleLoginIcon,
};

const socialColors: Record<SocialProvider, { bg: string; border?: string }> = {
  kakao: { bg: colors.kakao },
  naver: { bg: colors.naver },
  google: { bg: colors.white, border: colors.googleBorder },
  apple: { bg: colors.apple },
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
  const label = SocialLabels[provider];
  const colorConfig = socialColors[provider];

  if (variant === 'icon') {
    return (
      <TouchableOpacity
        style={[styles.iconButton, disabled && styles.disabled, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colorConfig.bg },
            colorConfig.border ? { borderWidth: 1, borderColor: colorConfig.border } : null,
          ]}
        >
          {React.createElement(SocialIcons[provider], { width: 24, height: 24 })}
        </View>
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
        <View style={styles.fullButtonIconPlaceholder}>
          {React.createElement(SocialIcons[provider], { width: 20, height: 20 })}
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
  /* [수정] 아이콘 컨테이너 - 내부 텍스트 없이 빈 원형 */
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
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
  fullButtonIconPlaceholder: {
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

export default SocialLoginButton;
