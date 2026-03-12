import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors as C } from '../../styles/colors';
import type { ViewType } from '../../types/product';

interface ViewToggleProps {
  viewType: ViewType;
  onChange: (t: ViewType) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewType, onChange }) => (
  <View style={styles.container}>
    {/* 리스트형 */}
    <TouchableOpacity style={styles.btn} onPress={() => onChange('magazine')} activeOpacity={0.7}>
      <View style={styles.listIconWrapper}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.listIconLine, viewType === 'magazine' && styles.iconActive]} />
        ))}
      </View>
    </TouchableOpacity>
    {/* 그리드형 */}
    <TouchableOpacity style={styles.btn} onPress={() => onChange('grid')} activeOpacity={0.7}>
      <View style={styles.gridIconWrapper}>
        {[0, 1, 2, 3].map((i) => (
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
    backgroundColor: C.G400,
  },
  iconActive: {
    backgroundColor: C.primary,
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
    backgroundColor: C.G400,
  },
});

export default ViewToggle;
