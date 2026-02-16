/**
 * 회원가입 완료 화면
 * UI-MMBR-105
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/common';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUpComplete'>;

const SignUpCompleteScreen: React.FC<Props> = ({ navigation, route }) => {
  const userName = route.params?.name || '회원';

  const handleGoHome = () => {
    navigation.navigate('Login');
  };

  const handleUpgradeToBusiness = () => {
    console.log('기업회원 전환');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 성공 아이콘 */}
        <View style={styles.iconContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>
        </View>

        {/* 환영 메시지 */}
        <Text style={styles.title}>
          반갑습니다 {userName}님,{'\n'}
          회원가입이 완료되었습니다.
        </Text>
        <Text style={styles.description}>
          아라요 기계장터를 통해 다양한 서비스를 즐겨보세요!
        </Text>

        {/* 홈으로 버튼 */}
        <Button title="홈으로" onPress={handleGoHome} style={styles.homeButton} />
      </View>

      {/* 기업회원 전환 카드 */}
      <View style={styles.upgradeCard}>
        <Text style={styles.upgradeTitle}>상품을 판매하고 싶으신가요?</Text>
        <Text style={styles.upgradeDescription}>
          지금 기업회원으로 전환하시면,{'\n'}
          상품 등록 및 판매 기능 이용이 가능합니다.
        </Text>

        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={handleUpgradeToBusiness}
          activeOpacity={0.8}
        >
          <Text style={styles.upgradeButtonIcon}>🔄</Text>
          <Text style={styles.upgradeButtonText}>기업회원 전환</Text>
        </TouchableOpacity>
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
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconText: {
    fontSize: 32,
    color: colors.white,
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
    marginBottom: spacing['2xl'],
  },
  homeButton: {
    width: '100%',
  },
  upgradeCard: {
    marginHorizontal: screenPadding.horizontal,
    marginBottom: spacing['3xl'],
    padding: spacing.lg,
    backgroundColor: colors.backgroundGray,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  upgradeTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  upgradeDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
  },
  upgradeButtonIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  upgradeButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default SignUpCompleteScreen;
