import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import type { ViewType } from '../../types/product';

interface ViewToggleProps {
  viewType: ViewType;
  onChange: (t: ViewType) => void;
}

const LIST_LINES = [0, 1, 2];
const GRID_CELLS = [0, 1, 2, 3];

export const ViewToggle = ({ viewType, onChange }: ViewToggleProps) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={() => onChange('magazine')} activeOpacity={0.7}>
      <View style={styles.listIconWrapper}>
        {LIST_LINES.map(i => (
          <View key={i} style={[styles.listIconLine, viewType === 'magazine' && styles.iconActive]} />
        ))}
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={() => onChange('grid')} activeOpacity={0.7}>
      <View style={styles.gridIconWrapper}>
        {GRID_CELLS.map(i => (
          <View key={i} style={[styles.gridIconCell, viewType === 'grid' && styles.iconActive]} />
        ))}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listIconWrapper: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  listIconLine: {
    width: 20,
    height: 3,
    borderRadius: 1,
    backgroundColor: colors.G400,
  },
  iconActive: {
    backgroundColor: colors.primary,
  },
  gridIconWrapper: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  gridIconCell: {
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: colors.G400,
  },
});
