import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/common';
import StateCheckIcon from '../../assets/icon/State=check.svg';
import RefreshCwIcon from '../../assets/icon/refresh-cw.svg';
import UploadIcon from '../../assets/icon/upload.svg';
import BoxIcon from '../../assets/icon/box.svg';
import HomeIcon from '../../assets/icon/home.svg';
import BuildingIcon from '../../assets/icon/building.svg';
import CrownIcon from '../../assets/icon/crown.svg';
import { colors } from '../../styles/colors';
import { typography, fontFamily } from '../../styles/typography';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUpComplete'>;

export const SignUpCompleteScreen: React.FC<Props> = ({ navigation, route }) => {
  const userName = route.params?.name || '회원';

  const handleGoHome = () => {
    navigation.navigate('Login');
  };

  const handleUpgradeToBusiness = () => {
    // TODO: Implement business upgrade navigation
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top section - white */}
        <View style={styles.topSection}>
          <View style={styles.iconContainer}>
            <StateCheckIcon width={56} height={56} />
          </View>

          <Text style={styles.title}>
            반갑습니다 {userName}님,{'\n'}
            회원가입이 완료되었습니다.
          </Text>
          <Text style={styles.description}>
            아라요 기계장터를 통해 다양한 서비스를 즐겨보세요!
          </Text>

          <Button title="홈으로" onPress={handleGoHome} style={styles.homeButton} />
        </View>

        {/* Bottom section - gray */}
        <View style={styles.bottomSection}>
          <Text style={styles.upgradeTitle}>상품을 판매하고 싶으신가요?</Text>
          <Text style={styles.upgradeDescription}>
            지금 기업회원으로 전환하시면,{'\n'}
            상품 등록 및 판매 기능 이용이 가능합니다.
          </Text>

          {/* 일반기업회원 카드 */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>일반기업회원</Text>
            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>상품 등록 가능</Text>
              </View>
              <View style={styles.benefitRow}>
                <BoxIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>판매 상품 수 최대 3개</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceFreeText}>무료</Text>
              <Text style={styles.pricePerYear}> /연간</Text>
            </View>
          </View>

          {/* 골드기업회원 카드 */}
          <View style={[styles.planCard, styles.planCardGold]}>
            <View style={styles.goldBadge}>
              <CrownIcon width={16} height={16} color="#fff" />
              <Text style={styles.goldBadgeText}>6개월 무료체험</Text>
            </View>

            <Text style={styles.planTitle}>골드기업회원</Text>
            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>상품 등록 가능</Text>
              </View>
              <View style={styles.benefitRow}>
                <BoxIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>판매 상품 수 최대 3개</Text>
              </View>
              <View style={styles.benefitRow}>
                <HomeIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>미니 홈 제공</Text>
              </View>
              <View style={styles.benefitRow}>
                <BuildingIcon width={16} height={16} color={colors.textPrimary} />
                <Text style={styles.benefitText}>브랜드관 회사 홍보</Text>
              </View>
            </View>
            <View style={styles.goldPriceRow}>
              <Text style={styles.priceStrike}>₩ 990,000</Text>
              <Text style={styles.pricePerYear}> /연간</Text>
              <Text style={styles.priceArrow}> → </Text>
              <Text style={styles.priceFreeGold}>무료</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={handleUpgradeToBusiness}
            activeOpacity={0.8}
          >
            <RefreshCwIcon width={18} height={18} color={colors.white} />
            <Text style={styles.upgradeButtonText}>기업회원 전환</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Top section
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: colors.white,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  homeButton: {
    width: '100%',
  },

  // Bottom section
  bottomSection: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  upgradeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  upgradeDescription: {
    ...typography.body,
    color: '#1B1B1B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  // Plan cards
  planCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  planCardGold: {
    borderColor: colors.primary,
    borderWidth: 2,
    position: 'relative',
    paddingTop: 28,
  },
  planTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  benefitList: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceFreeText: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pricePerYear: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    fontWeight: '700',
    color: '#7E7E7E',
  },

  // Gold card specific
  goldBadge: {
    position: 'absolute',
    top: -14,
    left: 16,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  goldBadgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.white,
  },
  goldPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceStrike: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    fontWeight: '600',
    color: '#7E7E7E',
    textDecorationLine: 'line-through',
  },
  priceArrow: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  priceFreeGold: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },

  // Upgrade button
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  upgradeButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
