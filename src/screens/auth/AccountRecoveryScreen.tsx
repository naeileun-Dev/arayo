import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Header, TabBar } from '../../components/common';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, screenPadding } from '../../styles/spacing';
import { validatePassword, validatePasswordConfirm } from '../../utils/validators';
import CheckIcon from '../../assets/icon/check.svg';
import type { AuthStackParamList, Tab } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'AccountRecovery'>;

const TABS: Tab[] = [
  { key: 'findId', label: '아이디찾기' },
  { key: 'resetPassword', label: '비밀번호 재설정' },
];

enum Status {
  INITIAL = 'initial',
  VERIFIED = 'verified',
  PASSWORD_RESET = 'passwordReset',
  COMPLETE = 'complete',
}

export const AccountRecoveryScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialTab = route.params?.tab || 'findId';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [foundUserId, setFoundUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<{
    password?: string[];
    confirm?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'findId' | 'resetPassword');
    setStatus(Status.INITIAL);
    setFoundUserId('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setPasswordErrors({});
  };

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      if (activeTab === 'findId') {
        setFoundUserId('sa••••');
        setStatus(Status.VERIFIED);
      } else {
        setStatus(Status.PASSWORD_RESET);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const errors: { password?: string[]; confirm?: string[] } = {};
    const passwordErrs = validatePassword(newPassword);
    if (passwordErrs.length > 0) errors.password = passwordErrs;

    const confirmErrs = validatePasswordConfirm(newPassword, newPasswordConfirm);
    if (confirmErrs.length > 0) errors.confirm = confirmErrs;

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setStatus(Status.COMPLETE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const renderInitialView = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>휴대폰인증</Text>
      <Button
        title="PASS 본인 인증"
        onPress={handleVerification}
        loading={isLoading}
        style={styles.verificationButton}
      />
    </View>
  );

  const renderIdFoundView = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.resultMessage}>
        가입하신 아이디를 확인하시고{'\n'}
        로그인해주세요.
      </Text>

      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>아이디</Text>
        <Text style={styles.resultValue}>{foundUserId}</Text>
      </View>

      <Button
        title="로그인 바로가기"
        onPress={handleGoToLogin}
        style={styles.actionButton}
      />
    </View>
  );

  const renderPasswordResetView = () => (
    <View style={styles.contentContainer}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>새 비밀번호 입력</Text>
        <Input
          placeholder="새 비밀번호를 입력해 주세요."
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          containerStyle={styles.inputNoMargin}
        />
        <Text style={styles.passwordHint}>
          *4~20자내로 구성해주세요.{'\n'}
          (보안을 위해 영문, 숫자, 특수문자를 사용을 권장드립니다.)
        </Text>
        {passwordErrors.password?.map((error, index) => (
          <Text key={index} style={styles.errorText}>*{error}</Text>
        ))}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>비밀번호 재입력</Text>
        <Input
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          value={newPasswordConfirm}
          onChangeText={setNewPasswordConfirm}
          secureTextEntry
          containerStyle={styles.inputNoMargin}
        />
        {passwordErrors.confirm?.map((error, index) => (
          <Text key={index} style={styles.errorText}>*{error}</Text>
        ))}
      </View>

      <Button
        title="완료"
        onPress={handlePasswordReset}
        loading={isLoading}
        style={styles.actionButton}
      />
    </View>
  );

  const renderPasswordCompleteView = () => (
    <View style={styles.completeContainer}>
      <View style={styles.successIcon}>
        <CheckIcon width={28} height={28} color={colors.success} />
      </View>

      <Text style={styles.completeTitle}>
        비밀번호 재설정이{'\n'}
        완료되었습니다.
      </Text>

      <Button
        title="로그인 바로가기"
        onPress={handleGoToLogin}
        style={styles.actionButton}
      />
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'findId') {
      return status === Status.VERIFIED ? renderIdFoundView() : renderInitialView();
    }

    switch (status) {
      case Status.PASSWORD_RESET:
        return renderPasswordResetView();
      case Status.COMPLETE:
        return renderPasswordCompleteView();
      default:
        return renderInitialView();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="계정정보 찾기" onBack={() => navigation.goBack()} />

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderContent()}
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
    paddingTop: spacing.lg,
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  verificationButton: {
    backgroundColor: colors.primary,
  },
  resultMessage: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  resultLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginRight: spacing.xl,
  },
  resultValue: {
    ...typography.body,
    color: colors.textPrimary,
  },
  actionButton: {
    marginTop: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  inputNoMargin: {
    marginBottom: 0,
  },
  passwordHint: {
    ...typography.bodySmall,
    color: colors.textTertiary,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing['5xl'],
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  completeTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
});
