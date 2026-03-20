import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/common';
import WarningIcon from '../../assets/icon/auth_warning.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, screenPadding } from '../../styles/spacing';

export const LoginRequiredScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <WarningIcon width={64} height={64} />
        </View>

        <Text style={styles.title}>로그인이 필요한 화면입니다.</Text>

      </View>

      <View style={styles.buttonContainer}>
        <Button title="로그인 하러가기" onPress={() => navigation.navigate('Auth')} />
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
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: spacing['2xl'],
  },
});
