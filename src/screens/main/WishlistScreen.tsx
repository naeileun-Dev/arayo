import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../styles/colors';

export const WishlistScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
