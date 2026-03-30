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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors } from '../../styles/colors';
import { Button, Input, Header } from '../../components/common';
import { validatePassword, validatePasswordConfirm } from '../../utils/validators';

enum Status {
  INITIAL = 'initial',
  VERIFIED = 'verified',
}

export const PasswordResetScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<{
    password?: string[];
    confirm?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setStatus(Status.VERIFIED);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
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
      // TODO: API 호출 (비밀번호 변경)
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const renderInitial = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.descText}>비밀번호 재설정을 위해 본인 인증을 진행해 주세요.</Text>
      <Text style={styles.sectionTitle}>휴대폰인증</Text>
      <Button
        title="PASS 본인 인증"
        onPress={handleVerification}
        loading={isLoading}
      />
    </View>
  );

  const renderPasswordForm = () => (
    <View style={styles.contentContainer}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>새 비밀번호 입력</Text>
        <Input
          placeholder="새 비밀번호를 입력해 주세요."
          value={newPassword}
          onChangeText={(v) => {
            setNewPassword(v);
            setPasswordErrors((e) => ({ ...e, password: undefined }));
          }}
          secureTextEntry
          containerStyle={styles.inputNoMargin}
        />
        <Text style={styles.passwordHint}>
          *8~20자내로 구성해주세요.{'\n'}
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
          onChangeText={(v) => {
            setNewPasswordConfirm(v);
            setPasswordErrors((e) => ({ ...e, confirm: undefined }));
          }}
          secureTextEntry
          containerStyle={styles.inputNoMargin}
        />
        {passwordErrors.confirm?.map((error, index) => (
          <Text key={index} style={styles.errorText}>*{error}</Text>
        ))}
      </View>

      <Button
        title="비밀번호 변경"
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.actionButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="비밀번호 변경" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {status === Status.INITIAL ? renderInitial() : renderPasswordForm()}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  contentContainer: {
    flex: 1,
  },
  descText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 28,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 8,
  },
  inputNoMargin: {
    marginBottom: 0,
  },
  passwordHint: {
    fontSize: 12,
    color: colors.G500,
    marginTop: 6,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
  actionButton: {
    marginTop: 8,
  },
});
