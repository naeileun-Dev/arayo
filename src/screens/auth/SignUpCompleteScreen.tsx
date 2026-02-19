/**
 * 회원가입 완료 화면
 * UI-MMBR-105
 * [수정] 이모지 아이콘 전부 제거
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
import StateCheckIcon from '../../assets/icon/State=check.svg';
import RefreshCwIcon from '../../assets/icon/refresh-cw.svg';
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
        <View style={styles.iconContainer}>
          <StateCheckIcon width={64} height={64} />
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
          <RefreshCwIcon width={18} height={18} color={colors.white} />
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
  upgradeButtonText: {
    ...typography.button,
    color: colors.white,
    marginLeft: spacing.sm,
  },
});

export default SignUpCompleteScreen;
