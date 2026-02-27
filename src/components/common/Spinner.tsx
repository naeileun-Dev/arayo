import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { colors } from '../../styles/colors';

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24 }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
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
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 4,
          borderBottomColor: colors.G400,
          borderLeftColor: colors.G300,
          borderRightColor: colors.G200,
          borderTopColor: colors.G100,
        },
        { transform: [{ rotate }] },
      ]}
    />
  );
};

export default Spinner;
