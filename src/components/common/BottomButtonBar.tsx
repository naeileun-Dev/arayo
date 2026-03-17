import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors } from '../../styles/colors';

type ButtonVariant = 'primary' | 'outline' | 'gray';

interface ButtonConfig {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

interface BottomButtonBarProps {
  buttons: ButtonConfig[];
}

const BUTTON_HEIGHT = 50;
const IOS_BOTTOM_PADDING = 34;
const ANDROID_BOTTOM_PADDING = 12;

export const BottomButtonBar: React.FC<BottomButtonBarProps> = ({ buttons }) => (
  <View style={styles.container}>
    {buttons.map((btn, index) => {
      const variant = btn.variant ?? 'primary';
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            variant === 'primary' && styles.buttonPrimary,
            variant === 'outline' && styles.buttonOutline,
            variant === 'gray' && styles.buttonGray,
            btn.disabled && styles.buttonDisabled,
          ]}
          activeOpacity={0.8}
          onPress={btn.onPress}
          disabled={btn.disabled}
        >
          <Text
            style={[
              styles.buttonText,
              variant === 'primary' && styles.textPrimary,
              variant === 'outline' && styles.textOutline,
              variant === 'gray' && styles.textGray,
              btn.disabled && styles.textDisabled,
            ]}
          >
            {btn.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: { paddingBottom: IOS_BOTTOM_PADDING },
      android: { paddingBottom: ANDROID_BOTTOM_PADDING },
    }),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT,
    borderRadius: 4,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.G300,
    backgroundColor: colors.white,
  },
  buttonGray: {
    backgroundColor: colors.G100,
  },
  buttonDisabled: {
    backgroundColor: colors.G100,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  textPrimary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.black,
  },
  textGray: {
    color: colors.black,
  },
  textDisabled: {
    color: colors.G500,
  },
});
