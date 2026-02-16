/**
 * 로그인 화면
 * UI-MMBR-101
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Checkbox } from '../../components/common';
import { SocialLoginButton } from '../../components/auth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import type { AuthStackParamList, SocialProvider } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: 로그인 API 호출
      console.log('Login attempt:', { userId, password, autoLogin });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    console.log('Social login:', provider);
    // TODO: 소셜 로그인 처리
  };

  const handleFindId = () => {
    navigation.navigate('AccountRecovery', { tab: 'findId' });
  };

  const handleResetPassword = () => {
    navigation.navigate('AccountRecovery', { tab: 'resetPassword' });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 로고 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>⚙️</Text>
              </View>
              <View>
                <Text style={styles.logoText}>아라요</Text>
                <Text style={styles.logoSubText}>기계장터</Text>
              </View>
            </View>
          </View>

          {/* 로그인 폼 */}
          <View style={styles.formContainer}>
            <Input
              placeholder="아이디 입력을 입력해 주세요.."
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              containerStyle={styles.inputContainer}
            />

            <Input
              placeholder="비밀번호를 입력해 주세요.."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={styles.inputContainer}
            />

            {/* 옵션 링크들 */}
            <View style={styles.optionsRow}>
              <Checkbox
                checked={autoLogin}
                onToggle={setAutoLogin}
                label="자동로그인"
                size="small"
              />
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={handleFindId}>
                  <Text style={styles.linkText}>아이디 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.linkDivider}>|</Text>
                <TouchableOpacity onPress={handleResetPassword}>
                  <Text style={styles.linkText}>비밀번호 재설정</Text>
                </TouchableOpacity>
                <Text style={styles.linkDivider}>|</Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.linkText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 로그인 버튼 */}
            <Button
              title="로그인"
              onPress={handleLogin}
              loading={isLoading}
              disabled={!userId || !password}
              style={styles.loginButton}
            />
          </View>

          {/* 간편 로그인 */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialTitle}>간편 로그인</Text>
            <View style={styles.socialButtons}>
              <SocialLoginButton
                provider="kakao"
                onPress={() => handleSocialLogin('kakao')}
              />
              <SocialLoginButton
                provider="naver"
                onPress={() => handleSocialLogin('naver')}
              />
              <SocialLoginButton
                provider="google"
                onPress={() => handleSocialLogin('google')}
              />
              <SocialLoginButton
                provider="apple"
                onPress={() => handleSocialLogin('apple')}
              />
            </View>
          </View>

          {/* 하단 배너 */}
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>아라요 기계장터 신규가입</Text>
                <Text style={styles.bannerSubtitle}>웰컴 쿠폰 혜택</Text>
              </View>
              <View style={styles.bannerCoupon}>
                <Text style={styles.couponText}>💳</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: screenPadding.horizontal,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  logoIconText: {
    fontSize: 24,
  },
  logoText: {
    ...typography.h2,
    color: colors.primary,
  },
  logoSubText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  formContainer: {
    paddingVertical: spacing.base,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  linkDivider: {
    ...typography.bodySmall,
    color: colors.borderMedium,
    marginHorizontal: spacing.sm,
  },
  loginButton: {
    marginTop: spacing.sm,
  },
  socialContainer: {
    paddingVertical: spacing['2xl'],
    alignItems: 'center',
  },
  socialTitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  bannerContainer: {
    marginTop: 'auto',
    paddingBottom: spacing.xl,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
  bannerContent: {},
  bannerTitle: {
    ...typography.bodySmall,
    color: colors.white,
  },
  bannerSubtitle: {
    ...typography.h4,
    color: '#FFE082',
  },
  bannerCoupon: {
    backgroundColor: '#FFF9C4',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  couponText: {
    fontSize: 24,
  },
});

export default LoginScreen;
