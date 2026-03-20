import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import SearchIcon from '../../assets/icon/Search.svg';
import { colors } from '../../styles/colors';

interface Props {
  title: string;
  onBack?: () => void;
  onSearch?: () => void;
}

export const InquiryHeader: React.FC<Props> = ({ title, onBack, onSearch }) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.headerLeftBtn}
      onPress={onBack}
      activeOpacity={0.6}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ChevronLeftIcon width={24} height={24} color={colors.black} />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>{title}</Text>

    {onSearch ? (
      <TouchableOpacity
        style={styles.headerRightBtn}
        onPress={onSearch}
        activeOpacity={0.6}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <SearchIcon width={24} height={24} color={colors.black} />
      </TouchableOpacity>
    ) : (
      <View style={styles.headerRightBtn} />
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  headerLeftBtn: {
    position: 'absolute',
    left: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightBtn: {
    position: 'absolute',
    right: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
});

