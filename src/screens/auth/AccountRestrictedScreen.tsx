/**
 * 계정 제한 안내 화면
 * UI-MMBR-102
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/common';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, screenPadding } from '../../styles/spacing';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'AccountRestricted'>;

const AccountRestrictedScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.warningIcon}>
            <View style={styles.warningIconPlaceholder} />
          </View>
        </View>

        {/* 안내 메시지 */}
        <Text style={styles.title}>이용이 제한된 계정입니다.</Text>
        <Text style={styles.description}>
          확인 및 해제가 필요하신 경우{'\n'}
          02-2668-3094로 문의해 주세요.
        </Text>
      </View>

      {/* 홈으로 버튼 */}
      <View style={styles.buttonContainer}>
        <Button title="홈으로" onPress={handleGoHome} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenPadding.horizontal,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  warningIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.warningLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIconPlaceholder: {
    width: 32,
    height: 32,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.base,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: spacing['2xl'],
  },
});

export default AccountRestrictedScreen;
