import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import XIcon from '../../assets/icon/X.svg';
import { colors } from '../../styles/colors';
import { spacing, componentHeight, iconSize } from '../../styles/spacing';
import type { HeaderProps } from '../../types';

const SIDE_CONTAINER_WIDTH = 48;
const BACK_ICON_SIZE = 24;
const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onClose,
  leftComponent,
  rightComponent,
  transparent = false,
  border = false,
  titleStyle,
  style,
}) => (
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

    <View style={styles.leftContainer}>
      {leftComponent ?? (onBack ? (
        <TouchableOpacity style={styles.iconButton} onPress={onBack} hitSlop={HIT_SLOP}>
          <ChevronLeftIcon width={BACK_ICON_SIZE} height={BACK_ICON_SIZE} color={colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      ))}
    </View>

    <View style={styles.titleContainer}>
      {title && (
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}
    </View>

    <View style={styles.rightContainer}>
      {rightComponent ?? (onClose ? (
        <TouchableOpacity style={styles.iconButton} onPress={onClose} hitSlop={HIT_SLOP}>
          <XIcon width={BACK_ICON_SIZE} height={BACK_ICON_SIZE} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: componentHeight.header,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.white,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  border: {},
  leftContainer: {
    alignItems: 'flex-start',
    width: SIDE_CONTAINER_WIDTH,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    width: SIDE_CONTAINER_WIDTH,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize.xl,
    height: iconSize.xl,
  },
  placeholder: {
    width: iconSize.xl,
    height: iconSize.xl,
  },
});
