import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { colors } from '../../../styles/colors';
import GearsIcon from '../../../assets/icon/gears.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface NotificationItemProps {
  id: string;
  subject: string;
  message: string;
  date: string;
  isNew?: boolean;
  onDelete: (id: string) => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  subject,
  message,
  date,
  isNew = false,
  onDelete,
  onSwipeStart,
  onSwipeEnd,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [itemHeight, setItemHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(1)).current;
  const isSwiping = useRef(false);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 260,
        delay: 160,
        useNativeDriver: false,
      }),
    ]).start(() => onDelete(id));
  };

  const snapBack = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) => {
        const isHorizontal = Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 8;
        return isHorizontal && gs.dx < 0;
      },
      onPanResponderGrant: () => {
        isSwiping.current = true;
        onSwipeStart?.();
      },
      onPanResponderMove: (_, gs) => {
        if (gs.dx < 0) {
          translateX.setValue(gs.dx);
        }
      },
      onPanResponderRelease: (_, gs) => {
        isSwiping.current = false;
        onSwipeEnd?.();
        if (gs.dx < -SWIPE_THRESHOLD) {
          dismiss();
        } else {
          snapBack();
        }
      },
      onPanResponderTerminate: () => {
        isSwiping.current = false;
        onSwipeEnd?.();
        snapBack();
      },
    })
  ).current;

  const deleteAreaOpacity = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH, -40, 0],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, itemHeight],
  });

  return (
    <Animated.View
      style={[styles.wrapper, itemHeight > 0 && { height: animatedHeight }]}
      onLayout={(e) => {
        const h = e.nativeEvent.layout.height;
        if (h > 0 && itemHeight === 0) setItemHeight(h);
      }}
    >
      <Animated.View style={[styles.deleteBg, { opacity: deleteAreaOpacity }]}>
        <Text style={styles.deleteBgText}>삭제</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.item,
          isNew && styles.itemNew,
          { transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.iconWrap, isNew && styles.iconWrapNew]}>
          <GearsIcon width={28} height={28} color={colors.primary} />
        </View>

        <View style={styles.con}>
          <Text style={styles.subject}>{subject}</Text>
          <Text style={styles.msg} numberOfLines={1} ellipsizeMode="tail">
            {message}
          </Text>
        </View>

        <Text style={styles.date}>{date}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export const NotificationLoadingFooter: React.FC = () => (
  <View style={styles.loadingWrap}>
    <ActivityIndicator size="large" color={colors.G400} />
    <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  deleteBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.primary,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 24,
  },
  deleteBgText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  itemNew: {
    backgroundColor: '#FFF0F1',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.G100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  iconWrapNew: {
    backgroundColor: '#FFE0E3',
  },
  con: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  subject: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  msg: {
    fontSize: 13,
    color: colors.G600,
  },
  date: {
    fontSize: 11,
    color: colors.G500,
    marginLeft: 10,
    flexShrink: 0,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 14,
  },
  loadingText: {
    fontSize: 14,
    color: colors.G500,
  },
});
