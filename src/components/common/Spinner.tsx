import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface SpinnerProps {
  size?: number;
}

const SPIN_DURATION = 800;
const BORDER_WIDTH = 4;

export const Spinner: React.FC<SpinnerProps> = ({ size = 24 }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: SPIN_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ rotate }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    borderWidth: BORDER_WIDTH,
    borderTopColor: colors.G100,
    borderRightColor: colors.G200,
    borderBottomColor: colors.G400,
    borderLeftColor: colors.G300,
  },
});
