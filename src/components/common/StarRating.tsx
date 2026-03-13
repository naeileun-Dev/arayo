import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../styles/colors';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 14 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Text key={`f${i}`} style={{ fontSize: size, color: colors.star }}>★</Text>
      ))}
      {hasHalf && <Text style={{ fontSize: size, color: colors.star }}>★</Text>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Text key={`e${i}`} style={{ fontSize: size, color: colors.G300 }}>★</Text>
      ))}
    </View>
  );
};

export default StarRating;
