import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

interface Props {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export const InquiryTabBar: React.FC<Props> = ({ tabs, activeIndex, onChange }) => (
  <View style={styles.tabMenu}>
    {tabs.map((tab, index) => {
      const active = activeIndex === index;
      return (
        <TouchableOpacity
          key={tab}
          activeOpacity={0.7}
          onPress={() => onChange(index)}
          style={[styles.tab, active && styles.tabActive]}
        >
          <Text style={[styles.tabText, active && styles.tabTextActive]}>
            {tab}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.G300,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G500,
  },
  tabTextActive: {
    color: colors.primary,
  },
});

