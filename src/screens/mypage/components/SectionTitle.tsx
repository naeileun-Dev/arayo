import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <View style={styles.wrap}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.black,
    letterSpacing: -0.3,
  },
});

export default SectionTitle;
