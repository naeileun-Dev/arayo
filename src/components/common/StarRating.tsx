import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const MAX_STARS = 5;

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 14 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = MAX_STARS - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={styles.container}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>★</Text>
      ))}
      {hasHalf && <Text style={[styles.star, { fontSize: size }]}>★</Text>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Text key={`empty-${i}`} style={[styles.emptyStar, { fontSize: size }]}>★</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: colors.star,
  },
  emptyStar: {
    color: colors.G300,
  },
});
