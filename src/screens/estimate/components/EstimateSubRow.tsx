import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface Props {
  subject: string;
  date: string;
  price?: string;
  icon?: React.ReactNode;
}

const EstimateSubRow: React.FC<Props> = ({ subject, date, price, icon }) => (
  <View style={styles.subRow}>
    {icon ?? <View style={styles.iconPlaceholder} />}
    {price && <Text style={styles.price}>{price}</Text>}
    <Text style={styles.subject} numberOfLines={1}>{subject}</Text>
    <Text style={styles.date}>{date}</Text>
  </View>
);

const styles = StyleSheet.create({
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoBoxBg,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    gap: 10,
  },
  iconPlaceholder: {
    width: 17,
    height: 17,
  },
  price: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.blue,
    flexShrink: 0,
  },
  subject: {
    fontSize: 13,
    color: colors.G900,
    flex: 1,
  },
  date: {
    fontSize: 13,
    color: colors.G600,
    flexShrink: 0,
  },
});

export default EstimateSubRow;
