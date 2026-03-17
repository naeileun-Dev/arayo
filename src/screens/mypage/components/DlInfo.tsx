/**
 * DlInfo - 상품 스펙 4컬럼 그리드
 * FavoriteListScreen 전용
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface DlInfoProps {
  manufacturer: string;
  manufactureDate: string;
  modelName: string;
  warranty: string;
}

const SPEC_ROWS: { key: keyof DlInfoProps; label: string }[] = [
  { key: 'manufacturer',    label: '제조사'   },
  { key: 'manufactureDate', label: '제조연월' },
  { key: 'modelName',       label: '모델명'   },
  { key: 'warranty',        label: '보증기간' },
];

export const DlInfo: React.FC<DlInfoProps> = (props) => (
  <View style={styles.dlInfo}>
    {SPEC_ROWS.map(({ key, label }) => (
      <View key={key} style={styles.cell}>
        <Text style={styles.dt}>{label}</Text>
        <Text style={styles.dd}>{props[key]}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  dlInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.G200,
    paddingTop: 10,
    marginTop: 10,
  },
  cell: {
    width: '25%',
    marginBottom: 6,
    paddingRight: 4,
  },
  dt: {
    fontSize: 11,
    color: colors.G500,
    marginBottom: 3,
  },
  dd: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
  },
});

