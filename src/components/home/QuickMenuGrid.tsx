/**
 * 퀵 메뉴 컴포넌트
 * 홈 화면 배너 아래 아이콘 메뉴 그리드
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import type { QuickMenuProps, QuickMenu } from '../../types';

const QuickMenuGrid: React.FC<QuickMenuProps> = ({
  menus,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {menus.map((menu) => (
        <TouchableOpacity
          key={menu.id}
          style={styles.menuItem}
          onPress={() => onPress?.(menu)}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{menu.icon}</Text>
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {menu.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default QuickMenuGrid;
