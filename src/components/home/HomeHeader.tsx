/**
 * 홈 헤더 컴포넌트
 * 기계모아 로고 + 검색 + 알림 아이콘
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import MainLogo from '../../assets/images/main_logo.svg';
import SearchIcon from '../../assets/icon/Search.svg';
import HeadsetIcon from '../../assets/icon/headset.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, componentHeight, borderRadius } from '../../styles/spacing';

interface HomeHeaderProps {
  onSearch?: () => void;
  onNotification?: () => void;
  notificationCount?: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSearch,
  onNotification,
  notificationCount = 0,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* 로고 */}
      <View style={styles.logoArea}>
        <MainLogo width={120} height={32} />
      </View>

      {/* 우측 아이콘 */}
      <View style={styles.rightArea}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onSearch}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <SearchIcon width={22} height={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotification}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <HeadsetIcon width={22} height={22} color={colors.textPrimary} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: componentHeight.header,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default HomeHeader;
