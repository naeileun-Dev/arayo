/**
 * 공통 Header 컴포넌트
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, componentHeight, iconSize } from '../../styles/spacing';
import type { HeaderProps } from '../../types';

// 간단한 아이콘 컴포넌트
const BackIcon: React.FC = () => (
  <Text style={{ fontSize: 24, color: colors.textPrimary }}>←</Text>
);

const CloseIcon: React.FC = () => (
  <Text style={{ fontSize: 24, color: colors.textPrimary }}>✕</Text>
);

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onClose,
  leftComponent,
  rightComponent,
  transparent = false,
  border = false,
  titleStyle,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        transparent && styles.transparent,
        border && styles.border,
        style,
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={transparent ? 'transparent' : colors.white}
      />

      {/* 왼쪽 영역 */}
      <View style={styles.leftContainer}>
        {leftComponent ? (
          leftComponent
        ) : onBack ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* 오른쪽 영역 */}
      <View style={styles.rightContainer}>
        {rightComponent ? (
          rightComponent
        ) : onClose ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CloseIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: componentHeight.header,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftContainer: {
    width: 48,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 48,
    alignItems: 'flex-end',
  },
  title: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  iconButton: {
    width: iconSize.xl,
    height: iconSize.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: iconSize.xl,
    height: iconSize.xl,
  },
});

export default Header;
