import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';

export const BusinessUpgradeVerifyScreen = ({ navigation }: any) => {
  const [bizNumber, setBizNumber] = useState('');

  const handleVerify = () => {
    navigation.navigate('BusinessUpgrade');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            일반기업회원 전환/골드기업회원 전환
          </Text>

          <View style={styles.formItem}>
            <View style={styles.labelRow}>
              <Text style={styles.labelText}>사업자등록번호</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              value={bizNumber}
              onChangeText={setBizNumber}
              placeholder="사업자등록번호를 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.8}
            onPress={handleVerify}
          >
            <Text style={styles.submitBtnText}>인증하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 32,
  },
  formItem: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
  },
  required: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.error,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.black,
    backgroundColor: colors.white,
  },
  submitBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
