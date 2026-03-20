import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/common';
import StateCheckIcon from '../../assets/icon/State=check.svg';
import { colors } from '../../styles/colors';
import { typography, fontFamily } from '../../styles/typography';
import { spacing, screenPadding } from '../../styles/spacing';

type ParamList = {
  BusinessUpgradeComplete: {
    type: 'general' | 'gold';
  };
};

export const BusinessUpgradeCompleteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<ParamList, 'BusinessUpgradeComplete'>>();
  const upgradeType = route.params?.type || 'general';

  const isGold = upgradeType === 'gold';

  const title = isGold
    ? '반갑습니다 아라요 기계장터님,\n골드기업회원 전환 신청이\n완료되었습니다.'
    : '반갑습니다 아라요 기계장터님,\n일반기업회원 전환이\n완료되었습니다.';

  const description = isGold
    ? '아라요 기계장터 운영자 확인 후 승인됩니다.'
    : '아라요 기계장터를 통해 다양한 서비스를 즐겨보세요!';

  const handleGoHome = () => {
    navigation.navigate('Main' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <StateCheckIcon width={40} height={40} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.bottomArea}>
        <Button title="홈으로" onPress={handleGoHome} style={styles.homeButton} />
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
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#1B1B1B',
    textAlign: 'center',
  },
  bottomArea: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: spacing['2xl'],
  },
  homeButton: {
    width: '100%',
  },
});
