import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface TableRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ label, value, bold }) => (
  <View style={styles.row}>
    <View style={styles.thWrap}>
      <Text style={[styles.th, bold && styles.bold]}>{label}</Text>
    </View>
    <View style={styles.tdWrap}>
      <Text style={styles.td}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    minHeight: 44,
  },
  thWrap: {
    width: 110,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: colors.G100,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.G200,
  },
  th: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.G700,
    letterSpacing: -0.2,
  },
  bold: {
    fontWeight: '600',
    color: colors.black,
  },
  tdWrap: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  td: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: 19,
  },
});

export default TableRow;
