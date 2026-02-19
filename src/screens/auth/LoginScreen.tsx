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
import type { AuthStackParamList, SocialProvider } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const handleLogin = async () => {
    // 유효성 검사
    let hasError = false;
    setIdError('');
    setPwError('');

    if (!userId) {
      setIdError('*아이디를 입력해 주세요.');
      hasError = true;
    } else if (userId.length < 5 || userId.length > 20) {
      setIdError('*5자 ~ 20자 이내의 영문으로 아이디를 입력해 주세요.');
      hasError = true;
    }

    if (!password) {
      setPwError('*비밀번호를 입력해 주세요.');
      hasError = true;
    }

    if (hasError) return;

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
      setPwError('*아이디 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    console.log('Social login:', provider);
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
          {/* 로고 영역 */}
          <View style={styles.logoContainer}>
            <MainLogo width={160} height={50} />
          </View>

          {/* 로그인 입력 폼 */}
          <View style={styles.formSection}>
            <View style={styles.formContainer}>
              <View style={styles.formLi}>
                <Input
                  placeholder="아이디 입력를 입력해 주세요."
                  value={userId}
                  onChangeText={(text) => {
                    setUserId(text);
                    if (idError) setIdError('');
                  }}
                  autoCapitalize="none"
                  containerStyle={styles.inputBox}
                />
              </View>

              <View style={styles.formLi}>
                <Input
                  placeholder="비밀번호를 입력해 주세요."
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (pwError) setPwError('');
                  }}
                  secureTextEntry
                  containerStyle={styles.inputBox}
                />
              </View>
            </View>

            {/* 에러 메시지 (.help-block .color-red) */}
            {(pwError || idError) ? (
              <View style={styles.errorContainer}>
                {pwError ? <Text style={styles.errorText}>{pwError}</Text> : null}
                {idError ? <Text style={styles.errorText}>{idError}</Text> : null}
              </View>
            ) : null}

            {/* 자동로그인 및 링크 (.flex .py15 .fs14 .color-G600) */}
            <View style={styles.optionsRow}>
              <Checkbox
                checked={autoLogin}
                onToggle={setAutoLogin}
                label="자동로그인"
                size="small"
              />
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AccountRecovery', { tab: 'findId' })}>
                  <Text style={styles.linkText}>아이디 찾기</Text>
                </TouchableOpacity>
                <View style={styles.linkDivider} />
                <TouchableOpacity onPress={() => navigation.navigate('AccountRecovery', { tab: 'resetPassword' })}>
                  <Text style={styles.linkText}>비밀번호 재설정</Text>
                </TouchableOpacity>
                <View style={styles.linkDivider} />
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.linkText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 로그인 버튼 (.formBtnSet) */}
            <View style={styles.formBtnSet}>
              <Button
                title="로그인"
                onPress={handleLogin}
                loading={isLoading}
              />
            </View>
          </View>

          {/* SNS 간편 로그인 (#SNS-login) */}
          <View style={styles.snsLoginSection}>
            <View style={styles.divider} />
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

          {/* 하단 배너 영역 (.py35) */}
          <View style={styles.bannerSection}>
            <TouchableOpacity onPress={() => console.log('Banner clicked')}>
              <Image
                source={require('../../assets/images/banner02.png')}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
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
    paddingHorizontal: 20, // --padding-LR: 20px
  },

  /* 로고 영역 - 더 크게, 아래 간격 줄임 */
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 30,
    height: 80,
  },

  /* 로그인 폼 영역 */
  formSection: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  formContainer: {
    gap: 5, // .formContainer.gap5
  },
  formLi: {
    // .form-li
  },
  inputBox: {
    width: '100%',
    marginBottom: 0,
  },
  errorContainer: {
    marginTop: 8,
    gap: 4,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
  },

  /* 옵션 링크 (.flex .py15 .fs14 .color-G600) */
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
    color: colors.G600,
  },
  /* DS-SET 구분선 */
  linkDivider: {
    width: 1,
    height: 10,
    backgroundColor: colors.G300,
    marginHorizontal: 8,
  },
  formBtnSet: {
    marginTop: 15,
  },

  /* SNS 간편 로그인 영역 (#SNS-login) */
  snsLoginSection: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.G200,
    marginBottom: 20,
  },
  socialTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: colors.G800,
    marginBottom: 25, // .mb25
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
  },

  /* 하단 배너 영역 */
  bannerSection: {
    paddingVertical: 25,
  },
  bannerImage: {
    width: '100%',
    height: 80,
    borderRadius: 4,
  },
});

export default LoginScreen;
