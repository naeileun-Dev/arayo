import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface ServiceTagProps {
  name: string;
  on: boolean;
  Icon: React.FC<any>;
}

const ServiceTag: React.FC<ServiceTagProps> = ({ name, on, Icon }) => (
  <View style={styles.container}>
    <View style={[styles.iconWrap, on && styles.iconWrapOn]}>
      <Icon width={16} height={16} color={on ? colors.white : colors.G500} />
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.G100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapOn: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 12,
    color: colors.G500,
    fontWeight: '500',
  },
  textOn: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ServiceTag;
