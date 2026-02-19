/**
 * 마이페이지 화면 (플레이스홀더)
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const MyPageScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>마이페이지</Text>
        <Text style={styles.description}>마이페이지 화면 준비 중입니다.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { ...typography.h3, color: colors.textPrimary, marginBottom: 8 },
  description: { ...typography.body, color: colors.textTertiary },
});

export default MyPageScreen;
