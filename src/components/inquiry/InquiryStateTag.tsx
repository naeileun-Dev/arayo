import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { InquiryStatus } from './types';

interface Props {
  status: InquiryStatus;
  label: string;
}

export const InquiryStateTag: React.FC<Props> = ({ status, label }) => {
  const bgColors: Record<InquiryStatus, string> = {
    ing: colors.system100,
    complete: colors.green,
    exp: colors.G100,
  };

  return (
    <View style={[styles.tag, { backgroundColor: bgColors[status] }]}>
      <Text style={[styles.tagText, status === 'exp' && styles.tagTextGray]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  tagTextGray: {
    color: colors.G600,
  },
});

