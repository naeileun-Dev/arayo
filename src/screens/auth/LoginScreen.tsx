/**
 * 로그인 화면
 * UI-MMBR-101
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Button, Input, Checkbox } from '../../components/common';
import { SocialLoginButton } from '../../components/auth';
import MainLogo from '../../assets/images/main_logo.svg';
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

  /* [수정] 로그인 에러 상태 추가 */
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    setLoginError('');
    setIsLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      console.log('Login attempt:', { userId, password, autoLogin });

      // 로그인 성공 → Main 화면으로 이동 (Auth 스택을 리셋)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' as any }],
        }),
      );
    } catch (error) {
      setLoginError(
        '아이디 또는 비밀번호가 일치하지 않습니다.\n입력하신 내용을 다시 확인해 주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    console.log('Social login:', provider);
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
            <MainLogo width={180} height={60} />
          </View>

          {/* 로그인 폼 */}
          <View style={styles.formContainer}>
            <Input
              placeholder="아이디를 입력해 주세요."
              value={userId}
              onChangeText={(text) => {
                setUserId(text);
                if (loginError) setLoginError(''); /* [수정] 입력 시 에러 초기화 */
              }}
              autoCapitalize="none"
              containerStyle={styles.inputContainer}
            />

            <Input
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (loginError) setLoginError(''); /* [수정] 입력 시 에러 초기화 */
              }}
              secureTextEntry
              containerStyle={styles.inputContainer}
            />

            {/* [수정] 로그인 에러 메시지 표시 */}
            {loginError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

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

          {/* [수정] 하단 배너  */}
          <View style={styles.bannerContainer}>
              <Image
                source={{ uri: 'https://blog.kakaocdn.net/dna/oDWIF/btqHiNlxyqr/AAAAAAAAAAAAAAAAAAAAAOkUmQ2YFcGK7K_lkyEm5R7xoJ6T35d_RtANwBqbDjAv/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=xBUiXqbG5HKCMjsMdf9kBm7XLfE%3D' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
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
  formContainer: {
    paddingVertical: spacing.base,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  /* [수정] 에러 메시지 컨테이너 */
  errorContainer: {
    marginBottom: spacing.md,
  },
  /* [수정] 에러 텍스트 */
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    lineHeight: 18,
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
  bannerImage: {
    width: '100%',
    height: 70,
    borderRadius: borderRadius.lg,
  },

});

export default LoginScreen;
