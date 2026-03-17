import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

interface Props {
  state: string;
}

const STATE_MAP: Record<string, { bg: string; fg: string; text: string }> = {
  used: { bg: colors.orange, fg: colors.white, text: '중고' },
  new: { bg: colors.system100, fg: colors.white, text: '신품' },
  hold: { bg: colors.green, fg: colors.white, text: '보유' },
  sold: { bg: colors.G100, fg: colors.black, text: '판매완료' },
};

export const QuoteStateBadge: React.FC<Props> = ({ state }) => {
  const m = STATE_MAP[state] ?? STATE_MAP.sold;
  return (
    <View style={[styles.badge, { backgroundColor: m.bg }]}>
      <Text style={[styles.badgeText, { color: m.fg }]}>{m.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 5,
    height: 22,
    paddingHorizontal: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 12, fontWeight: '400' },
});

