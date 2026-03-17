import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface ServiceTagProps {
  name: string;
  on: boolean;
  Icon: React.FC<any>;
}

const ICON_CONTAINER_SIZE = 28;
const ICON_SIZE = 16;

export const ServiceTag: React.FC<ServiceTagProps> = ({ name, on, Icon }) => (
  <View style={styles.container}>
    <View style={[styles.iconWrap, on && styles.iconWrapOn]}>
      <Icon width={ICON_SIZE} height={ICON_SIZE} color={on ? colors.white : colors.G500} />
    </View>
    <Text style={[styles.text, on && styles.textOn]}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: colors.G100,
  },
  iconWrapOn: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.G500,
  },
  textOn: {
    fontWeight: '600',
    color: colors.primary,
  },
});
