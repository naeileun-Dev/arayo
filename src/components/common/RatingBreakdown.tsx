import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import StarIcon from '../../assets/icon/star.svg';

interface RatingBar {
  score: number;
  pct: number;
  active?: boolean;
}

interface RatingBreakdownProps {
  score?: number;
  maxScore?: number;
  bars?: RatingBar[];
}

const DEFAULT_BARS: RatingBar[] = [
  { score: 5, pct: 100, active: true },
  { score: 4, pct: 20, active: false },
  { score: 3, pct: 20, active: false },
  { score: 2, pct: 20, active: false },
  { score: 1, pct: 20, active: false },
];

const STAR_ICON_SIZE = 40;
const BAR_WIDTH = 6;
const BAR_HEIGHT = 50;
const BARS_CONTAINER_HEIGHT = 70;

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  score = 4.5,
  maxScore = 5,
  bars = DEFAULT_BARS,
}) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Text style={styles.label}>사용자 총 평점</Text>
      <StarIcon width={STAR_ICON_SIZE} height={STAR_ICON_SIZE} color={colors.star} />
      <View style={styles.scoreRow}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreMax}>/{maxScore}</Text>
      </View>
    </View>
    <View style={styles.right}>
      <Text style={styles.label}>평점 비율</Text>
      <View style={styles.bars}>
        {bars.map((item) => (
          <View key={item.score} style={styles.barCol}>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  { height: `${item.pct}%` },
                  item.active && styles.barFillActive,
                ]}
              />
            </View>
            <Text style={styles.barLabel}>{item.score} 점</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: colors.G100,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: colors.G200,
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    paddingLeft: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '700',
    color: colors.G800,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 5,
  },
  score: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.black,
  },
  scoreMax: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.G300,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    height: BARS_CONTAINER_HEIGHT,
  },
  barCol: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barBg: {
    justifyContent: 'flex-end',
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: colors.G200,
  },
  barFill: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: colors.G400,
  },
  barFillActive: {
    backgroundColor: colors.primary200,
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: colors.G600,
  },
});
