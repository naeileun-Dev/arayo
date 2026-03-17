import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';

const IMAGE_SIZE = Dimensions.get('window').width * 0.45;

const newsImage = require('../../../assets/images/img02.png');

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  content?: string;
}

interface NewsCardProps {
  item: NewsItem;
  onPress: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
    <Image
      source={item.imageUrl ? { uri: item.imageUrl } : newsImage}
      style={styles.image}
      resizeMode="cover"
    />
    <Text style={styles.title} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={styles.date}>{item.date}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 4,
    backgroundColor: colors.G200,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    lineHeight: 20,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.G500,
  },
});

