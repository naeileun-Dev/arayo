import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import { EstimateListItemData } from '../types';
import { EstimateStateTag } from './EstimateStateTag';
import { EstimateCaseCount } from './EstimateCaseCount';
import { EstimateSubRow } from './EstimateSubRow';

interface Props {
  item: EstimateListItemData;
  isFirst: boolean;
  onPress?: (id: string) => void;
  subRowIcon?: React.ReactNode;
}

export const EstimateListItem: React.FC<Props> = ({ item, isFirst, onPress, subRowIcon }) => (
  <View style={[styles.listItem, !isFirst && styles.listItemBorder]}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.listHead}
      onPress={() => onPress?.(item.id)}
    >
      <View style={styles.tagWrap}>
        <EstimateStateTag status={item.status} label={item.statusLabel} />
      </View>
      <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
      {item.caseCount != null && (
        <View style={styles.countWrap}>
          <EstimateCaseCount count={item.caseCount} />
        </View>
      )}
    </TouchableOpacity>

    {item.subItems?.map((sub, idx) => (
      <EstimateSubRow
        key={`${item.id}-${idx}`}
        subject={sub.subject}
        date={sub.date}
        price={sub.price}
        icon={subRowIcon}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    gap: 7,
  },
  listItemBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  listHead: {
    position: 'relative',
    paddingLeft: 85,
    paddingRight: 56,
    minHeight: 32,
    justifyContent: 'center',
  },
  tagWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  countWrap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.black,
  },
});

