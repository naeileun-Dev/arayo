import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { componentHeight } from '../../styles/spacing';
import type { TabBarProps } from '../../types';

const INDICATOR_HEIGHT = 2;

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => (
  <View style={[styles.container, style]}>
    {tabs.map((tab) => {
      const isActive = tab.key === activeTab;
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>
            {tab.label}
          </Text>
          {isActive && <View style={styles.indicator} />}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: componentHeight.tabBar,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  tab: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    ...typography.body,
    color: colors.textTertiary,
  },
  activeTabText: {
    ...typography.label,
    color: colors.primary,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: INDICATOR_HEIGHT,
    backgroundColor: colors.primary,
  },
});
