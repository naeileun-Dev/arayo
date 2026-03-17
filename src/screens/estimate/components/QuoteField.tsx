import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { InfoTag } from '../../../components/common';

interface FieldProps {
  label: string;
  value: string;
  isFirst?: boolean;
  multiline?: boolean;
}

export const QuoteField: React.FC<FieldProps> = ({ label, value, isFirst, multiline }) => (
  <View style={isFirst ? undefined : { marginTop: 10 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={multiline ? styles.fieldValueMultiline : styles.fieldValue}>
      {value}
    </Text>
  </View>
);

interface PriceFieldProps {
  label: string;
  price: string;
  tag?: string;
}

export const QuotePriceField: React.FC<PriceFieldProps> = ({ label, price, tag }) => (
  <View style={{ marginTop: 10 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.priceRow}>
      <Text style={styles.fieldValue}>{price}</Text>
      {tag ? <InfoTag text={tag} variant="red" /> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 12,
    color: colors.G600,
    lineHeight: 17,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
  },
  fieldValueMultiline: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 21,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
