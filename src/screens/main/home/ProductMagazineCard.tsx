import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HeartIcon from '../../../assets/icon/heart.svg';
import CommentIcon from '../../../assets/icon/comment.svg';
import { colors } from '../../../styles/colors';

interface ProductMagazineCardProps {
  item: {
    id: string;
    title: string;
    tags: string;
    price: string;
    date: string;
    likes: number;
    comments: number;
  };
  onPress: (id: string) => void;
}

const ProductMagazineCard: React.FC<ProductMagazineCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
    <Image
      source={require('../../../assets/images/img03.png')}
      style={styles.thumb}
      resizeMode="cover"
    />
    <View style={styles.content}>
      <Text style={styles.bestBadge}>BEST</Text>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.tags}>{item.tags}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{item.date}</Text>
          <View style={styles.iconWithText}>
            <HeartIcon width={14} height={14} />
            <Text style={styles.metaText}>{item.likes}</Text>
          </View>
          <View style={styles.iconWithText}>
            <CommentIcon width={14} height={14} />
            <Text style={styles.metaText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumb: { width: 120, height: 120 },
  content: { flex: 1, paddingVertical: 12, paddingHorizontal: 15, gap: 5 },
  bestBadge: { fontSize: 10, fontWeight: '500', color: colors.error },
  title: { fontSize: 14, fontWeight: '600', color: colors.black, lineHeight: 18 },
  tags: { fontSize: 12, color: colors.G600 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  meta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  metaText: { fontSize: 11, color: colors.G600 },
  iconWithText: { flexDirection: 'row', alignItems: 'center', gap: 3 },
});

export default ProductMagazineCard;
