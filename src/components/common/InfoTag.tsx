import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

type TagVariant = 'red' | 'blue';

interface InfoTagProps {
  text: string;
  variant?: TagVariant;
}

const TAG_STYLES: Record<TagVariant, { bg: string; fg: string }> = {
  red: { bg: colors.redTagBg, fg: colors.primary },
  blue: { bg: colors.infoBoxBg, fg: colors.system100 },
};

const TAG_HEIGHT = 21;

export const InfoTag: React.FC<InfoTagProps> = ({ text, variant = 'red' }) => {
  const { bg, fg } = TAG_STYLES[variant];
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.tagText, { color: fg }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    height: TAG_HEIGHT,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: TAG_HEIGHT,
  },
});
