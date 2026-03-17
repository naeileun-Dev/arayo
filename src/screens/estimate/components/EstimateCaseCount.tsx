import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface Props {
  count: string | number;
}

const CASE_COUNT_BG = '#FDF2F4';

export const EstimateCaseCount: React.FC<Props> = ({ count }) => (
  <View style={styles.caseCount}>
    <Text style={styles.caseCountText}>
      {typeof count === 'number' ? `${count}건` : count}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  caseCount: {
    width: 36,
    height: 34,
    borderRadius: 4,
    backgroundColor: CASE_COUNT_BG,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  caseCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});

