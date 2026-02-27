import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onViewAll,
  viewAllLabel = '전체보기',
  rightComponent,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent
        ? rightComponent
        : onViewAll && (
            <TouchableOpacity onPress={onViewAll}>
              <Text style={styles.viewAll}>{viewAllLabel}</Text>
            </TouchableOpacity>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  viewAll: {
    fontSize: 13,
    color: colors.G600,
  },
});

export default SectionHeader;
