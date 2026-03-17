import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import { TabType, SortType } from '../types';
import { EstimateTabBar } from './EstimateTabBar';

interface Props {
  activeTab: TabType;
  sortType: SortType;
  onTabChange: (tab: TabType) => void;
  onSortPress: () => void;
}

const TABS: TabType[] = ['전체', '신품', '중고'];

export const EstimateTabSort: React.FC<Props> = ({ activeTab, sortType, onTabChange, onSortPress }) => {
  const activeIndex = TABS.indexOf(activeTab);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabWrap}>
        <EstimateTabBar
          tabs={TABS}
          activeIndex={activeIndex}
          onChange={(i) => onTabChange(TABS[i])}
        />
      </View>
      <TouchableOpacity style={styles.sortDropdown} onPress={onSortPress} activeOpacity={0.6}>
        <Text style={styles.sortLabel}>{sortType}</Text>
        <View style={styles.sortCaretIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabWrap: {
    flex: 1,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    marginLeft: 12,
  },
  sortLabel: {
    fontSize: 13,
    color: colors.black,
    marginRight: 6,
  },
  sortCaretIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.G600,
  },
});

